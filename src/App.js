import store from './redux/storeConfig';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { BarraNavegacion } from './components/BarraNavegacion';
import { LoginView } from './components/LoginView';
import RegistroForm from './components/RegistroForm';
import './estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dashboard } from './components/Dashboard';
import 'leaflet/dist/leaflet.css'


function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<Navigate to='/Login' />} />
            <Route path='/Login' element={<LoginView />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Registro' element={<RegistroForm />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
     );
}

export default App;
