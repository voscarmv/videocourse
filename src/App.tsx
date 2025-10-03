import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ItemList from './components/ItemList';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/curso/:category" element={<ItemList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;