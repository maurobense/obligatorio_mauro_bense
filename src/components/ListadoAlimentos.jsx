import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlimentosStart,fetchAlimentosSuccess, fetchAlimentosFailure } from '../redux/alimentosSlice';
import { Form } from 'react-bootstrap';


const ListadoAlimentos = ({ handleAlimentoChange }) => {
    const dispatch = useDispatch();
    const { alimentos, loading, error } = useSelector((state) => state.alimentos);

    useEffect(() => {
        dispatch(fetchAlimentosStart())
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", localStorage.getItem('apiKey'));
        myHeaders.append("iduser", localStorage.getItem('id'));
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("https://calcount.develotion.com/alimentos.php",requestOptions)
            .then(response => response.json())
            .then(result => {
                dispatch(fetchAlimentosSuccess(result.alimentos));
            })
            .catch(error => {
                dispatch(fetchAlimentosFailure(error.message));
            });
    }, [dispatch]);

    if (loading) {
        return <p>Cargando alimentos...</p>;
    }

    if (error) {
        return <p>Error al cargar alimentos: {error}</p>;
    }

    return (
        <Form.Select className="custom-select" onChange={(e) => handleAlimentoChange(e.target.value)}>
            {alimentos.map((alimento) => (
                <option key={alimento.id} value={alimento.id}>
                    {alimento.nombre}
                </option>
            ))}
        </Form.Select>
    );
};

export default ListadoAlimentos;
