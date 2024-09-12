import ErrorPage from "../component/ErrorPage/ErrorPage";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import Register from "../component/Register/Register";
import Main from "../Layout/Main/Main";
import {
    createBrowserRouter,
  
  } from "react-router-dom"; 
import cartProductsLoader from './../component/loaders/cartProductsLoader';
import Orders from "../component/Orders/Orders";
import PrivateRoutes from "../Provider/PrivateRoutes";
import CarrierPage from "../component/CarrierPage/CarrierPage";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home></Home>,
          loader: () => fetch('https://spw-app-server.vercel.app/productsCount')
        },
        {
          path: 'orders',
          element:<PrivateRoutes><Orders></Orders></PrivateRoutes> ,
          loader: cartProductsLoader
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        }, 
        {
          path: '/carrier',
          element: <CarrierPage></CarrierPage>
        }, 
     
      ]
    },
  
    
  ]);