import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login_usuario">Usuario</label>
        <input type="text" id="login_usuario" name="usuario" placeholder="ejemplo@gmail.com" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="login_contrasena">Contraseña</label>
        <input type="password" id="login_contrasena" name="contrasena" placeholder="********" onChange={handleChange} />
      </div>
      <div>
        <input type="submit" value="Iniciar sesión" />
      </div>
    </form>
  );
}

export default LoginForm;
