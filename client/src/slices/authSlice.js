import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../services/userService';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    token: localStorage.getItem('accessToken') || null,
    firstName: localStorage.getItem('firstName') || '',
    loading: false,
    error: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      localStorage.setItem('accessToken', action.payload.token);
      localStorage.setItem('firstName', action.payload.firstName);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.firstName = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('firstName');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        state.firstName = action.payload.firstName;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('firstName', action.payload.firstName);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
