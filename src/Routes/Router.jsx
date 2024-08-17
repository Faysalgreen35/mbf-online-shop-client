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
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home></Home>,
          loader: () => fetch('http://localhost:5000/productsCount')
        },
        {
          path: 'orders',
          element: <Orders></Orders>,
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
     
      ]
    },
  
    
  ]);