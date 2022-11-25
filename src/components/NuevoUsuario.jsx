import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imagen from '../svg/imagen.jpg';

const NuevoUsuario = () => {

    const inicio = useNavigate();

    function validarDatos() {

        let usuario = document.getElementById('dni').value

        axios.get(`http://localhost:3005/pacientes/usuario/${usuario}`)
            .then((respuesta) => {

                let existe = respuesta.data[0].existe;

                if (existe === 1) {
                    alert('Este usuario ya existe.');
                } else {
                    let contra1 = document.getElementById('contraseña').value.split(' ').join('');
                    let contra2 = document.getElementById('contraseña2').value.split(' ').join('');

                    if (contra1 === '' || contra2 === '') {
                        alert("Debe ingresar una contraseña en ambos campos.")
                    } else if (contra1 !== contra2) {
                        alert("Las contraseñas no coinciden. Vuelva a ingresarlas.")
                    } else {
                        cargarDatos()
                    }
                }
            })
    }

    function cargarDatos() {

        localStorage.clear();

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let dni = document.getElementById('dni').value;
        let sexo = document.getElementById('sexo').value;
        let fechanacimiento = document.getElementById('fechanacimiento').value;
        let edad = document.getElementById('edad').value;
        let telefono = document.getElementById('telefono').value;
        let email = document.getElementById('email').value;
        let direccion = document.getElementById('direccion').value;
        let ciudad = document.getElementById('ciudad').value;
        let contraseña = document.getElementById('contraseña').value;

        axios.post(`http://localhost:3005/pacientes/`, {
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
        })

        let usuarioActivo = {
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

        localStorage.setItem("usuario", JSON.stringify(usuarioActivo));

        exito();
    }

    function exito() {
        alert("¡Usuario creado con exito!");
        inicio('/turnos');
    }

    function volver() {
        window.scrollTo(0, 0);
        inicio('/iniciarsesion');

    }

    return (
        <>
            <div className="conteiner-inp">

                <div className="conteiner-inp">

                    <h2>Ingrese sus datos para crear su usuario</h2>

                    <img className='imagen' src={imagen} alt="Imagen" />

                    <label className='etiqueta'>Datos personales:</label>

                    <input type="text" id='nombre' placeholder='Nombre' required />
                    <input type="text" id='apellido' placeholder='Apellido' required />
                    <input type="number" id='dni' placeholder='D.N.I.' required />

                    <select name="sexo" id='sexo' defaultValue={"Seleccionar sexo"} required >
                        <option disabled>Seleccionar sexo</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>

                    <label className='etiqueta'>Fecha de nacimiento:</label>

                    <input type='date' id='fechanacimiento' required />
                    <input type="number" id='edad' placeholder='Edad' required />

                    <label className='etiqueta'>Datos de contacto:</label>

                    <input type="text" id='direccion' placeholder='Dirección' required />
                    <input type="text" id='ciudad' placeholder='Ciudad' required />
                    <input type="number" id='telefono' placeholder='Telefono' required />
                    <input type="email" id='email' placeholder='E-mail' />

                    <label className='etiqueta'>Contraseña:</label>

                    <input type="password" id='contraseña' placeholder='Contraseña' required />

                    <label className='etiqueta'>Repetir contraseña:</label>

                    <input type="password" id='contraseña2' placeholder='Contraseña' required />

                    <br />

                    <button className='btn-solicitar' onClick={() => validarDatos()} >Crear usuario</button>
                    <button className='btn-solicitar' onClick={() => volver()}>Volver</button>
                </div>
            </div>
        </>
    )
}

export default NuevoUsuario;