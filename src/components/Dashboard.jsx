import React from 'react'
import { BarraNavegacion } from './BarraNavegacion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AgregarRegistroForm from './AgregarRegistroForm'
import ListadoRegistros from './ListadoRegistros'
import { fetchRegistrosSuccess,fetchRegistrosFailure } from '../redux/alimentosSlice'
import { useDispatch } from 'react-redux'
import InformacionCalorias from './InformacionCalorias'
import UsuariosPorPais from './UsuariosPorPais'
import CaloriasUltimaSemana from './CaloriasUltimaSemana'
import RegistrosPorAlimento from './RegistrosPorAlimento'
export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.apiKey) {
      navigate('/Login');
    }
  }, [navigate])

  useEffect(() => {
    let myApiKey = localStorage.getItem('apiKey');
    let myIdUser = localStorage.getItem('id');

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", myApiKey);
    myHeaders.append("iduser", myIdUser);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(`https://calcount.develotion.com/registros.php?idUsuario=${myIdUser}`,requestOptions)
        .then(response => response.json())
        .then(result => {
            dispatch(fetchRegistrosSuccess(result.registros));
        })
        .catch(error => {
            dispatch(fetchRegistrosFailure(error.message));
        });
}, [dispatch]);

  return (
    <>
      <div className='dashboard-container'>
        <div className="row">
          <div className="col-4 agregar-container"><AgregarRegistroForm/></div>
          <div className="col-5"><RegistrosPorAlimento/></div>
          <div className="col-3"><InformacionCalorias/></div>
        </div>
        <div className="row">
          <div className="col-4 registros-container"><ListadoRegistros/></div>
          <div className="col-5"><CaloriasUltimaSemana/></div>
          <div className="col-3"><UsuariosPorPais/></div>
        </div>
      </div>
      <BarraNavegacion />
    </>
  )
}
