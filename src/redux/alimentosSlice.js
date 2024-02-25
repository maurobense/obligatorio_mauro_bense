import { createSlice } from '@reduxjs/toolkit';

const alimentosSlice = createSlice({
    name: 'alimentos',
    initialState: {
        alimentos: [],
        registros: [],
        error: null,
        loading: false,
    },
    reducers: {
        fetchAlimentosStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAlimentosSuccess: (state, action) => {
            state.loading = false;
            state.alimentos = action.payload.map(alimento => {
                const unidad = alimento.porcion.slice(-1);
                const porcionSinUnidad = alimento.porcion.slice(0, -1);
                return {
                    ...alimento,
                    porcion:parseInt(porcionSinUnidad),
                    url:`https://calcount.develotion.com/imgs/${alimento.imagen}.png`,
                    unidad
                };
            })
        },
        fetchAlimentosFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchRegistrosSuccess: (state, action) => {
            state.loading = false;
            state.registros = action.payload;
        },
        fetchRegistrosFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        registrarAlimentoSuccess: (state, action) => {
            state.loading = false;
            state.registros.push(action.payload);
        },
        registrarAlimentoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        eliminarRegistroSuccess: (state, action) => {
            state.loading = false;
            state.registros = state.registros.filter(registro => registro.id !== parseInt(action.payload));
        },
        eliminarRegistroFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchAlimentosStart,
    fetchAlimentosSuccess,
    fetchAlimentosFailure,
    fetchRegistrosSuccess,
    fetchRegistrosFailure,
    registrarAlimentoSuccess,
    registrarAlimentoFailure,
    eliminarRegistroSuccess,
    eliminarRegistroFailure
} = alimentosSlice.actions;

export default alimentosSlice.reducer;
