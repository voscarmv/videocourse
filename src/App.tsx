import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ItemList from './components/ItemList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/curso/:category" element={<ItemList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;