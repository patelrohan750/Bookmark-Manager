import React from 'react'
import './CongratsCard.css'
import { GoVerified } from "react-icons/go";
import {Link} from 'react-router-dom'
const CongratsCard = () => {
    return (
        <div className="congrats_card_container">
            <div className="congrats_img">
                <img src="/images/verified.png" alt="" />
            </div>
            <h1 className="congrats_titile"> <GoVerified style={{color:"#198754"}}/> Your email account is verified</h1>
            <Link to='/login'>
            <button className="congrats_btn">Continue</button>
            </Link>
        </div>
    )
}

export default CongratsCard
