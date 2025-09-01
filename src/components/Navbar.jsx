// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaMapMarkedAlt,
  FaSignInAlt,
  FaTachometerAlt,
  FaUsers
} from "react-icons/fa";
import Clock from "./Clock";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-950 text-white px-4 py-3 flex items-center justify-between z-50 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">
          <Link to="/" onClick={() => setMenuOpen(false)}>CRMS</Link>
        </div>
        <Clock />
      </div>

      <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <div
        className={`flex-col md:flex md:flex-row md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-blue-950 md:bg-blue-950 transition-transform ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <Link
          className="p-2 block text-center md:inline hover:text-yellow-300 transition-colors duration-300"
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          <FaHome className="inline mr-1" /> Home
        </Link>
        <Link
          className="p-2 block text-center md:inline hover:text-yellow-300 transition-colors duration-300"
          to="/dashboard"
          onClick={() => setMenuOpen(false)}
        >
          <FaTachometerAlt className="inline mr-1" /> Dashboard
        </Link>
        <Link
          className="p-2 block text-center md:inline hover:text-yellow-300 transition-colors duration-300"
          to="/community"
          onClick={() => setMenuOpen(false)}
        >
          <FaUsers className="inline mr-1" /> Community
        </Link>
        <Link
          className="p-2 block text-center md:inline hover:text-yellow-300 transition-colors duration-300"
          to="/map"
          onClick={() => setMenuOpen(false)}
        >
          <FaMapMarkedAlt className="inline mr-1" /> Map
        </Link>
        <Link
          className="p-2 block text-center md:inline hover:text-yellow-300 transition-colors duration-300"
          to="/login"
          onClick={() => setMenuOpen(false)}
        >
          <FaSignInAlt className="inline mr-1" /> Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
