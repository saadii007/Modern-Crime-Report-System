// src/pages/Homepage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/home.jpg')" }}>
      {/* Navbar */}
      <Navbar />

      {/* Marquee Text */}
      <div className="bg-blue-800 bg-opacity-70 text-white py-2 flex items-center justify-center">
        <div className="animate-marquee whitespace-nowrap text-center text-lg px-4">
          🚨 Welcome to the Crime Reporting Management System (CRMS) 🚨 &nbsp;&nbsp; 📢 Report Crimes, Missing People, and Stay Updated. 📢
        </div>
      </div>

      {/* Main Content */}
      <main className="flex items-center justify-center h-[calc(100vh-100px)] text-white px-4">
        <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-lg max-w-lg text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to CRMS</h1>
          <p className="text-lg mb-6">
            The ultimate platform for reporting crimes, locating missing persons, and accessing crime analytics.
          </p>
          <div className="flex justify-center">
            <Link to="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
