import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchItems } from '../store/itemsSlice';
import { useParams } from 'react-router-dom';

const ItemList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, accessKey } = useSelector((state: RootState) => state.items);
  const { category } = useParams<{ category: string }>();
  console.log(category);
  useEffect(() => {
    // Replace with your actual API URL
    dispatch(fetchItems({ url: `https://videocourse-api.vercel.app/content/${category}`, key: accessKey }));
  }, [dispatch]);
  const [keyInput, setKeyInput] = useState('');
  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://videocourse-api.vercel.app/content/${category}`;
    dispatch(fetchItems({ url, key: keyInput.trim() }));
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
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.id}: {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;