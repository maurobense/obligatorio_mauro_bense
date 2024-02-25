import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { eliminarRegistroSuccess, eliminarRegistroFailure } from '../redux/alimentosSlice';
import { useState } from 'react';
import MyToast from './MyToast';
const ListadoRegistros = () => {
  const dispatch = useDispatch();
  const registros = useSelector((state) => state.alimentos.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);

  const handleDelete = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem('apiKey'));
    myHeaders.append("iduser", localStorage.getItem('id'));

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`https://calcount.develotion.com/registros.php?idRegistro=${e.target.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch(eliminarRegistroSuccess(e.target.id))
        handleShowToast(result.mensaje, 'success')
      })
      .catch(error => {
        dispatch(eliminarRegistroFailure())
        handleShowToast(error, 'error')
      })

  }

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  const handleShowToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };
  return (
    <>
      <MyToast show={showToast} message={toastMessage} type={toastType} onClose={handleCloseToast} />
      <div>
        {registros.map(r =>
          <div className='row d-flex align-items-center' key={r.id}>
            <div className='col-2'><img src={alimentos.find(a => a.id == r.idAlimento).url}/></div>
            <div className='col-2'>{r.cantidad}{alimentos.find(a => a.id == r.idAlimento).unidad}</div>
            <div className='col-3'>{r.fecha}</div>
            <div className='col-2'><input type="button" id={r.id} className='btn btn-danger' value="Eliminar" onClick={handleDelete} /></div>
          </div>
          )}
      </div>
    </>
  )
}

export default ListadoRegistros