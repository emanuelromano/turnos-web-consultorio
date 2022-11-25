import React from 'react';
import Doctores from './Doctores';
import svg1 from '../svg/Designer _Two Color.png';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Contendor = () => {

  // El hook useNavigate devuelve una función que permite navegar programáticamente
  const ingreso = useNavigate();

  function ingresar() {
    localStorage.clear();
    window.scrollTo(0, 0);
    ingreso('/iniciarsesion');
  }

  return (
    <>
      <div className="conteiner--p">
        <img src={svg1} alt="" />
        <div className="linea-vert"></div>
        <p className='informacion'>Esta es la página oficial del Centro de Salud Monteros · Aquí podras reservar y ver sus turnos. 
        Para poder sacar turnos necesita iniciar sesión con su documento y luego completar los pasos para poder solicitar el <b>turno</b>.</p>
      </div>

      <div className="conteiner-button">
        <button onClick={ingresar}> <strong>Iniciar sesión</strong> </button>
      </div>

      <Doctores />
      
      <br /><br />

      <Footer />
    </>
  )
}

export default Contendor;