import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import axios from 'axios';
import './Turnos.css';
import { Link, useNavigate } from "react-router-dom";
import imagen from '../svg/imagen.jpg';
import hecho from '../svg/hecho.png';
import Popup from './Popup';
import { Dna } from 'react-loader-spinner';

const Turnos = () => {

  const nav = useNavigate();

  const [usuarioActivo, setUsuarioActivo] = useState({});
  const [turnosUsuario, setTurnosUsuario] = useState([]);
  const [tablaOculta, setTablaOculta] = useState(true);
  const [botonPopup, setBotonPopup] = useState(false);
  const [botonPopup2, setBotonPopup2] = useState(false);
  const [botonPopup3, setBotonPopup3] = useState(false);
  const [datosTurno, setDatosTurno] = useState('');

  useEffect(() => {

    setUsuarioActivo(JSON.parse(localStorage.getItem("usuario")));

    let us = JSON.parse(localStorage.getItem("usuario"));

    axios.get(`http://localhost:3005/turnos/${us.dni}`)
      .then((respuesta) => {

        if (respuesta.data.length === 0) {
          setTablaOculta(true);
        } else {
          setTurnosUsuario(respuesta.data);
          setTablaOculta(false);
        }
      })

  }, []);

  function eliminarTurno(idTurno) {
    axios.delete(`http://localhost:3005/turnos/${idTurno}`)
      .then(() => {

        axios.get(`http://localhost:3005/turnos/${usuarioActivo.dni}`)
          .then((respuesta) => {

            if (respuesta.data.length === 0) {
              setTablaOculta(true);
              setBotonPopup(false);
              setBotonPopup3(true);
            } else {
              setTurnosUsuario(respuesta.data);
              setTablaOculta(false);
              setBotonPopup(false);
              setBotonPopup3(true);
            }
          })
      })
  }

  function popup(datos) {
    setDatosTurno(datos);
    setBotonPopup(true);
  }

  function popupImp(datos) {

    let dni = usuarioActivo.dni;
    let fecha = datos.fecha;
    let horario = datos.horario;
    let observaciones = datos.observaciones;

    let ultimoTurno = {
      nombredoc: datos.nombredoc,
      apellidodoc: datos.apellidodoc,
      especialidad: datos.especialidad,
      dni,
      fecha,
      horario,
      observaciones
    }

    localStorage.setItem("ultimoTurno", JSON.stringify(ultimoTurno));

    setBotonPopup2(true)

    setTimeout(() => {
      nav('/verturno')
    }, 1000);
  }

  function cerrarSesion() {
    localStorage.clear();
    window.scrollTo(0, 0);
    nav('/');
  };

  return (
    <>
      <div className='container'>

        <div className='top'>
          <div className='top-img-titulo'>
            <img className='imagen-bienvenida' src={imagen} alt="" />

            <h1 className='bienvenida'> {usuarioActivo.sexo === "Masculino" ? "¡Bienvenido, " : "¡Bienvenida, "} {usuarioActivo.nombre}!</h1>
          </div>

          <div className='container-botones-mini'>
            <Link to="/infousuario">
              <button className='boton-mini'>Información usuario</button>
            </Link>

            <button onClick={() => cerrarSesion()} className='boton-mini-cerrar'>Cerrar sesión</button>
          </div>
        </div>

        <div className='misturnos'>
          <h2>Mis turnos</h2>

          <div className='boton-turno'>
            <Link to="/reserva">
              <button className='boton-nuevo-turno'>Nuevo turno</button>
            </Link>
          </div>
        </div>

        <div className='tabla'>
          <table hidden={tablaOculta}>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Doctor</th>
                <th>Especialidad</th>
                <th>Fecha</th>
                <th>Horario</th>
              </tr>
            </thead>

            <tbody>
              {
                turnosUsuario.map((datos, index) => (
                  <tr key={index}>
                    <td>{usuarioActivo.nombre} {usuarioActivo.apellido}</td>
                    <td>{datos.nombredoc} {datos.apellidodoc}</td>
                    <td>{datos.especialidad}</td>
                    <td>{datos.fecha}</td>
                    <td>{datos.horario}</td>
                    <td> <button className='boton-imprimir' onClick={() => popupImp(datos)}>I</button> </td>
                    <td> <button className='boton-eliminar' onClick={() => popup(datos)}>X</button> </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          <Popup trigger={botonPopup} setTrigger={setBotonPopup}>
            <h3>¿Realmente desea eliminar el turno seleccionado?</h3> <br />

            <p>
              <b>Doctor:</b> {datosTurno.nombredoc} {datosTurno.apellidodoc} <br />
              <b>Especialidad:</b> {datosTurno.especialidad} <br />
              <b>Fecha:</b> {datosTurno.fecha} <br />
              <b>Horario:</b> {datosTurno.horario}
            </p>

            <div className='botones-popup'>
              <div>
                <button className='btn-elim' onClick={() => eliminarTurno(datosTurno.idTurno)}>Sí, eliminar</button>
              </div>
              <div>
                <button className='btn-can' onClick={() => setBotonPopup(false)}>Cancelar</button>
              </div>
            </div>
          </Popup>

          <Popup trigger={botonPopup2} setTrigger={setBotonPopup2}>
            <h1 className='popup-titulo'>Cargando...</h1> <br />

            <div className='spinner'>
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          </Popup>

          <Popup trigger={botonPopup3} setTrigger={setBotonPopup3}>
            <h1 className='popup-titulo'>Turno eliminado</h1> <br />

            <div className='spinner'>
              <img className='imagen-bienvenida' src={hecho} alt="" />
            </div>

            <div className='botones-popup'>
              <div>
                <button className='btn-can' onClick={() => setBotonPopup3(false)}>Aceptar</button>
              </div>
            </div>
          </Popup>

        </div>

        <h2 className='no-turnos' hidden={!tablaOculta}>No hay turnos registrados.</h2>

      </div>
    </>
  )
};

export default Turnos;