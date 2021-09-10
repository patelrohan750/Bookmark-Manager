import {useState,useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setLoginUser } from '../redux/Actions/user-action'
export const useLoadingWithRefresh=()=>{
    const [loading,setLoading]=useState(true)
    const dispatch=useDispatch()
    useEffect(() => {
        //IIFE function

        (async()=>{
            try{
                const {data}=await axios.get('http://localhost:8000/api/refresh',{
                    withCredentials:true
                });
                dispatch(setLoginUser(data))
                console.log('refresh userData: ',data);
                setLoading(false)
            }catch(err){
                setLoading(false)
                console.log(err);
            }
           
        })();
       
    }, [])


    return {loading}
}