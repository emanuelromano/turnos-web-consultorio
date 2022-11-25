import './App.css';
import Reserva from './components/Reserva';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contenedor from './components/Contenedor';
import InicioSesion from './components/InicioSesion';
import InicioSesionAdmin from './components/InicioSesionAdmin';
import Turnos from './components/Turnos';
import NuevoUsuario from './components/NuevoUsuario';
import EditarUsuario from './components/EditarUsuario';
import InfoPaciente from './components/InfoUsuario';
import VerTurno from './components/VerTurno';
import imagen from './img/doc.png';

function App() {

  return (
    <>

      <div className='conteiner-header'>
        <header className='cabecera'>
          <div className='img-titulo'>
            <img className='imagen' src={imagen} alt="Imagen" /> <h1>Centro de Salud Monteros</h1>
          </div>
        </header>
      </div>

      {/* Se inicializan las rutas para cada componente */}
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Contenedor />} />
          <Route exact path='/reserva' element={<Reserva />} />
          <Route exact path='/principal' element={<Contenedor />} />
          <Route exact path='/iniciarsesion' element={<InicioSesion />} />
          <Route exact path='/iniciarsesionadmin' element={<InicioSesionAdmin />} />
          <Route exact path='/turnos' element={<Turnos />} />
          <Route exact path='/verturno' element={<VerTurno />} />
          <Route exact path='/infousuario' element={<InfoPaciente />} />
          <Route exact path='/nuevousuario' element={<NuevoUsuario />} />
          <Route exact path='/editarusuario' element={<EditarUsuario />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;