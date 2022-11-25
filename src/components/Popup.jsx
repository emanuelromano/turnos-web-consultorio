import React from 'react'
import './Popup.css'

function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className="popup-interno">
                {/* <button className="cerrar-btn" onClick={() => props.setTrigger(false)}>X</button> */}
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;