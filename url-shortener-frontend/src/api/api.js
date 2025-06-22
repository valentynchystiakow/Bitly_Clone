// imports libraries(modules)
import axios from "axios";

// exports api
export default axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});