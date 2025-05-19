import axios from "axios"

const AxiosService = axios.create({
    baseURL:"https://blog-app-be-ksyv.onrender.com/api",
    headers:{
        "Content-Type":"application/json"
    }
})


export default AxiosService