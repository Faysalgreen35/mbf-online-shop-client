import axios from "axios";

 
const axiosPublic = axios.create({
    baseURL:'http://localhost:5000'
    // baseURL:'https://spw-app-server-itpzaanbj-codings-projects-c3dc1a09.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
    
};

export default useAxiosPublic; 