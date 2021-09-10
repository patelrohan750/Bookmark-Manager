import axios from 'axios'
const api=axios.create({
    baseURL:'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
})


// Interceptors
api.interceptors.response.use(
    (config)=>{
    console.log('config: ',config);
    return config
    },
    async(error)=>{
        console.log('error: ',error);
        const originalRequest = error.config;
        console.log('originalRequest: ',originalRequest);

        if( error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ){
            originalRequest.isRetry = true;
            try{
                await axios.get('http://localhost:8000/api/refresh',
                {
                    withCredentials: true,
                }
                )
                return api.request(originalRequest);
            }
            catch(err){
                console.log(err.message);
            }
        }
        throw error;
    }
)

export default api