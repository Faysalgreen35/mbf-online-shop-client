 
import { NavLink } from 'react-router-dom';
import logo from'../../assets/logo.jpeg'

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={logo}
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MBF Shop
          </span>
        </a>
        <div className="flex md:order-2">
          {/* Other elements like search and buttons */}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                exact
                className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                activeClassName="text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                activeClassName="text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                activeClassName="text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                activeClassName="text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
