// imports libraries(modules)
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// imports components
import ShortenUrlPage from "./components/ShortenUrlPage"
import LandingPage from './components/LandingPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import RegisterPage from './components/RegisterPage.jsx'
import DashboardLayout from './components/Dashboard/DashboardLayout.jsx';
import PrivateRoute from './PrivateRoute.jsx'
import ErrorPage from './components/ErrorPage.jsx'

// creates AppRouter component that sets routes
const AppRouter = () => { 
    return (
        <>
        <NavBar />
        <Toaster position="bottom-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
          <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />
          {/* Makes Dashboard Page Private - children will be rendered if user is logged in  */}
          <Route path="/dashboard" element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
          <Route path="/error" element={ <ErrorPage />} />
          <Route path="*" element={ <ErrorPage message="We can't seem to find the page you're looking for"/>} />
        </Routes>
        <Footer />
        </>
       
        
    );
}


// exports AppRouter
export default AppRouter

// creates and exports SubDomainRouter component
export const SubDomainRouter = () => {
    return (
            // sets subdomain routes
            <Routes>
                <Route path = "/:url" element = {<ShortenUrlPage/>}></Route>
            </Routes>
    )
}