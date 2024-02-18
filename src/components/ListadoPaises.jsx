import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPaisesStart, fetchPaisesSuccess, fetchPaisesFailure } from '../redux/paisesSlice';
import { Form } from 'react-bootstrap';


const ListadoPaises = ({handlePaisChange}) => {
  const dispatch = useDispatch();
  const { paises, loading, error } = useSelector((state) => state.paises);

  useEffect(() => {
    dispatch(fetchPaisesStart());

    fetch("https://calcount.develotion.com/paises.php")
      .then(response => response.json())
      .then(result => {
        dispatch(fetchPaisesSuccess(result.paises));
      })
      .catch(error => {
        dispatch(fetchPaisesFailure(error.message));
      });
  }, [dispatch]);

  if (loading) {
    return <p>Cargando países...</p>;
  }

  if (error) {
    return <p>Error al cargar países: {error}</p>;
  }

  return (
    <Form.Select onChange={(e) => handlePaisChange(e.target.value)}>
      {paises.map((pais) => (
        <option key={pais.id} value={pais.id}>
          {pais.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default ListadoPaises;
