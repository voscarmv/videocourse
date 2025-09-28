import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchItems } from '../store/itemsSlice';

const ItemList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    // Replace with your actual API URL
    dispatch(fetchItems({url: 'https://videocourse-api.vercel.app/content/ai_course', key: '21596'}));
  }, [dispatch]);

  if (loading) return <div> Loading... </div>;
  if (error) return <div>Error: {error}</div>;

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