// imports libraries(classes)
import { useQuery } from "react-query"

// imports modules(components)
import api from "../api/api"


// creates useFetchMyShortUrls component to get user short urls from backend
export const useFetchMyShortUrls = (token, onError) => {
    return useQuery("my-shortenurls",
          // makes get request to backend to get my short urls by certain date range
         async () => {
            return await api.get(
                "/api/urls/myurls",
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
    },
          { 
            // sorts data be certain date range
            select: (data) => {
                const sortedData = data.data.sort(
                    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                );
                return sortedData;
            },
            // manages Error
            onError,
            staleTime: 5000
          }
        );
};

// creates useFetchTotalClicks component to get total clicks from backend
export const useFetchTotalClicks = (token, onError) => {
    return useQuery("url-totalclick",
        // makes get request to backend to get total clicks
         async () => {
            return await api.get(
                "/api/urls/totalClicks?startDate=2024-01-01&endDate=2025-12-31",
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
    },
          { 
            // selects Total Clicks by certain date range
            select: (data) => {
                // converts data to array
                const convertToArray = Object.keys(data.data).map((key) => ({
                    clickDate: key,
                    count: data.data[key],
                }));
               
                return convertToArray;
            },
            // manages Error
            onError,
            staleTime: 5000
          }
        );
};