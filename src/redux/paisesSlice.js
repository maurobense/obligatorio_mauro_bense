import { createSlice } from '@reduxjs/toolkit';

const paisesSlice = createSlice({
  name: 'paises',
  initialState: {
    paises: [],
    error: null,
    loading: false,
  },
  reducers: {
    fetchPaisesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPaisesSuccess: (state, action) => {
      state.loading = false;
      state.paises = action.payload;
    },
    fetchPaisesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPaisesStart, fetchPaisesSuccess, fetchPaisesFailure } = paisesSlice.actions;

export const getPaises = () => (dispatch) => {
  dispatch(fetchPaisesStart());
  fetch("https://calcount.develotion.com/paises.php")
    .then(response => response.json())
    .then(result => {
      dispatch(fetchPaisesSuccess(result.paises));
    })
    .catch(error => {
      dispatch(fetchPaisesFailure(error.message));
    });
};

export default paisesSlice.reducer;
