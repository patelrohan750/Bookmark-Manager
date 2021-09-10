import React,{useState} from 'react'
import './Register.css'
import StepEmail from '../Steps/StepEmail/StepEmail'
import StepProfileAvtar from '../Steps/StepProfileAvtar/StepProfileAvtar'
import CustomNavbar from '../../components/shared/Navbar/CustomNavbar'


const steps={
    1:StepEmail,
    2:StepProfileAvtar
}
const Register = () => {
    const [step,setStep]=useState(1)
    const Step=steps[step];

    const onNext=()=>{
        setStep(step+1)
    }
   
    return (
        <React.Fragment>
            <CustomNavbar/>
            <Step onNext={onNext}/>
        
        </React.Fragment>
    )
}

export default Register
