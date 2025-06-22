// imports libraries(modules)
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"
import { useStoreContext } from "../contextApi/ContextApi";

//imports components
import Card from "./Card.jsx";

// creates description
let desc =
  "Generate short, memorable links with ease using Linklytics’s intuitive interface. Share URLs effortlessly across platforms. Optimize your sharing strategy with Linklytics. Track clicks and manage your links seamlessly to enhance your online presence. Generate short, memorable links with ease using Linklytics’s intuitive interface. Share URLs effortlessly across platforms.";


// creates Landing page component
const LandingPage = () => {
  // useNavigate - function that allows navigation
  const navigate = useNavigate();
  // useStoreContext - function that allows context management
  const { token } = useStoreContext();
  console.log("TOKEN FROM LANDING PAGE: " + token);

  // creates function that handles dashboard navigation
  const dashBoardNavigateHandler = () => {

  };
    return (
        <div className="min-h-[calc(100vh-64px)]  lg:px-14 sm:px-8 px-4">
         <div className="lg:flex-row flex-col    lg:py-5   pt-16   lg:gap-10 gap-8 flex justify-between items-center">
            {/* Title block */}
           <div className=" flex-1">
           <motion.h1
           initial={{ opacity: 0, y: -80 }}
           whileInView={{
             opacity: 1,
             y: 0,
           }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="font-bold font-roboto text-slate-800 md:text-5xl sm:text-4xl text-3xl   md:leading-[55px] sm:leading-[45px] leading-10 lg:w-full md:w-[70%] w-full"
          >
            Linklytics Simplifies URL Shortening For Efficient Sharing.
          </motion.h1>
          {/* Description block */}
          <p className="text-slate-700 text-sm my-5">
            Linklytics streamlines the process of URL shortening, making sharing
            links effortless and efficient. With its user-friendly interface,
            Linklytics allows you to generate concise, easy-to-share URLs in
            seconds. Simplify your sharing experience with Linklytics today.
          </p>
          {/* buttons block */}
          <div className="flex items-center gap-3">
            {/* Manage links button */}
            <motion.button
               initial={{ opacity: 0, y: 80 }}
               whileInView={{
                 opacity: 1,
                 y: 0,
               }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               // ads on click function to manage links
               onClick={dashBoardNavigateHandler}
              className="background-color bg-gradient-to-b from-blue-500 to-purple-600 text-white w-40 rounded-md  py-2"
            >
              Manage Links
            </motion.button>
            {/* Create short link button */}
            <motion.button
               initial={{ opacity: 0, y: 80 }}
               whileInView={{
                 opacity: 1,
                 y: 0,
               }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
              //  ads on click function to create short link
               onClick={dashBoardNavigateHandler}
               className="border-blue-500 border w-40 text-blue-500 rounded-md  py-2 "
            >
              Create Short Link
            </motion.button>
            </div>
        </div>
        {/* Image block */}
        <div className="   flex-1 flex   justify-center w-full">
          <motion.img
             initial={{ opacity: 0 }}
             whileInView={{
               opacity: 1,
             }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
            className="sm:w-[480px] w-[400px] object-cover rounded-md"
            src="/images/img2.png"
            alt=""
          />
        </div> 
         </div>
         {/* Features block */}
         <div className="sm:pt-12 pt-7">
        <motion.p
           initial={{ opacity: 0, y: 50 }}
           whileInView={{
             opacity: 1,
             y: 0,
           }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
          className="text-slate-800 font-roboto font-bold lg:w-[60%]  md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center"
        >
          Trusted by individuals and teams at the world best companies{" "}
        </motion.p>
        {/* Cards block */}
        <div className="pt-4 pb-7 grid lg:gap-7 gap-4 xl:grid-cols-4  lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
          <Card
            title="Simple URL Shortening"
            desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
          />
          <Card
            title="Powerful Analytics"
            desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies."
          />
          <Card
            title="Enhanced Security"
            desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
          />
          <Card
            title="Fast and Reliable"
            desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users."         />
          </div>
         </div>
        </div>
    );
}

export default LandingPage