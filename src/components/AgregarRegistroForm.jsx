import React from 'react'
import ListadoAlimentos from './ListadoAlimentos';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registrarAlimentoSuccess,registrarAlimentoFailure } from '../redux/alimentosSlice';
import MyToast from './MyToast';
const AgregarRegistroForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        idAlimento: 0,
        idUsuario: localStorage.getItem('id'),
        cantidad: 0,
        fecha: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        registrarAlimento();
    };
    const handleAlimentoChange = (selectedAlimento) => {
        setFormData({ ...formData, idAlimento: selectedAlimento });
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const registrarAlimento = async () => {
        try {    
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("apikey", localStorage.getItem('apiKey'));
          myHeaders.append("iduser", localStorage.getItem('id'));
    
          const raw = JSON.stringify(formData);
    
          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };
    
          const response = await fetch('https://calcount.develotion.com/registros.php', requestOptions);
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
          const data = await response.json();
          dispatch(registrarAlimentoSuccess({...formData,id: data.idRegistro}));
          handleShowToast(data.mensaje, 'success');
        } catch (error) {
          dispatch(registrarAlimentoFailure(error.message));
          handleShowToast('Error al registrar alimento', 'error');
        }
      };
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
        <div className='form-style'>
            <MyToast show={showToast} message={toastMessage} type={toastType} onClose={handleCloseToast}/>
            <div>
                <label htmlFor="idAlimento">Alimento</label>
                <ListadoAlimentos handleAlimentoChange={handleAlimentoChange} />
            </div>
            <div>
                <label htmlFor="cantidad">Cantidad</label>
                <input type="number" id="cantidad" name="cantidad" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="fecha">Fecha</label>
                <input type="date" id="fecha" name="fecha" onChange={handleChange} />
            </div>
            <div>
                <input type="button" value="Agregar registro" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default AgregarRegistroForm