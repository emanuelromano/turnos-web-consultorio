import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { Dna } from 'react-loader-spinner';

const Reserva = () => {

    const nav = useNavigate();

    const [doctores, setDoctores] = useState([]);
    const [usuarioActivo, setUsuarioActivo] = useState({});
    const [botonPopup, setBotonPopup] = useState(false);
    const [carga, setCarga] = useState(false);

    useEffect(() => {

        axios.get(`http://localhost:3005/doctoreslista/`)
            .then((respuesta) => {

                setDoctores(respuesta.data);
                setUsuarioActivo(JSON.parse(localStorage.getItem("usuario")));

            })

    }, []);

    function validarDatos() {
        let doc = document.getElementById('doctor').value;
        let fec = document.getElementById('fechaturno').value;
        let hor = document.getElementById('horario').value;

        if (doc === "Seleccionar Doctor" || fec === "" || hor === "Horario") {
            alert("Ingrese los datos requeridos para solicitar un turno.")
        } else {
            popup();
        }
    }

    function cargarTurno() {

        let idDoctor = document.getElementById('doctor').value;
        let idPaciente = usuarioActivo.idPaciente;
        let dni = usuarioActivo.dni;
        let fecha = document.getElementById('fechaturno').value;
        let horario = document.getElementById('horario').value;
        let observaciones = "";

        axios.post(`http://localhost:3005/turnos/`, {
            idDoctor,
            idPaciente,
            dni,
            fecha,
            horario,
            observaciones
        })

        let doctor = doctores.filter(doc => doc.idDoctor == idDoctor)

        let ultimoTurno = {
            nombredoc: doctor[0].nombre,
            apellidodoc: doctor[0].apellido,
            especialidad: doctor[0].especialidad,
            dni,
            fecha,
            horario,
            observaciones
        }

        localStorage.setItem("ultimoTurno", JSON.stringify(ultimoTurno));

        nav('/verturno');
    }

    function popup() {
        setCarga(true);
        setBotonPopup(true);

        setTimeout(() => {
            setCarga(false);
            cargarTurno();
        }, 1000);
    }

    function volver() {
        nav('/turnos');
    }

    return (
        <>
            <div className="conteiner-inp">

                <h2>Reserva de nuevo turno</h2>

                <label className='etiqueta'>Especialista:</label>

                <select name="doctor" id='doctor' defaultValue={"Seleccionar Doctor"}>
                    <option disabled>Seleccionar Doctor</option>
                    <>
                        {doctores.map((doctor, index) =>
                            <option key={index} value={doctor.idDoctor}>Dr. {doctor.nombre} {doctor.apellido} ({doctor.especialidad})</option>
                        )}
                    </>
                </select>

                <label className='etiqueta'>Seleccionar fecha:</label>

                <input type='date' id='fechaturno' format="dd-mm-yyyy" />

                <label className='etiqueta'>Seleccionar horario:</label>

                <select name="horario" id='horario' defaultValue={"Horario"} >
                    <option disabled>Horario</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                </select>

                <br />

                <button className='btn-solicitar' onClick={() => validarDatos()} >Solicitar</button>
                <button className='btn-solicitar' onClick={() => volver()}>Volver</button>

                <Popup trigger={botonPopup} setTrigger={setBotonPopup}>
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
            </div>
        </>
    )
}

export default Reserva;