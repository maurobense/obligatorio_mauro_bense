import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('apiKey',state.user.apiKey)
      localStorage.setItem('id',state.user.id)
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      },
      logoutFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  },
});

export const {
    registerStart,
    registerSuccess,
    registerFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
  } = authSlice.actions;

export default authSlice.reducer;
