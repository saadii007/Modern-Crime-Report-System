// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center mt-14"
      style={{ backgroundImage: "url('/home.jpg')" }}
    >
      {/* Marquee Text */}
      <div className="bg-blue-800 text-white py-2 w-full text-center fixed top-14 md:top-16 z-40">
        <p className="animate-marquee whitespace-nowrap">
          🚨 Welcome to the Crime Reporting Management System (CRMS) 🚨 📢 Report Crimes, Missing People, and Stay Updated. 📢
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-white mt-24 px-4 max-w-lg text-center">
        <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Welcome to CRMS</h1>
          <p className="text-lg mb-4">
            The ultimate platform for reporting crimes, locating missing persons, and accessing crime analytics.
          </p>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
