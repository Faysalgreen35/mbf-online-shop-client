import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2"; 
import logo from '../../../src/assets/logo.jpeg';
import SocialLogin from "../SocialLogin/SocialLogin";
 


const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await signIn(data.email, data.password);
            const user = result.user;
            console.log(user);

            Swal.fire({
                title: "User login successful",
                showClass: {
                    popup: "animate__animated animate__fadeInUp animate__faster"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutDown animate__faster"
                }
            });

            navigate("/", { replace: true });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title> MBF Shop | Login</title>
            </Helmet>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg   dark:bg-gray-800 lg:max-w-4xl shadow-2xl lg:pb-12">
                <div className="hidden  lg:bg-cover lg:block lg:w-1/2" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/geometric-gradient-technology-background_23-2149110132.jpg')" }}>
                <p className="mt-3 text-sm md:text-2xl  text-center text-gray-100 dark:text-gray-200 font-bold font-mono">
                    <span className="text-center mx-auto font-bold font-mono">
                        <img className="text-center  mx-auto mt-3 md:mt-12 mb-3" src={logo} alt="" />
                    </span>
                      <span className="mt-12">
                      Welcome to MBF Shop
                      </span>
                    </p>

                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <img className="lg:w-24 lg:h-24 sm:w-8 sm:h-8 rounded-full" src={logo} alt="" />
                    </div>

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                        Welcome  to Login Page!
                    </p>

                   {/* social login  */}
                   <SocialLogin></SocialLogin>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                        <a onClick={() => { }} className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login with email</a>
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="email">Email Address</label>
                            <input id="email" {...register("email", { required: true })} name="email" placeholder="email" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
                            {errors.email && <span className="text-red-400">Email is required</span>}
                        </div>

                        <div className="form-control mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="password">Password</label>
                                <a onClick={() => { }} className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
                            </div>
                            <input id="password" {...register("password", { required: true })} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
                            {errors.password && <span className="text-red-400">Password is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value='Login' />
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        <Link to='/register' className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or Register</Link>
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;



// import { useState, useContext } from "react";
// // import { AuthContext } from './context/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from "../../Provider/AuthProvider";

// const Login = () => {
//     const [emailOrPhone, setEmailOrPhone] = useState("");
//     const [pin, setPin] = useState("");
//     const [error, setError] = useState(null);

//     const { signIn } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await signIn(emailOrPhone, pin);
//             navigate('/dashboard'); // Redirect to dashboard
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="relative">
//             <section className="bg-gray-50 dark:bg-gray-900 mt-12">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                     <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                         <img className="w-36 h-16 mr-2" src="https://rb.gy/vvpqyt" alt="logo" />
//                     </a>
//                     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                 Log in to your account
//                             </h1>
//                             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//                                 <div>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email/Phone Number</label>
//                                     <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
//                                 </div>
//                                 <div>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIN</label>
//                                     <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
//                                 </div>
//                                 <button type="submit" className="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
//                                 {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                     New user? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create an account</a>
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Login;



 