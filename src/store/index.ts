import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import homeReducer from './homeSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;