// imports libraries(modules)
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { motion } from "motion/react"

// imports components
import { useStoreContext } from "../contextApi/ContextApi";

// creates Navbar component
const Navbar = () => {
  // uses useNavigate hook to navigate between pages
  const navigate = useNavigate();
  // uses useStoreContext custom hook to manage token
  const { token, setToken } = useStoreContext();
  // uses useLocation hook to get current path
  const path = useLocation().pathname;
  // uses useState hook to manage state of navbar
  const [navbarOpen, setNavbarOpen] = useState(false);


  // creates function that hanles logout
  const onLogOutHandler = () => {
    // sets user's token to null
    setToken(null);
    // removes token from local storage
    localStorage.removeItem("JWT_TOKEN");
    // navigates user to login page
    navigate("/login");
  };

  return (
    <div className="h-16 background-color bg-gradient-to-b from-blue-500 to-purple-600  z-50 flex items-center sticky top-0 ">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        {/* logo block */}
        <Link to="/">
          <motion.h1 className="font-bold text-3xl text-white italic sm:mt-0 mt-2">
            Linklytics
          </motion.h1>
        </Link>
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 text-slate-800 sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit sm:bg-none  bg-custom-gradient sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
            {/* Home block */}
          <li className="hover:text-blue-500 font-[500]  transition-all duration-150">
            <Link
              className={`${
                path === "/" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          {/* About block */}
          <li className="hover:text-blue-500 font-[500]  transition-all duration-150">
            <Link
              className={`${
                path === "/about" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
          {/* if token exists display dashboard block */}
          {token && (

          <li className="hover:text-blue-500 font-[500]  transition-all duration-150">
            <Link className={`${path === "/dashboard" ? "text-white font-semibold" : "text-gray-200"}`}to="/dashboard">
              Dashboard
            </Link>
          </li>
          )}
          {/* If token does not exist display register block */}
          {!token && ( <Link to="/register">
              <li className=" sm:ml-0 -ml-1 bg-rose-700 text-white  cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300   transition-all duration-150">
                SignUp
              </li>
            </Link>)}
          {/* If token exists displays logout button */}
          {token && (
            <button
             onClick={onLogOutHandler}
             className="sm:ml-0 -ml-1 bg-rose-700 text-white  cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300   transition-all duration-150">
              LogOut
            </button>)}
        </ul>
        {/* Button that toggles the navbar */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >   
        {/* Depending on navbarOpen state, either show the cross icon or the menu icon */}
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;