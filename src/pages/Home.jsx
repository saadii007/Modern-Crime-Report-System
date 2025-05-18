// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/home.jpg')" }}
    >
      {/* Marquee Text */}
      <div className="bg-blue-800 text-white py-2 w-full text-center">
        <p className="text-lg animate-marquee whitespace-nowrap">
          🚨 Welcome to the Crime Reporting Management System (CRMS) 🚨 📢 Report Crimes, Missing People, and Stay Updated. 📢
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg max-w-xs sm:max-w-lg text-center text-white mt-6">
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
  );
};

export default Home;
