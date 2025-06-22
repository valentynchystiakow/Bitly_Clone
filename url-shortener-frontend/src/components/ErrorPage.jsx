// imports libaries(modules)
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


// creates ErrorPage component 
const ErrorPage = ({ message }) => {
    // uses useNavigate hook to navigate between pages
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-6">
        <FaExclamationTriangle className='text-6xl text-red-500 mb-4' />
        {/* error message block */}
        <h1 className='text-3xl font-bold mb-2 text-gray-800'>
            Oops! Something went wrong.
        </h1>
        <p className='text-gray-600 mb-6 text-center'>
            {message ? message : "An unexpected error has occured"}
        </p>
        {/* creates button to go back to home */}
        <button onClick={() => {
            navigate("/");
        }}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
        >
            Go back to home
        </button>
    </div>
  )
}

// exports ErrorPage component
export default ErrorPage