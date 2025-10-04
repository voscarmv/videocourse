import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchItems } from '../store/itemsSlice';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const ItemList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.items);
  const { category } = useParams<{ category: string }>();
  const [keyInput, setKeyInput] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Replace with your actual API URL
    dispatch(fetchItems({
      url: `${apiurl}/content/${category}`,
      key: keyInput.trim() // 21596
    }));
  }, [dispatch]);
  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchItems({
      url: `${apiurl}/content/${category}`,
      key: keyInput.trim()
    }));
  };
  if (loading) return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-text">Cargando contenido del curso...</p>
      </div>
    </div>
  );
  if (error) {
    if (error === 'Request failed with status code 401') {
      return (
        <div className="access-form-container">
          <div className="access-form-card">
            <h1 className="access-form-title">Acceso Requerido</h1>
            <p className="access-form-subtitle">Por favor ingresa tu código de acceso para continuar</p>
            <form className="access-form" onSubmit={handleKeySubmit}>
              <div className="form-group">
                <label className="form-label">
                  Código de Acceso
                </label>
                <input
                  className="form-input"
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="Ingresa tu código de acceso"
                />
              </div>
              <button className="form-submit" type="submit">Acceder al Curso</button>
            </form>
          </div>
        </div>
      )
    }
    return (
      <div className="error-container">
        <div className="error-content">
          <h1 className="error-title">Error</h1>
          <p className="error-message">{error}</p>
        </div>
      </div>
    )
  };

  return (
    <div className="course-container">
      <header className="course-header">
        <h1 className="course-title">{items?.content[0].name}</h1>
        <div className="course-description">
          <Markdown remarkPlugins={[remarkGfm]}>{items?.content[0].description}</Markdown>
        </div>
      </header>

      <div className="course-main">
        <nav className="course-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Contenido del Curso</h2>
            <p className="sidebar-subtitle">{items?.sections.length} secciones</p>
          </div>
          <ul className="nav-list">
            {items?.sections.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-button ${item.id === activeSection ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="course-content">
          {items?.sections.map((item, index) => {
            if (item.id === activeSection || (activeSection === '' && index === 0))
              return (
                <div key={item.id} className="section-container">
                  <div className="section-header">
                    <h2 className="section-title">{item.name}</h2>
                    <div className="video-container">
                      <LiteYouTubeEmbed id={item.vidurl} title={item.name} />
                    </div>
                  </div>
                  <div className="section-content">
                    <div className="section-markdown">
                      <Markdown remarkPlugins={[remarkGfm]}>{item.markdown}</Markdown>
                    </div>
                  </div>
                </div>
              )
          })}
        </main>
      </div>
    </div>
  );
};

export default ItemList;