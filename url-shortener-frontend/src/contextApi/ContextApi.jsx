// imports libraries(modules)
import { createContext, useContext, useState } from "react";

// exports ContextApi
const ContextApi = createContext();


// creates ContextProvider component and exports it
export const ContextProvider = ({ children }) => {
    const getToken = localStorage.getItem("JWT_TOKEN")
        ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
        : null;

    // useState - function that changes state of token
    const [token, setToken] = useState(getToken);

    const sendData = {
        token,
        setToken,
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
};

export const useStoreContext = () => {
    const context = useContext(ContextApi);
    return context;
}