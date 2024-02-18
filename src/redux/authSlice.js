import { createSlice } from '@reduxjs/toolkit';

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(userData);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch('https://calcount.develotion.com/usuarios.php', requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const user = await response.json();
    dispatch(registerSuccess(user));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(userData);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch('https://calcount.develotion.com/login.php', requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const user = await response.json();
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
export const logoutUser = () => async (dispatch) => {
    try {
      localStorage.clear();
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };
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
