import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import './InfoUsuario.css';
import imagen from '../img/doc.png';

const VerTurno = () => {

    const nav = useNavigate();

    const [ultimoTurno, setUltimoTurno] = useState([]);
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {

        setUltimoTurno(JSON.parse(localStorage.getItem("ultimoTurno")));
        let us = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(us);

    }, []);

    function imprimir() {
         html2canvas(document.querySelector("#comprobante"), { scale: 1 })
            .then(canvas => {
                var a = canvas.toDataURL("image/png");
                var doc = new jsPDF('p', 'mm');
                doc.addImage(a, 'PNG', 10, 10);
                doc.save(`Comprobante-Turno-${usuario.nombre}-${usuario.apellido}.pdf`);
            });
    }

    function volver() {
        window.scrollTo(0, 0);
        nav('/turnos');
    }

    return (
        <div>
            <div className='info-paciente'>

                <h2>Turno reservado</h2> <br />

                <div className='p' id='comprobante'>
                    <img className='imagen-turno' src={imagen} alt="Imagen" />
                    <h3>Centro de Salud Monteros</h3> <br />
                    
                    <h5>Comprobante de turno:</h5> <br />

                    <b>Nombre y apellido:</b> {usuario.nombre} {usuario.apellido} <br />
                    <b>DNI:</b> {usuario.dni} <br />
                    <br />
                    {/* <h5>Datos del turno</h5> <br /> */}
                    <b>Doctor:</b> {ultimoTurno.nombredoc} {ultimoTurno.apellidodoc}<br />
                    <b>Especialidad:</b> {ultimoTurno.especialidad} <br /> <br />
                    <b>Fecha:</b> {ultimoTurno.fecha} <br />
                    <b>Horario:</b> {ultimoTurno.horario} <br />
                </div>

                <br />

                <button onClick={() => imprimir()}>Imprimir comprobante</button>
                <button onClick={() => volver()}>Volver</button>
            </div>
        </div>
    )
}

export default VerTurno;