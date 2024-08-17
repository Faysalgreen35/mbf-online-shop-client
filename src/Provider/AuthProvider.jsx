/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { GithubAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import useAxiosPublic from './../hooks/useAxiosPublic';
 

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {

    const [user, setUser]= useState();
    const [loading, setLoading]= useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic =useAxiosPublic();

     // github sign in 
     const githubProvider =  new GithubAuthProvider();

     const signInwithGithub = () =>{
         setLoading(true);
         return  signInWithPopup(auth, githubProvider)
         
     }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const createuser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) =>{
       return updateProfile(auth.currentUser, {
            displayName:name, photoURL: photo
          }) 
    }


    useEffect(()=>{
     const unsubsribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser){
                // get user and store client
                const userInfo = {email:currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false);
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            console.log('current user', currentUser);
            

        })
        return () =>{
            return unsubsribe();
        }
    },[axiosPublic])
    const authInfo = {
        user,
        loading,
        createuser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn,
        signInwithGithub


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// import { createContext, useEffect, useState } from "react";
// import axios from 'axios';
// import LoadingSpinner from './../Layout/LoadingSpinner';

// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

   
//   const createUser = async (name, pin, mobileNumber, email, role) => {
//     setLoading(true);
//     try {
//           const response = await axios.post('https://spw-app-server.vercel.app/register', { name, pin, mobileNumber, email, role });
//       setUser(response.data.user);
//       localStorage.setItem('access-token', response.data.token);
//       setLoading(false);
//       return response.data;
//     } catch (error) {
//       setLoading(false);
//       console.error('Registration error:', error);
//       throw error;
//     }
//   };

//   const signIn = async (emailOrPhone, pin) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('https://spw-app-server.vercel.app/login', { emailOrPhone, pin });
//       setUser(response.data.user);
//       localStorage.setItem('access-token', response.data.token);
//       setLoading(false);
//       return response.data;
//     } catch (error) {
//       setLoading(false);
//       console.error('Login error:', error);
//       throw error; // Rethrow the error to handle it further up the call stack
//     }
//   };
  

//   const logOut = () => {
//     setLoading(true);
//     localStorage.removeItem('access-token');
//     setUser(null);
//     setLoading(false);
//   };
 
//   useEffect(() => {
//     const checkUser = async () => {
//       const token = localStorage.getItem('access-token');
//       if (token) {
//         try {
//           const response = await axios.get('https://spw-app-server.vercel.app/user', {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           setUser(response.data.user);
//         } catch (error) {
//           console.error('Token validation error:', error);
//           if (error.response && error.response.status === 401) {
//             localStorage.removeItem('access-token');
//             setUser(null);
//           }
//         }
//       }
//       setLoading(false);
//     };
//     checkUser();
//   }, []);
  
//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     signIn,
//     logOut,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//        {loading ? <LoadingSpinner/>: children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
 