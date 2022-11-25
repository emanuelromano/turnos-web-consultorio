import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Popup from './Popup';
import { Dna } from 'react-loader-spinner';

const InicioSesion = () => {

    const ingresar = useNavigate();
    const [botonPopup, setBotonPopup] = useState(false);

    useEffect(() => {

        localStorage.clear();

    }, []);

    function verificar() {

        let usuario = document.getElementById('usuario').value.split(' ').join('');
        let contraseña = document.getElementById('contraseña').value.split(' ').join('');

        if (usuario === '' || contraseña === '') {
            alert('Ingrese un usuario y contraseña correctos.');
        } else {

            axios.get(`http://localhost:3005/pacientes/usuario/${usuario}`)
                .then((respuesta) => {

                    let existe = respuesta.data[0].existe;

                    if (existe === 0) {
                        alert('Este usuario no existe. Ingrese un usuario válido.');
                    } else {

                        axios.get(`http://localhost:3005/pacientes/contra/${usuario}`)
                            .then((respuesta) => {

                                let contra = respuesta.data[0].contraseña;

                                if (contra === contraseña) {
                                    popup();
                                } else {
                                    alert('Contraseña incorrecta.');
                                }
                            })
                    }
                })
        }
    }

    function popup() {
        setBotonPopup(true);

        setTimeout(() => {
            iniciarSesion();
        }, 1000);
    }

    function iniciarSesion() {

        let usuario = document.getElementById('usuario').value;

        axios.get(`http://localhost:3005/pacientes/dni/${usuario}`)
            .then((respuesta) => {
                let usuarioActivo = respuesta.data[0];

                let idPaciente = usuarioActivo.idPaciente;
                let nombre = usuarioActivo.nombre;
                let apellido = usuarioActivo.apellido;
                let dni = usuarioActivo.dni;
                let sexo = usuarioActivo.sexo;
                let fechanacimiento = usuarioActivo.fechanacimiento;
                let edad = usuarioActivo.edad;
                let telefono = usuarioActivo.telefono;
                let email = usuarioActivo.email;
                let direccion = usuarioActivo.direccion;
                let ciudad = usuarioActivo.ciudad;
                let contraseña = usuarioActivo.contraseña;

                let usuarioLocal = {
                    idPaciente,
                    nombre,
                    apellido,
                    dni,
                    usuario: dni,
                    sexo,
                    fechanacimiento,
                    edad,
                    telefono,
                    email,
                    direccion,
                    ciudad,
                    contraseña
                }

                localStorage.setItem("usuario", JSON.stringify(usuarioLocal));

                ingresar('/turnos');
            })
    }

    function nuevoUsuario() {
        ingresar('/nuevousuario');
    }

    function administracion() {
        ingresar('/iniciarsesionadmin');
    }

    function volver() {
        localStorage.clear();
        window.scrollTo(0, 0);
        ingresar('/');
    }

    return (
        <>
            <div className="conteiner-inp">

                <h2>Iniciar sesión</h2> <br />

                <input type="number" id="usuario" placeholder='Usuario (DNI)' required />
                <input type="password" id="contraseña" placeholder='Contraseña' required />

                <button className='btn-solicitar' onClick={() => verificar()}>Ingresar</button>

                <label className='etiqueta'>o bien:</label>

                <div className="conteiner-button">
                    <button onClick={nuevoUsuario} className='btn-solicitar'>Crear nuevo usuario</button>
                </div>

                <button className='btn-solicitar' onClick={() => administracion()}>Administración</button>

                <br />
                <div className="conteiner-button">
                    <button onClick={volver}> <strong>Volver</strong> </button>
                </div>

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

export default InicioSesion;