import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import paisesReducer from './paisesSlice';
import alimentosSlice from './alimentosSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    paises: paisesReducer,
    alimentos: alimentosSlice
  },
});

export default store;
