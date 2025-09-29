import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Item, ItemsState } from '../types';

interface inputParams {
  url: string,
  key: string | null
}

// Async thunk for fetching items
export const fetchItems = createAsyncThunk<Item, inputParams>(
  'items/fetchItems',
  async ({url, key}) => {
    const response = await axios.get<Item>(url, {
      headers: {
      'Authorization': `Bearer ${key}`
    }});
    console.log(response.data);
    return response.data;
  }
);

const initialState: ItemsState = {
  items: null,
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      });
  },
});

export default itemsSlice.reducer;