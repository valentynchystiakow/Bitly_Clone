// imports libraries(modules)
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLink } from 'react-icons/fa'

// imports components
import Graph from './Graph'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'
import ShortenUrlList from './ShortenUrlList'
import Loader from '../Loader'

// import Loader from '../Loader'


// creates Dashboardlayout component
const DashboardLayout = () => {

    // uses useStoreContext function to pass token
    const { token } = useStoreContext();
    // creates navigate function
    const navigate = useNavigate();
    // manages state of shortenPopUp 
    const [shortenPopUp, setShortenPopUp] = useState(false);
    
    // destructures data from useFetchTotalClicks hook
    const {isLoading: loader, data: totalClicks} = useFetchTotalClicks(token, onError)

    // destructures data from useFetchMyShortUrls hook
    const {isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError)

    // creates function that will navigate to Error page is there is an error
    function onError(){
        console.log("Error");
    }
    
    return (
        <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
            {/* depending on loader state displays Loader component or the main content */}
        {loader ? ( 
            <Loader />
        ): ( 
        <div className="lg:w-[90%] w-full mx-auto py-16">
            <div className=" h-96 relative ">
                {totalClicks.length === 0 && (
                     <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                     <h1 className=" text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                       No Data For This Time Period
                     </h1>
                     <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-600 ">
                       Share your short link to view where your engagements are
                       coming from
                     </h3>
                   </div>
                )}
                {/* Graph with totalClicks block */}
                <Graph graphData={totalClicks} />
            </div>
            {/* Shorten urls button block */}
            <div className='py-5 sm:text-end text-center'>
                <button
                    className='background-color cursor-pointer bg-gradient-to-b from-blue-500 to-purple-600 px-4 py-2 rounded-md text-white'
                    onClick={() => setShortenPopUp(true)}>
                    Create a New Short URL
                </button>
            </div>

            {/* Shorten urls list block */}   
            <div>
              {/* depending on isLoading state displays Loader component or ShortenUrlList component */}
              {!isLoading && myShortenUrls.length === 0 ? (
                <div className="flex justify-center pt-16">
                  <div className="flex gap-2 items-center justify-center  py-6 sm:px-8 px-5 rounded-md   shadow-lg  bg-gray-50">
                    <h1 className="text-slate-800 font-montserrat   sm:text-[18px] text-[14px] font-semibold mb-1 ">
                      You haven't created any short link yet
                    </h1>
                    <FaLink className="text-blue-500 sm:text-xl text-sm " />
                  </div>
              </div>
              ) : (
                // calls ShortenUrlList component
                  <ShortenUrlList data={myShortenUrls} />
              )}
            </div>
        </div>
        )}     


        {/* calls ShortenPopUp component */}
        <ShortenPopUp
          refetch={refetch}
          open={shortenPopUp}
          setOpen={setShortenPopUp}
        /> 
    </div>
  )
}


{/* exports DashboardLayout component */}
export default DashboardLayout