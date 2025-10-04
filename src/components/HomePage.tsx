import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchHomeElements } from '../store/homeSlice';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { elements, loading, error } = useSelector((state: RootState) => state.home);
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    dispatch(fetchHomeElements(({
      url: `${apiurl}/content`,
      key: null
    })));
  }, [dispatch]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-text">Cargando cursos disponibles...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">Error</h1>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="homepage-hero">
          <h1 className="homepage-title">Cursia</h1>
          <p className="homepage-subtitle">
            Plataforma de cursos en video para potenciar tu aprendizaje
          </p>
          <div className="homepage-features">
            <div className="feature-item">
              <span className="feature-icon">🎥</span>
              <span>Videos de alta calidad</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <span>Contenido estructurado</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Acceso inmediato</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="homepage-main">
        <section className="courses-section">
          <div className="section-header">
            <h2 className="section-title">Cursos Disponibles</h2>
            <p className="section-description">
              Descubre nuestra colección de cursos diseñados para acelerar tu crecimiento profesional
            </p>
          </div>
          
          <div className="courses-grid">
            {elements?.contents.map((element) => (
              <div key={element.id} className="course-card">
                <div className="course-card-header">
                  <div className="course-icon">📖</div>
                  <h3 className="course-card-title">{element.name}</h3>
                </div>
                <div className="course-card-content">
                  <div className="course-card-description"><Markdown remarkPlugins={[remarkGfm]}>{element.description}</Markdown></div>
                </div>
                <div className="course-card-footer">
                  <button 
                    className="course-access-button"
                    onClick={() => navigate(`/curso/${element.id}`)}
                  >
                    Acceder al Curso
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="homepage-footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 Cursia. Transformando el aprendizaje a través de la tecnología.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;