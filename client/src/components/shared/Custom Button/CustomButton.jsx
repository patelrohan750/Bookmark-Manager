import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import './CustomButton.css'
const CustomButton = ({onClick,text,children}) => {
    return (
       
            <button className="custom__btn" onClick={onClick}>
            {children}
           
                <span>{text}</span>
                <BsArrowRight className="arrow"/>
            </button>
       
    )
}

export default CustomButton
