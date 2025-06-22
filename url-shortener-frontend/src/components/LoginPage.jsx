// imports libraries(modules)
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';


// creates LoginPage component
const LoginPage = () => {
    // useNavigate - function that allows navigation to certain routes
    const navigate = useNavigate();
    // useState - function that allows state management
    const [loader, setLoader] = useState(false);
    const { setToken } = useStoreContext();


    // component props
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    // creates function that handles login
    const loginHandler = async (data) => {
        // sets state of loading page to true
        setLoader(true);
        try {
            // makes post request to backend to login user
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
            console.log(response.token);
            // sets token
            setToken(response.token);
            // stores token in local storage
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            toast.success("Login Successful!");
            reset();
            // after logging navigates user to dashboard page
            navigate("/dashboard");
            // catches error and displays error message
        } catch (error) {
            console.log(error);
            toast.error("Login Failed!")
            // in any case sets state of loading page to false after request
        } finally {
            setLoader(false);
        }
    };

  return (
    <div
        className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
            {/* Login form  */}
        <form onSubmit={handleSubmit(loginHandler)}
            className="sm:w-[450px] w-[360px]  shadow-slate-400 shadow-xl py-8 sm:px-8 px-4 rounded-md">
            <h1 className="text-center font-serif text-blue-500 font-bold lg:text-3xl text-2xl">
                Login Here
            </h1>

            {/* Username and password input block */}
            <div className="flex flex-col gap-3">
                <TextField
                    label="Username"
                    required
                    id="username"
                    type="text"
                    message="*Username is required"
                    placeholder="Type your username"
                    register={register}
                    errors={errors}
                />

                <TextField
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="*Password is required"
                    placeholder="Type your password"
                    register={register}
                    min={6}
                    errors={errors}
                />
            </div>

            {/* Login button block*/}
            <button
                disabled={loader}
                type='submit'
                className='bg-customRed font-semibold text-white  background-color bg-gradient-to-b from-blue-500 to-purple-600 w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                {loader ? "Loading..." : "Login"}
            </button>

            {/* Signup link block */}
            <p className='text-center text-sm text-slate-700 mt-6'>
                Don't have an account? 
                <Link
                    className='font-semibold underline hover:text-black'
                    to="/register">
                        <span className='text-btnColor'> SignUp</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default LoginPage