// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-center text-white px-4"
      style={{ backgroundImage: "url('/home.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-md max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to Crime Reporting System</h1>
        <p className="text-lg mb-4">
          Your trusted platform for reporting crimes and finding missing people. 
          Join us in making our community a safer place.
        </p>
        <p className="text-md mb-4">
          This system ensures your reports are securely submitted and handled by the relevant authorities.
          Your safety is our priority.
        </p>
        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
