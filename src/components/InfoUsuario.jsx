import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from '../svg/imagen.jpg';
import './InfoUsuario.css';

const InfoPaciente = () => {

    const nav = useNavigate();
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {

        let us = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(us);
    }, []);

    function editarInfo() {
        window.scrollTo(0, 0);
        nav('/editarusuario');
    }

    function volver() {
        window.scrollTo(0, 0);
        nav('/turnos');
    }


    return (
        <div>
            <div className='info-paciente'>

                <h2>Información del usuario</h2>

                <img className='imagen' src={imagen} alt="Imagen" />

                <div className='p'>
                    <b>Nombre y apellido:</b> {usuario.nombre} {usuario.apellido} <br />
                    <b>DNI:</b> {usuario.dni} <br />
                    <b>Sexo:</b> {usuario.sexo} <br />
                    <b>Fecha de nacimiento:</b> {usuario.fechanacimiento} <br />
                    <b>Edad:</b> {usuario.edad} <br />
                    <br />
                    <h4>Datos de contacto</h4>
                    <b>Dirección:</b> {usuario.direccion} <br />
                    <b>Ciudad:</b> {usuario.ciudad} <br />
                    <b>Teléfono:</b> {usuario.telefono} <br />
                    <b>Email:</b> {usuario.email} <br />
                </div>

                <br />

                <button onClick={() => editarInfo()}>Editar información</button>
                <button onClick={() => volver()}>Volver</button>
            </div>
        </div>
    )
}

export default InfoPaciente