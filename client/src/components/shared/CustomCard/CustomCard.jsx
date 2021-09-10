import React from 'react'
import './CustomCard.css'

const CustomCard = ({title,icon,children }) => {
    return (
       <div className="card__wrapper">
            <div className="custom__card">
           <div className="card__header">
           {icon && <img src={`/images/${icon}.png`} alt="hello" />}
            
            {title && <h1 className="card__title">{title}</h1>}
               
            </div>
            <div className="card__body">
            {children }
            </div>
           
               
           
        </div>
       </div>
    )
}

export default CustomCard
