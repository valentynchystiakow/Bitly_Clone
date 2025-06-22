// imports components
import { subDomainList } from "./constant";


// creates and exports getApps component that returns the app route based on the subdomain
export const getApps = () => {
    const subdomain = getSubDomain(window.location.hostname);
    // loads main app configuration
    const mainApp = subDomainList.find((app)=>app.main);
    // if there is no subdomain return the main app Router
    if (subdomain === "" ) {
        return mainApp.app;
    }
    // returns the app based on the subdomain
    const apps = subDomainList.find((app) => app.subdomain === subdomain);
    // returns the main app(Router) if the subdomain is not found or returns the app that matches the subdomain
    return apps ? apps.app : mainApp.app
}


// creates and exports getSubDomain component
export const getSubDomain = (location) => {
    const locationParts = location.split(".");
    // checks if the last part of the url location is localhost
    const isLocalHost = locationParts.slice(-1)[0] === "localhost";
    // depending on isLocalHost the sliceTill will be -1 or -2
    const sliceTill = isLocalHost ? -1 : -2;
    // returns the subdomain based on the sliceTill
    return locationParts.slice(0, sliceTill).join(".");
} 