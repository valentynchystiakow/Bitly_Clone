// imports libraries(modules)
import { Navigate } from "react-router-dom";

// imports components
import { useStoreContext } from "./contextApi/ContextApi";

// creates and exports PrivateRoute function that manages page access based on token(if user is logged in or not)
export default function PrivateRoute ({children,publicPage}) 
{   
    // uses useStoreContext custom hook to manage token
    const {token} = useStoreContext();

    // if login page is public page redirects to dashboard if not redirects to login
    if (publicPage) {
        return token ? <Navigate to = "/dashboard" /> : children;
    }

    return !token ? <Navigate to = "/login"/> : children;
}