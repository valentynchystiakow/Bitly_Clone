// imports libraries(modules)
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// creates Footer component
const Footer = () => {
  return (
    <footer className="background-color bg-gradient-to-b from-blue-500 to-purple-600 text-white py-8 z-40 relative">
      <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-4">
        <div className="text-center lg:text-left">
        {/* Footer content */}
          <h2 className="text-3xl font-bold mb-2">Linklytics</h2>
          <p>Simplifying URL shortening for efficient sharing</p>
        </div>

        <p className="mt-4 lg:mt-0">
          &copy; 2025 Linklytics. All rights reserved.
        </p>

        {/* Social media icons */}
        <div className="flex space-x-6 mt-4 lg:mt-0">
          <a href="#" className="hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
