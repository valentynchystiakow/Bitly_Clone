// imports classes(libraries)
import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useState } from 'react';


// creates RegisterPage component
const RegisterPage = () => {
    // useNavigate - function that allows navigation to certain routes
    const navigate = useNavigate();
    // useState - function that allows state management
    const [loader, setLoader] = useState(false);

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

    // creates function that handles registration
    const registerHandler = async (data) => {
        // changes state of page to loading state
        setLoader(true);
        // sends data to backend using post request to register user
        try {
            const { data: response } = await api.post(
                "/api/auth/public/register",
                data
            );
            // redirects to login page
            reset();
            navigate("/login");
            // displays success message
            toast.success("Registration Successful!")
            // catches error and displays error message
        } catch (error) {
            console.log(error);
            toast.error("Registration Failed!")
        } finally {
            // changes state of loader
            setLoader(false);
        }
    };



  return (
    <div
    className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
        {/* Submit registration form block */}
    <form onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px]  shadow-slate-400 shadow-xl py-8 sm:px-8 px-4 rounded-md">
        <h1 className="text-center font-serif text-blue-500 font-bold lg:text-3xl text-2xl">
            Register Here
        </h1>

       

        {/* Username block */}
        <div className="flex flex-col gap-3">
            <TextField
                label="UserName"
                required
                id="username"
                type="text"
                message="*Username is required"
                placeholder="Type your username"
                register={register}
                errors={errors}
            />
        {/* Email block */}
            <TextField
                label="Email"
                required
                id="email"
                type="email"
                message="*Email is required"
                placeholder="Type your email"
                register={register}
                errors={errors}
            />
        {/* Password block */}
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
        {/* Register button block */}
        <button
            disabled={loader}
            type='submit'
            className='bg-customRed font-semibold text-white  background-color bg-gradient-to-b from-blue-500 to-purple-600 w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
            {loader ? "Loading..." : "Register"}
        </button>
        {/* Already have an account block/Login button block */}
        <p className='text-center text-sm text-slate-700 mt-6'>
            Already have an account? 
            <Link
                className='font-semibold underline hover:text-black'
                to="/login">
                    <span className='text-btnColor'> Login</span>
            </Link>
        </p>
    </form>
</div>
  )
}

// exports RegisterPage component
export default RegisterPage