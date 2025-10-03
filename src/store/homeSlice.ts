import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { InputParams, HomeElement, HomeState } from '../types';

export const fetchHomeElements = createAsyncThunk<HomeElement, InputParams>(
  'home/fetchHomeElements',
  async ({ url, key }) => {
        const response = await axios.get<HomeElement>(url);
    console.log(key);
    console.log(response.data);
    return response.data;
  }
);

const initialState: HomeState = {
  elements: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeElements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeElements.fulfilled, (state, action) => {
        state.loading = false;
        state.elements = action.payload;
      })
      .addCase(fetchHomeElements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch home elements';
      });
  },
});

export default homeSlice.reducer;