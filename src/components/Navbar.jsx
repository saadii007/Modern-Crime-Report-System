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
  FaUsers,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white p-4 flex items-center justify-between relative z-50">
      <div className="text-2xl font-bold">
        <Link to="/" onClick={() => setMenuOpen(false)}>CRMS</Link>
      </div>
      <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <div
        className={`flex-col md:flex md:flex-row md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-blue-950 md:bg-transparent transition-transform ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <Link to="/" className="p-2 block text-center hover:text-yellow-300" onClick={() => setMenuOpen(false)}><FaHome className="inline mr-1" /> Home</Link>
        <Link to="/dashboard" className="p-2 block text-center hover:text-yellow-300" onClick={() => setMenuOpen(false)}><FaTachometerAlt className="inline mr-1" /> Dashboard</Link>
        <Link to="/community" className="p-2 block text-center hover:text-yellow-300" onClick={() => setMenuOpen(false)}><FaUsers className="inline mr-1" /> Community</Link>
        <Link to="/map" className="p-2 block text-center hover:text-yellow-300" onClick={() => setMenuOpen(false)}><FaMapMarkedAlt className="inline mr-1" /> Map</Link>
        <Link to="/login" className="p-2 block text-center hover:text-yellow-300" onClick={() => setMenuOpen(false)}><FaSignInAlt className="inline mr-1" /> Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
