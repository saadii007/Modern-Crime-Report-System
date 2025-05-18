import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/home.jpg')" }}>
      {/* Navbar */}
      <Navbar />

      {/* Marquee Text */}
      <div className="bg-blue-800 text-white py-2 overflow-hidden relative w-full flex justify-center">
        <div className="animate-marquee whitespace-nowrap flex gap-10 text-lg px-4">
          <p>🚨 Welcome to the Crime Reporting Management System (CRMS) 🚨  📢 Report Crimes, Missing People, and Stay Updated. 📢</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex items-center justify-center h-[calc(100vh-80px)] text-white px-4">
        <div className="bg-black bg-opacity-80 p-6 rounded-xl shadow-lg max-w-xs sm:max-w-lg text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Welcome to CRMS</h1>
          <p className="text-lg mb-4">
            The ultimate platform for reporting crimes, locating missing persons, and accessing crime analytics.
          </p>
          <Link to="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
            Go to Dashboard
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-blue-800 text-white text-center py-2 mt-4 text-sm">
        © 2025 CRMS. All rights reserved. <br />
        Designed for Modern Crime Reporting.
      </footer>
    </div>
  );
};

export default Homepage;
