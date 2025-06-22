// imports libraries(classes)
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
// import { data } from 'autoprefixer';
import { Tooltip } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import toast from 'react-hot-toast';
// imports components
import { useStoreContext } from '../../contextApi/ContextApi';
import api from '../../api/api';
import TextField from '../TextField';


// creates CreateNewShorten component
const CreateNewShorten = ({ setOpen, refetch }) => {
    // uses useStoreContext function to pass token
    const { token } = useStoreContext();
    // manages state of loading
    const [loading, setLoading] = useState(false);

  // component props
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  
  // creates function that handles creating of shorten url on backend
  const createShortUrlHandler = async (data) => {
    // before fetching data sets loading state to true
    setLoading(true);
    try {
        // makes post request to backend to create shorten url
        const { data: res } = await api.post("/api/urls/shorten", data, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          });

          // displays success message after creating shorten url
          const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${res.shortUrl}`}`;
          navigator.clipboard.writeText(shortenUrl).then(() => {
            toast.success("Short URL Copied to Clipboard", {
                position: "bottom-center",
                className: "mb-5",
                duration: 3000,
            });
          });

          // await refetch();
          reset();
          // closes shortenPopUp 
          setOpen(false);
    } catch (error) {
        // in case of error displays error message
        toast.error("Create ShortURL Failed");

        // in any case changes state of loading state to false
    } finally {
        setLoading(false);
    }
  };


  return (
    // creates form that will be used to create shorten url
    <div className=" flex justify-center items-center bg-white rounded-md">
    <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[450px] w-[360px] relative  shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >

        {/* title block */}
        <h1 className="font-montserrat sm:mt-0 mt-3 text-center  font-bold sm:text-2xl text-[22px] text-slate-800 ">
                Create New Shorten Url
        </h1>

        {/* TextField block */}
        <div>
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
          />
        </div>

        {/* create shorten url button block */}
        <button
          className="bg-customRed cursor-pointer  background-color bg-gradient-to-b from-blue-500 to-purple-600 font-semibold text-white w-32  py-2  transition-colors  rounded-md my-3"
          type="text"
        >
          {loading ? "Loading..." : "Create"}
        </button>

        {/* close button block */}
        {!loading && (
          <Tooltip title="Close">
            <button 
              disabled={loading}
            // changes state of shortenPopUp(closes shortenPopUp)
              onClick={() => setOpen(false)}
              className=" absolute cursor-pointer right-2 top-2  "
            >
              <RxCross2 className="text-slate-800   text-3xl" />
            </button>
          </Tooltip>
        )}

      </form>
    </div>
  )
}

// exports CreateNewShorten component
export default CreateNewShorten