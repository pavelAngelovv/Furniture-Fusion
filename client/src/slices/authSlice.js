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
    // Reducer to handle synchronous login
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      localStorage.setItem('accessToken', action.payload.token); // Setting token in localStorage
      localStorage.setItem('firstName', action.payload.firstName); // Setting firstName in localStorage
    },
    // Reducer to handle synchronous logout
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.firstName = '';
      localStorage.removeItem('accessToken'); // Removing token from localStorage
      localStorage.removeItem('firstName'); // Removing firstName from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the register thunk
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle the fulfilled state of the register thunk
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload; // Setting token from response
        state.firstName = action.payload.firstName; // Setting firstName from response
        localStorage.setItem('accessToken', action.payload.accessToken); // Persisting token in localStorage
        localStorage.setItem('firstName', action.payload.firstName); // Persisting firstName in localStorage
      })
      // Handle the rejected state of the register thunk
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the rejected action
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
