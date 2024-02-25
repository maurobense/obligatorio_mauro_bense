import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ListadoPaises from './ListadoPaises';
import { registerStart,registerSuccess,registerFailure } from '../redux/authSlice';
import { useNavigate } from 'react-router';


const RegistroForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      if(user.apiKey != null)
      {
        navigate('/Dashboard')
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
  const handleSubmit = async(e) => {
    await registerUser();
  };

  const handlePaisChange = (selectedPais) => {
    setFormData({ ...formData, pais: selectedPais });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='form-style'>
      <div>
        <label htmlFor="usuario">Usuario</label>
        <input type="text" id="usuario" name="usuario" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="contrasena">Contraseña</label>
        <input type="password" id="contrasena" name="password" onChange={handleChange} />
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
        <input type="button" value="Registro" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default RegistroForm;
