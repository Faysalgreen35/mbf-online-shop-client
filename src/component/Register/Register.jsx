 

import { Link, useNavigate } from "react-router-dom"; 
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import logo from '../../../src/assets/logo.jpeg'
// import SocialLogin from "../../components/SocialLogin/SocialLogin"; 
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";

// import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    // const { createuser, updateUserProfile } = useAuth;
    
    const { createuser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);

        try {
            // Image upload
            const formData = new FormData();
            formData.append('image', data.photo[0]);

            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = res.data.data.url;
            console.log('Image uploaded:', imageUrl);

            // Create user
            const result = await createuser(data.email, data.password);
            const loggedUser = result.user;
            console.log(loggedUser);

            // Update user profile with the uploaded image URL
            await updateUserProfile(data.name, imageUrl);
            console.log('User profile updated');

            // Create user in database
            const userInfo = {
                name: data.name,
                email: data.email,
                role: 'user', // Ensure the role is properly defined
                photoURL: imageUrl, // Include the image URL
            };

            const dbRes = await axiosPublic.post('/users', userInfo);
            if (dbRes.data.insertedId) {
                console.log('User added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Helmet>
                <title>  | Sign Up</title>
            </Helmet>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
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
                        Welcome  To  Register page
                    </p>
                  {/* // social  */}
                  <SocialLogin></SocialLogin>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                        <a onClick={() => { }} className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login with email</a>
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="name">Name</label>
                            <input {...register("name", { required: true })} name="name" placeholder="name" id="name" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
                            {errors.name && <span className="text-red-400">Name is required</span>}
                        </div>

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
                            <input id="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 30,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                            })}

                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />

                            {errors.password?.type === "required" && (
                                <p className="text-red-400">Password is required</p>)}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-400"> password must be 6 chararecters</p>
                            )}
                            {errors.password?.type === "maxLength" && (
                                <p className="text-red-400"> password must be less then 30 chararecters</p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-400"> password must have one uppercase, one lowercase, one number, one special character needed</p>
                            )}
                        </div>

                        <div className="form-control mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="photo">Photo</label>
                            <input
                                {...register("photo", { required: true })}
                                name="photo"
                                placeholder="Upload Photo"
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                type="file"
                                accept="image/*"
                            />
                            {errors.photo && <span className="text-red-400">Photo is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value='Sign Up' />
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        <Link to='/login' className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign In</Link>
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;



// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [pin, setPin] = useState("");
//   const [role, setRole] = useState("user");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { createUser } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await createUser(name, pin, mobileNumber, email, role);
//       navigate('/dashboard'); // Redirect to dashboard
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="relative">
//       <section className="bg-gray-50 dark:bg-gray-900 mt-12">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//             <img className="w-36 h-16 mr-2" src="https://rb.gy/vvpqyt" alt="logo" />
//           </a>
//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 Create an account
//               </h1>
//               <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Your Name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
//                   <input
//                     type="text"
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Type your Phone Number"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIN</label>
//                   <input
//                     type="password"
//                     value={pin}
//                     onChange={(e) => setPin(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Type</label>
//                   <select
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     required
//                   >
//                     <option value="user">User Account</option>
//                     <option value="agent">Agent Account</option>
//                   </select>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   Register
//                 </button>
//                 {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                   Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Register;
 