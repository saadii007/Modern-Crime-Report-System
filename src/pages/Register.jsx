// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/form-bg.jpg')" }}
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-sm w-full border border-white/30">
        <h2 className="text-2xl font-bold text-center mb-6 text-white drop-shadow-md">
          Register
        </h2>
        {error && (
          <p className="text-red-400 text-center mb-3 font-medium">{error}</p>
        )}
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="email"
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-600/80 text-white py-3 rounded-lg hover:bg-blue-700/90 hover:scale-[1.02] transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-200">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-300 hover:text-blue-400 hover:underline transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
