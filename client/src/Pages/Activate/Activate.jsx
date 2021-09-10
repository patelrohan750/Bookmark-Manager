import React, { useState, useEffect } from 'react'
import CongratsCard from './CongraulationsCard/CongratsCard'
import './activate.css'
import { useParams } from 'react-router'
import axios from '../../http/index'
import {Spinner} from 'react-bootstrap'
import Notification from '../../components/shared/Notification/Notification'
import { toast } from 'react-toastify';
import Loader from '../../components/shared/Loader/Loader'
const Activate = () => {
    const { id } = useParams();
    const [confirming, setConfirming] = useState(true)

    useEffect(()=>{
        verify();
    },[])
    const verify = () => {
        axios.get(`/api/user/register/verify/${id}`).then((result) => {
            console.log(result);
            // console.log(result.data.message);
            toast.success(result.data.message,{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setConfirming(false)
        }).catch((e) => {
            console.log(e);
        })
    }
    return (
        <div className="activatePage">
          <Notification />
            { confirming ?
                <Loader message="Loading please wait..."/>
                :(
                    <CongratsCard />
                )
            }
          
        </div>
    )
}

export default Activate
