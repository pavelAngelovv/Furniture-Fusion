import { configureStore } from '@reduxjs/toolkit';
import furnitureReducer from '../slices/furnitureSlice';
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    furniture: furnitureReducer,
    auth: authReducer,
  },
});
