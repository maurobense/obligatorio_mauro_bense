import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ListadoPaises from './ListadoPaises';
import { registerStart,registerSuccess,registerFailure } from '../redux/authSlice';

const RegistroForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
    pais: '', 
    caloriasDiarias: 0,
  });
const registerUser = async()=>{
    try {
      dispatch(registerStart());
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify(formData);
  
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
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  const handlePaisChange = (selectedPais) => {
    console.log(selectedPais)
    setFormData({ ...formData, pais: selectedPais });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usuario">Usuario</label>
        <input type="text" id="usuario" name="usuario" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="contrasena">Contraseña</label>
        <input type="password" id="contrasena" name="contrasena" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="pais">País de Residencia</label>
        <ListadoPaises handlePaisChange={handlePaisChange} />
      </div>
      <div>
        <label htmlFor="caloriasDiarias">Calorías Diarias Recomendadas</label>
        <input
          type="number"
          id="caloriasDiarias"
          name="caloriasDiarias"
          min="0"
          onChange={handleChange}
        />
      </div>
      <div>
        <input type="submit" value="Registro" />
      </div>
    </form>
  );
};

export default RegistroForm;
