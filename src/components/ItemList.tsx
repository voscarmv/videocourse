import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchItems } from '../store/itemsSlice';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ItemList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.items);
  const { category } = useParams<{ category: string }>();
  const [keyInput, setKeyInput] = useState('');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Replace with your actual API URL
    dispatch(fetchItems({
      url: `https://videocourse-api.vercel.app/content/${category}`,
      key: keyInput.trim() // 21596
    }));
  }, [dispatch]);
  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchItems({
      url: `https://videocourse-api.vercel.app/content/${category}`,
      key: keyInput.trim()
    }));
  };
  if (loading) return <div> Loading... </div>;
  if (error) {
    if (error === 'Request failed with status code 401') {
      return (
        <div>
          <h1>Enter your access code</h1>
          <form onSubmit={handleKeySubmit}>
            <label>
              Access Code:
              <input
                type="text"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Enter access key"
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
    return <div>Error: {error}</div>
  };

  return (
    <div>
      <ul>
        <li>{items?.content[0].name}</li>
        <li><ReactMarkdown>{items?.content[0].description}</ReactMarkdown></li>
      </ul>
      <h1>Navbar</h1>
      <ul>
        {items?.sections.map((item) => (
          <li key={item.id}>
            <button onClick={() => setActiveSection(item.id)}>{item.name}</button>
          </li>
        ))}
      </ul>
      <ul>
        {items?.sections.map((item) => {
          if (item.id === activeSection)
            return (
              <li key={item.id}>
                <ul>
                  <li>{item.name}</li>
                  <li>{item.vidurl}</li>
                  <li><ReactMarkdown>{item.markdown}</ReactMarkdown></li>
                </ul>
              </li>
            )
        })}
      </ul>
    </div>
  );
};

export default ItemList;