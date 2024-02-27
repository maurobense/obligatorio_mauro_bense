import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eliminarRegistroSuccess, eliminarRegistroFailure, calcularCalorias } from '../redux/alimentosSlice';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import MyToast from './MyToast';

const ListadoRegistros = () => {
  const dispatch = useDispatch();
  const registros = useSelector((state) => state.alimentos.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);

  
  const [filtro, setFiltro] = useState('todo');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

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

  const handleShowToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const filtrarRegistros = () => {
    const currentDate = new Date();
    switch (filtro) {
      case 'dia':
        return registros.filter(r => r.fecha === currentDate.toISOString().split('T')[0]);

      case 'semana':
        const startOfLastWeek = startOfDay(new Date(currentDate));
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 6);
        const endOfLastWeek = endOfDay(new Date(currentDate));
        return registros.filter(r => new Date(r.fecha) >= startOfLastWeek && new Date(r.fecha) <= endOfLastWeek);
      case 'mes':
        return registros.filter(r => r.fecha.slice(0, 7) === currentDate.toISOString().slice(0, 7));

      default:
        return registros;
    }
  };
  const registrosFiltrados = filtrarRegistros();

  return (
    <>
      <MyToast show={showToast} message={toastMessage} type={toastType} onClose={handleCloseToast} />

      <div className='filter-container'>
        <h3>Filtro:</h3>
        <input type="button" value="Todo el historial" onClick={() => setFiltro('todo')} />
        <input type="button" value="Dia" onClick={() => setFiltro('dia')} />
        <input type="button" value="Semana" onClick={() => setFiltro('semana')} />
        <input type="button" value="Mes" onClick={() => setFiltro('mes')} />
      </div>
      <div className='row'>

        {registrosFiltrados && registrosFiltrados.length > 0 ? (
          <div className={`d-flex align-items-center justify-content-center mt-3`}>
            <div className='col-2 text-center'></div>
            <div className='col-2 text-center'><strong>nombre</strong></div>
            <div className='col-2 text-center'><strong>cantidad</strong></div>
            <div className='col-2 text-center'><strong>calorias</strong></div>
            <div className='col-2 text-center'><strong>fecha</strong></div>
            <div className='col-2 d-flex justify-content-center'></div>
          </div>
        ) : (
          <></>
        )}

        {registrosFiltrados && registrosFiltrados.length > 0 ? (
          registrosFiltrados.map((r, index) => (
            <div className={`d-flex align-items-center justify-content-center mt-3`} key={r.id}>
              <div className='col-2 text-left'>
                {alimentos.find(a => a.id == r.idAlimento).imagen !== null ? (
                  <img src={`https://calcount.develotion.com/imgs/${alimentos.find(a => a.id == r.idAlimento)?.imagen}.png`} alt={`Imagen ${r.idAlimento}`} />
                ) : (
                  <span>Imagen no disponible</span>
                )}
              </div>
              <div className='col-2 text-center'>{alimentos.find(a => a.id == r.idAlimento)?.nombre}</div>
              <div className='col-2 text-center'>{r.cantidad?.toString()}{alimentos.find(a => a.id == r.idAlimento)?.porcion.substr(-1)}</div>
              <div className='col-2 text-center'>
                {alimentos.find(a => a.id == r.idAlimento) ? (
                  calcularCalorias(r.cantidad, alimentos.find(a => a.id == r.idAlimento))
                ) : (
                  <span>Unidad no disponible</span>
                )}
              </div>
              <div className='col-2 text-center'>{r.fecha?.toString()}</div>
              <div className='col-2 d-flex justify-content-end'>
                <input type="button" id={r.id} className='btn btn-danger' value="Eliminar" onClick={handleDelete} />
              </div>
            </div>
          ))
        ) : (
          <div className='text-center mt-3'>No hay registros filtrados.</div>
        )}


      </div>
    </>
  );
};

export default ListadoRegistros;
