import axios from "axios";

 
const axiosPublic = axios.create({
    baseURL:'https://spw-app-server.vercel.app'
    // baseURL:'https://spw-app-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
    
};

export default useAxiosPublic; 