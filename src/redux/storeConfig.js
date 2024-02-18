import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import paisesReducer from './paisesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    paises: paisesReducer,
  },
});

export default store;
