import React,{useState} from 'react'
import './Login.css'
import CustomCard from '../../components/shared/CustomCard/CustomCard'
import TextInput from '../../components/shared/TextInput/TextInput'
import CustomButton from '../../components/shared/Custom Button/CustomButton'
import { useForm } from "react-hook-form";
import axios from '../../http/index';
import { toast } from 'react-toastify';
import Notification from '../../components/shared/Notification/Notification'
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoginUser } from '../../redux/Actions/user-action'
import Loader from '../../components/shared/Loader/Loader'
import CustomNavbar from '../../components/shared/Navbar/CustomNavbar'

const Login = () => {
    const history=useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const dispatch=useDispatch()
   const submitHandler=(data,e)=>{
       setLoading(true)
       console.log(data);
       axios.post('/api/user/login',data).then((result)=>{
           console.log(result);
         
           if(result.data.successfull){
                setLoading(false)
                console.log("valid user",result.data.user);
                dispatch(setLoginUser(result.data))
                history.push('/bookmarks')
           }else{
               setLoading(false)
               console.log('invalid details');
            toast.error('⚠️ invalid details', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
           }
       }).catch((e)=>{
           console.log(e);
           setLoading(false)
       })
   }
 
   if(loading) return <Loader message='Please wait....'/>
    return (
        <React.Fragment>
       <CustomNavbar/>
        <Notification />
            <CustomCard title="Welcome back!" icon="hand">
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="from__group">
                    <label className="form__label">Email</label>
                    <TextInput type='email' icon="email" 
                    isinvalid={`${errors.email ? "custom__isInvalid" : ""}`}
                    name="email"  placeholder="Type your email"
                      {...register('email', {
                                required: "Email id is required"

                    })} />
                    <div className="custom__error__message">
                            {errors.email?.message}
                    </div>
                </div>

                <div className="from__group">
                    <label className="form__label">Password</label>
                    <TextInput type='password' icon="lock"
                     isinvalid={`${errors.email ? "custom__isInvalid" : ""}`}
                     name="password"  placeholder="Type your password"
                     {...register('password', {
                                required: "password is required"

                    })}
                    />
                     <div className="custom__error__message">
                            {errors.email?.message}
                    </div>
                </div>
                <div className="actionBtn">
                    <CustomButton text='Login' type="submit" />
                
                    
                </div>
                </form>
            </CustomCard>

        </React.Fragment>
    )
}

export default Login
