import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFurnitureItemById, updateFurnitureItem, createFurnitureItem, getFurnitureItems, getRecentItems } from '../services/furnitureService';

export const fetchFurnitureItems = createAsyncThunk(
  'furniture/fetchFurnitureItems',
  async () => {
    const response = await getFurnitureItems();
    return response;
  }
);

export const fetchFurnitureById = createAsyncThunk(
  'furniture/fetchById',
  async (id) => {
    const response = await getFurnitureItemById(id);
    return response;
  }
);

export const fetchRecentFurniture = createAsyncThunk(
  'furniture/fetchRecent',
  async () => {
    const response = await getRecentItems();
    return response;
  }
);

export const updateFurniture = createAsyncThunk(
  'furniture/update',
  async ({ id, data }) => {
    await updateFurnitureItem(id, data);
    return { id, data };
  }
);

export const createFurniture = createAsyncThunk(
  'furniture/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createFurnitureItem(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  item: null,
  recentItems: [],
  loading: false,
  error: null,
};

const furnitureSlice = createSlice({
  name: 'furniture',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFurnitureItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFurnitureItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFurnitureItems.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchFurnitureById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFurnitureById.fulfilled, (state, action) => {
        state.item = action.payload;
        state.loading = false;
      })
      .addCase(fetchFurnitureById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchRecentFurniture.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentFurniture.fulfilled, (state, action) => {
        state.recentItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecentFurniture.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateFurniture.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFurniture.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload.data };
        }
        state.loading = false;
      })
      .addCase(updateFurniture.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createFurniture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFurniture.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createFurniture.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default furnitureSlice.reducer;
