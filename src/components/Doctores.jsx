import React from 'react';
import mopty from '../img/mopty.jpg';
import romano from '../img/romano.jpg';
import villagra from '../img/villagra.jpg';

const Doctores = () => {
    return (
        <>
            <div className="container-dr" id='doctores'>
                <h1>Nuestros especialistas:</h1>
                
                <div className="dr dr-mopty">
                    <div className="container__dr-img" >
                        <img src={mopty} alt="mopty" title='Dr. Mopty' />
                    </div>
                    <p className='texto-doc'>El doctor Enrique Mopty se graduó en el 2021 de la facultad de Medicina de Tucumán, teniendo un promedio final de 8.6 y haciendo más de 8 cursos y doctorados con tan solo 24 años. </p>
                </div>
                <div className="dr dr-villagra">
                    <p className='texto-doc'> El doctor Miguel Villagra es el pionero de la empresa, se graduó en el año 2002 y trabaja desde hace 15 años. A día de hoy el Dr. viajó a una decena de paises para dar charlas.</p>
                    <div className="container__dr-img">
                        <img src={villagra} alt="villagra" title='Dr. Villagra' />
                    </div>
                </div>
                <div className="dr dr-romano">
                    <div className="container__dr-img">
                        <img src={romano} alt="romano" title='Dr. Romano' />
                    </div>
                    <p className='texto-doc'>El doctor "Pepe" Romano fue el segundo en ingresar en la empresa. Egresado de la UBA, su promedio final fue de 8.5. Trabajó en 3 empresas antes de ingresar al Centro de Salud Monteros.</p>
                </div>
            </div>
        </>
    )
}

export default Doctores;