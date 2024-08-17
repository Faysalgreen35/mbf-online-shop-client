import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import Footer from "../Pages/Shared/Footer/Footer";
// import Navbar from "../Pages/Shared/Navbar/Navbar";



const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className=' dark:bg-gray-800  dark:text-white    min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            <Footer></Footer>


        </div>
    );
};

export default Main;