import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchHomeElements } from '../store/homeSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { elements, loading, error } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    dispatch(fetchHomeElements(({
      url: `https://videocourse-api.vercel.app/content`,
      key: null
    })));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {elements?.contents.map((element) => (
          <li key={element.id}>
            {element.name}: {element.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
