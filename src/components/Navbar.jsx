// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaMapMarkedAlt,
  FaSignInAlt,
  FaTachometerAlt,  // Dashboard Icon
  FaUsers           // Community Icon
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white p-4 flex items-center justify-between">
      <div className="text-2xl font-bold">
        <Link to="/" onClick={() => setMenuOpen(false)}>CRMS</Link>
      </div>
      <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <div
        className={`flex-col md:flex md:flex-row md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-blue-800 md:bg-transparent transition-transform ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <Link className="p-2 block text-center md:inline" to="/" onClick={() => setMenuOpen(false)}>
          <FaHome className="inline mr-1" /> Home
        </Link>
        <Link className="p-2 block text-center md:inline" to="/dashboard" onClick={() => setMenuOpen(false)}>
          <FaTachometerAlt className="inline mr-1" /> Dashboard
        </Link>
        <Link className="p-2 block text-center md:inline" to="/community" onClick={() => setMenuOpen(false)}>
          <FaUsers className="inline mr-1" /> Community
        </Link>
        <Link className="p-2 block text-center md:inline" to="/map" onClick={() => setMenuOpen(false)}>
          <FaMapMarkedAlt className="inline mr-1" /> Map
        </Link>
        <Link className="p-2 block text-center md:inline" to="/login" onClick={() => setMenuOpen(false)}>
          <FaSignInAlt className="inline mr-1" /> Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
