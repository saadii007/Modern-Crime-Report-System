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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white p-4 flex items-center justify-between fixed w-full z-50">
      <div className="text-2xl font-bold">
        <Link to="/" onClick={() => setMenuOpen(false)}>CRMS</Link>
      </div>
      <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <div className={`md:flex md:space-x-4 ${menuOpen ? "flex flex-col bg-blue-800 w-full absolute top-14 left-0" : "hidden md:block"}`}>
        <Link to="/" className="p-2 block text-center" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/dashboard" className="p-2 block text-center" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/community" className="p-2 block text-center" onClick={() => setMenuOpen(false)}>Community</Link>
        <Link to="/map" className="p-2 block text-center" onClick={() => setMenuOpen(false)}>Map</Link>
        <Link to="/login" className="p-2 block text-center" onClick={() => setMenuOpen(false)}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
