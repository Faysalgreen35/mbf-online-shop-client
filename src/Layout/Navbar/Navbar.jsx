import { useEffect, useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import logo from'../../assets/logo.jpeg' 

// import useAuth from '../../../hooks/useAuth';
import { MdOutlineWbSunny } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Apply dark mode class to the body on component mount
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      // Handle successful logout if needed
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          className={({ isActive }) => `block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive ? 'text-blue-700 dark:text-blue-500' : ''}`}
          aria-current="page"
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => `block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive ? 'text-blue-700 dark:text-blue-500' : ''}`}
          to="/orders"
        >
           Orders
        </NavLink>
      </li>
       
      {!user && (
        <li>
          <NavLink
            className={({ isActive }) => `block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive ? 'text-blue-700 dark:text-blue-500' : ''}`}
            to="/login"
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 z-50 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <img src={logo} className="w-20 h-auto" alt="" />
            </span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
         MBF Shop
            </span>
          </a>
          <div className="flex items-center space-x-3 rtl:space-x-reverse md:order-2 relative z-50">
            <div className="mr-2 ml-2 lg:mr-10" onClick={handleThemeToggle}>
              {darkMode ? <MdOutlineWbSunny className='text-3xl text-white' /> : <FaMoon className='text-black text-3xl' />}
            </div>
            {user && (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 lg:w-12 lg:h-12 rounded-full" src={user.photoURL || "/path/to/default/profile-picture.jpg"} alt="user photo" />
                </button>
                {/* Dropdown menu */}
                <div
                  className={`absolute top-10 right-10 z-50 ${isDropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{user.displayName || 'User Name'}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <NavLink to="dashboard/petadd" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="hidden md:flex space-x-8 rtl:space-x-reverse items-center">
            <ul className="flex space-x-8 rtl:space-x-reverse md:text-xl font-bold uppercase">
              {navOptions}
            </ul>
          </div>
          <div className="relative md:hidden">
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-2xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <IoMenu />
            </button>
            <div
              className={`absolute top-12 right-0 z-50 ${isMenuOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <ul className="py-4" aria-labelledby="navbar-user">
                {navOptions}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;


 
 
// import { NavLink } from 'react-router-dom';
// import logo from'../../assets/logo.jpeg' 

// const Navbar = () => {

  
//   return (
//     <nav className="bg-white border-gray-200 dark:bg-gray-900">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
//           <img
//             src={logo}
//             className="h-8"
//             alt="Flowbite Logo"
//           />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//             MBF Shop
//           </span>
//         </a>
//         <div className="flex md:order-2">
//           {/* Other elements like search and buttons */}
//         </div>
//         <div
//           className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
//           id="navbar-search"
//         >
//           <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <NavLink
//                 to="/"
//                 exact
//                 className="block py-2 px-3 rounded md:bg-transparent md:p-0"
//                 activeClassName="text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/login"
//                 className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
//                 activeClassName="text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
//               >
//                 Login
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/register"
//                 className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
//                 activeClassName="text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
//               >
//                 Register
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/orders"
//                 className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
//                 activeClassName="text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
//               >
//                 Orders
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
