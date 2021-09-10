import React from 'react'
import './TextInput.css'
const TextInput = (props) => {
    return (
        <div className={`input_div ${props.isinvalid}`}>
            <img className="input_img" src={`/images/${props.icon}.png`}/>
            <input className="custom__input"  {...props}/>
        </div>
    )
}

export default TextInput
