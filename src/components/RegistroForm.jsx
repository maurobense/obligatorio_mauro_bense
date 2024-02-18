import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ListadoPaises from './ListadoPaises';
import { registerUser } from '../redux/authSlice';

const RegistroForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
    pais: '', 
    caloriasDiarias: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
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
