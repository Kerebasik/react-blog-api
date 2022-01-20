import axios from "axios";

const API = "http://test-blog-api.ficuslife.com/api/v1";

const axiosInstance = axios.create({
    baseURL:`${API}`,
    headers:{
        'accept': 'application/json'
    }
})

axiosInstance.interceptors.request.use((config)=> 
{
    if(!!localStorage.getItem('token')){
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
    return config
}, function(error){ 
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(
    response => response, 
    
    function(error){
    console.error(error)
    return Promise.reject(error);
})

export default axiosInstance;