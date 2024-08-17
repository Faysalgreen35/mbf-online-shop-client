// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { router } from "./Routes/Router";
import AuthProvider from "./Provider/AuthProvider";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <HelmetProvider>
      <AuthProvider>
      <div className='max-w-screen-xl mx-auto  dark:bg-gray-800  dark:text-white '>
    <RouterProvider router={router} />
    </div>
    </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);