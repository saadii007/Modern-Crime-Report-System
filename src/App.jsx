// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportCrime from "./pages/ReportCrime";
import MissingPeople from "./pages/MissingPeople";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import Map from "./pages/Map";
import Criminals from "./pages/Criminals";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard/reportcrime" element={<ReportCrime />} />
            <Route path="/dashboard/missingpeople" element={<MissingPeople />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/criminals" element={<Criminals />} />
            <Route path="/community" element={<Community />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
