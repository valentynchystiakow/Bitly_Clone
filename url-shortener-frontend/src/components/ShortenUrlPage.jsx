// imports libraries(classes)
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


// creates ShortenUrlPage component that will display the short url page
const ShortenUrlPage = () => {
    // uses useParams hook to get url
    const { url } = useParams();

    // uses useEffect hook to redirect to short url
    useEffect(() => {
        if (url) {
            window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
        }
    }, [url]);
  return <p>Redirecting...</p>;
}

// exports ShortenUrlPage
export default ShortenUrlPage