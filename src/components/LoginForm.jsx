import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser();
  };
  const loginUser = async () => {
    try {
      dispatch(loginStart());

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(formData);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('https://calcount.develotion.com/login.php', requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const user = await response.json();
      console.log(user)
      dispatch(loginSuccess(user));
      if(user.apiKey != null){
        navigate('/Dashboard');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  return (
    <div className='form-style'>
      <div>
        <label htmlFor="login_usuario">Usuario</label>
        <input type="text" id="login_usuario" name="usuario" placeholder="ejemplo@gmail.com" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="login_contrasena">Contraseña</label>
        <input type="password" id="login_contrasena" name="password" placeholder="********" onChange={handleChange} />
      </div>
      <div>
        <input type="button" value="Iniciar sesión" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default LoginForm;
