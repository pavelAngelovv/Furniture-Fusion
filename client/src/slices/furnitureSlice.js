import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFurnitureItems } from '../services/furnitureService';

export const fetchFurnitureItems = createAsyncThunk(
  'furniture/fetchFurnitureItems',
  async () => {
    const response = await getFurnitureItems();
    return response;
  }
);

const furnitureSlice = createSlice({
  name: 'furniture',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFurnitureItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFurnitureItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFurnitureItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default furnitureSlice.reducer;
