import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import walletReducer from './walletSlice';

export const store = configureStore({
  reducer: { auth: authReducer, profile: profileReducer, wallet: walletReducer },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
