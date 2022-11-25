import React from 'react'

const Footer = () => {
  return (
    <>
        <footer id="contacto">
        <div className="contenedor footer-contenedor">
            <div className="contacto">
                <h2>Centro de Salud Monteros</h2>
                <p>Somos el centro de cuidado de la salud más grande del sur de la provincia</p>
            </div>
            <div className="redes-sociales">
                <a href="./" className="icono twitter">
                    <i className="fa-brands fa-twitter"></i>
                </a>

                <a href="./" className="icono facebook">
                    <i className="fa-brands fa-facebook-f"></i>
                </a>

                <a href="./" className="icono instagram">
                    <i className="fa-brands fa-instagram"></i>
                </a>
            </div>
        </div>
        <div className="linea"></div>
    </footer>
    </>
  )
}

export default Footer;