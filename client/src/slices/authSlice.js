import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    token: localStorage.getItem('accessToken') || null,
    firstName: localStorage.getItem('firstName') || '',
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
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
