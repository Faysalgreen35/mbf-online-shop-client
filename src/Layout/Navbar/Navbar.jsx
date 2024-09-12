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
          className={({ isActive }) =>
            `block  py-2 md:py-3 px-4 rounded md:p-0 md:px-4  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
              isActive
                ? 'bg-red-800  text-white   dark:bg-blue-500'
                : 'text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
            }`
          }
          aria-current="page"
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
          `block  py-2 md:py-3 px-4 rounded md:p-0 md:px-4  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
              isActive
                ? 'bg-red-800  text-white   dark:bg-blue-500'
                
                : 'text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
            }`
          }
          to="/orders"
        >
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
          `block  py-2 md:py-3 px-4 rounded md:p-0 md:px-4  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
              isActive
                ? 'bg-red-800  text-white   dark:bg-blue-500'
                
                : 'text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
            }`
          }
          to="/carrier"
        >
          Carrer
        </NavLink>
      </li>
      {!user && (
        <li>
          <NavLink
            className={({ isActive }) =>
             `block  py-2 md:py-3 px-4 rounded md:p-0 md:px-4  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
              isActive
                ? 'bg-red-800  text-white   dark:bg-blue-500'
               
                  : 'text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
              }`
            }
            to="/login"
          >
            Login
          </NavLink>
        </li>
      )}
      {!user && (
        <li>
          <NavLink
            className={({ isActive }) =>
             `block  py-2 md:py-3 px-4 rounded md:p-0 md:px-4  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
              isActive
                ? 'bg-red-800  text-white   dark:bg-blue-500'
               
                  : 'text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
              }`
            }
            to="/register"
          >
             Register
          </NavLink>
        </li>
      )}
    </>
  );
  
  return (
    // <div>
    <div className="navbar fixed z-10 bg-opacity-10 bg-black text-white max-w-screen-xl">
      {/* <nav className="bg-white border-gray-200 dark:bg-gray-900 z-50 relative"> */}
      <nav className='relative z-50'>
        <div className="max-w-screen-8xl flex flex-wrap items-center justify-end mx-auto p-4 ml-12">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <img src={logo} className="w-8 h-8" alt="" />
            </span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white  ">
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
          <div className="hidden md:flex space-x-8 rtl:space-x-reverse   items-center  ">
            <ul className="flex  ml-0 md:ml-60  space-x-8 rtl:space-x-reverse justify-end md:text-sm font-bold  ">
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
              className={`absolute top-12 right-0  z-50 ${isMenuOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <ul className="py-4  ml-20  " aria-labelledby="navbar-user">
               
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


  