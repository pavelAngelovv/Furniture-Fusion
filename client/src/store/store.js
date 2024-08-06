import { configureStore } from '@reduxjs/toolkit';
import furnitureReducer from '../slices/furnitureSlice';
import userReducer from '../slices/userSlice';
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    furniture: furnitureReducer,
    user: userReducer,
    auth: authReducer,
  },
});
