import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imagen from '../svg/imagen.jpg';

const EditarUsuario = () => {

    const turnos = useNavigate();

    const [idPaciente, setIdPaciente] = useState('');

    useEffect(() => {

        let usuario = JSON.parse(localStorage.getItem("usuario"));
        let numDni = usuario.dni;

        axios.get(`http://localhost:3005/pacientes/dni/${numDni}`)
            .then((respuesta) => {
                setIdPaciente(respuesta.data[0].idPaciente);
            })

        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('apellido').value = usuario.apellido;
        document.getElementById('dni').value = usuario.dni;
        document.getElementById('sexo').value = usuario.sexo;
        document.getElementById('fechanacimiento').value = usuario.fechanacimiento;
        document.getElementById('edad').value = usuario.edad;
        document.getElementById('telefono').value = usuario.telefono;
        document.getElementById('email').value = usuario.email;
        document.getElementById('direccion').value = usuario.direccion;
        document.getElementById('ciudad').value = usuario.ciudad;
        document.getElementById('contraseña').value = usuario.contraseña;
        document.getElementById('contraseña2').value = usuario.contraseña;

    }, []);

    function editarUsuario() {

        let contra1 = document.getElementById('contraseña').value.split(' ').join('');
        let contra2 = document.getElementById('contraseña2').value.split(' ').join('');

        if (contra1 !== contra2) {
            alert("Las contraseñas no coinciden. Vuelva a ingresarlas.")
        } else {

            let nombre = document.getElementById('nombre').value
            let apellido = document.getElementById('apellido').value
            let dni = document.getElementById('dni').value
            let sexo = document.getElementById('sexo').value
            let fechanacimiento = document.getElementById('fechanacimiento').value
            let edad = document.getElementById('edad').value
            let telefono = document.getElementById('telefono').value
            let email = document.getElementById('email').value
            let direccion = document.getElementById('direccion').value
            let ciudad = document.getElementById('ciudad').value
            let contraseña = document.getElementById('contraseña').value

            axios.put(`http://localhost:3005/pacientes/${idPaciente}`, {
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

            let usuario = {
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

            localStorage.setItem("usuario", JSON.stringify(usuario));

            alert('¡Cambios aplicados con exito!');
            turnos('/infousuario');
        }
    }

    function volver() {
        window.scrollTo(0, 0);
        turnos('/infousuario');
    }

    return (
        <>
            <div className="conteiner-inp">

                <h2>Editar información</h2>

                <img className='imagen' src={imagen} alt="Imagen" />

                <label className='etiqueta'>Datos personales:</label>

                <input type="text" id='nombre' placeholder='Nombre' />
                <input type="text" id='apellido' placeholder='Apellido' />
                <input type="number" id='dni' placeholder='D.N.I.' />

                <select name="sexo" id='sexo' defaultValue={"Seleccionar sexo"} >
                    <option disabled>Seleccionar sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>

                <label className='etiqueta'>Fecha de nacimiento:</label>

                <input type='date' id='fechanacimiento' />
                <input type="number" id='edad' placeholder='Edad' />

                <label className='etiqueta'>Datos de contacto:</label>

                <input type="text" id='direccion' placeholder='Dirección' />
                <input type="text" id='ciudad' placeholder='Ciudad' />
                <input type="number" id='telefono' placeholder='Telefono' />
                <input type="email" id='email' placeholder='E-mail' />

                <label className='etiqueta'>Contraseña:</label>

                <input type="password" id='contraseña' placeholder='Contraseña' />

                <label className='etiqueta'>Repetir contraseña:</label>

                <input type="password" id='contraseña2' placeholder='Contraseña' />

                <br />

                <button className='btn-solicitar' onClick={() => editarUsuario()} >Guardar cambios</button>
                <button className='btn-solicitar' onClick={() => volver()}>Volver</button>

            </div>
        </>
    )
}

export default EditarUsuario;