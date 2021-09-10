import React, { useState } from 'react'
import './StepEmail.css'
import CustomCard from '../../../components/shared/CustomCard/CustomCard'
import TextInput from '../../../components/shared/TextInput/TextInput'
import './StepEmail.css'
import { useForm } from "react-hook-form";
import axios from '../../../http/index'
import { Button, Spinner } from 'react-bootstrap'
import Notification from '../../../components/shared/Notification/Notification'
import { toast } from 'react-toastify';

const StepEmail = ({ onNext }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [sendingEmail, setSendingEmail] = useState(false)

    const submitHandler = (data, e) => {
        console.log("clicked");
        console.log(data);
        setSendingEmail(true)
        axios.post('/api/user/register/', data).then((res) => {
            console.log(res)
            if (res.data.successfull) {
                console.log(res.data.VerificationLink);
                setSendingEmail(false)
                toast.info('📧 Please verify your email address', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                reset('', {
                    keepValues: false,
                })
                e.target.reset();
            }else{
                setSendingEmail(false)
                console.log('Email id alreay Exists');
                toast.error('⚠️ Email id alreay Exists', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        }).catch((e) => {
            console.log(e);
        })


    }
    console.log(errors);
    return (
        <div>
            <Notification />
            <CustomCard title="Enter Your Details" icon="emoji">
           
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="from__group">
                        <label className="form__label">Name</label>
                        <TextInput type='text'
                            isinvalid={`${errors.name ? "custom__isInvalid" : ""}`}
                            icon="name-emoji" name="name" placeholder="Your Name"
                            {...register('name', {
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Name must be more than 3 characters"
                                },
                                maxLength: {
                                    value: 15,
                                    message: "First Name cannot exceed more than 15 characters"

                                }

                            })}
                        />
                        <div className="custom__error__message">
                            {errors.name?.message}
                        </div>
                    </div>

                    <div className="from__group">
                        <label className="form__label">Email</label>
                        <TextInput type='email'
                            isinvalid={`${errors.email ? "custom__isInvalid" : ""}`} icon="email" name="email" placeholder="example@gmail.com"

                            {...register('email', {
                                required: "Email id is required"

                            })}
                        />
                        <div className="custom__error__message">
                            {errors.email?.message}
                        </div>
                    </div>

                    <div className="from__group ">
                        <label className="form__label">Password</label>
                        <TextInput type='password'
                            isinvalid={`${errors.password ? "custom__isInvalid" : ""}`}
                            icon="lock" name="password" placeholder="password"
                            {...register('password', {
                                required: "password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be more than 6 characters"
                                }

                            })}
                        />
                        <div className="custom__error__message">
                            {errors.password?.message}
                        </div>
                    </div>
                    <div className="actionBtn">
                        <Button type="submit" className="email__custom__btn" disabled={sendingEmail}>
                            {
                                sendingEmail ? (<Spinner
                                    as="span"
                                    animation="border"
                                    size="lg"
                                    role="status"
                                    aria-hidden="true"
                                />) : "Let's Go!"
                            }

                        </Button>
                    </div>
                </form>
            </CustomCard>

        </div>
    )
}

export default StepEmail
