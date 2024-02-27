import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPaises } from '../redux/paisesSlice';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from '../img/markerIcon.png';
const UsuariosPorPais = () => {
  const dispatch = useDispatch();
  const { paises } = useSelector((state) => state.paises);
  const [paisesConCantidadUsuarios, setPaisesConUsuarios] = useState([]);
  const [paisesConCantidadUsuariosFiltrado, setPaisesConUsuariosFiltrado] = useState([]);

  useEffect(() => {
    dispatch(getPaises())
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", localStorage.getItem('apiKey'));
    myHeaders.append("iduser", localStorage.getItem('id'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://calcount.develotion.com/usuariosPorPais.php", requestOptions)
      .then(response => response.json())
      .then(result => setPaisesConUsuarios(result.paises))
      .catch(error => console.log('error', error));

  }, [dispatch]);

  useEffect(() => {
    let paisesConCantUsuariosFiltrado = [];

    if (paisesConCantidadUsuarios.length > 0 && paises.length > 0) {
      paisesConCantUsuariosFiltrado = paises
        .filter(pais => paisesConCantidadUsuarios.some(pu => pu.id === pais.id))
        .map(pais => ({
          ...pais,
          cantidadDeUsuarios: paisesConCantidadUsuarios.find(pu => pu.id === pais.id)?.cantidadDeUsuarios
        }));
    }
    setPaisesConUsuariosFiltrado(paisesConCantUsuariosFiltrado);
  }, [paisesConCantidadUsuarios,paises]);
  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize:[25,41],
    iconAnchor:[12,41],
    popupAnchor:[1,-34],
    tooltipAnchor:[16,-28],
    shadowSize:[41,41]
});
 
  return (
    <div className='text-center'>
      <h4>UsuariosPorPais</h4>
      {paisesConCantidadUsuariosFiltrado.length > 0 && (
        <MapContainer
          style={{ height: '400px', width: '100%' }}
          center={[0, 0]}
          zoom={2}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {paisesConCantidadUsuariosFiltrado.map((pais) => (
            <Marker
              key={pais.id}
              position={[pais.latitude, pais.longitude]} 
              icon={customMarkerIcon}
            >
              <Popup>
                {pais.name} - Cantidad de Usuarios: {pais.cantidadDeUsuarios}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default UsuariosPorPais;
