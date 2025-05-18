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
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="reportcrime" element={<ReportCrime />} />
              <Route path="missingpeople" element={<MissingPeople />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="criminals" element={<Criminals />} />
            </Route>
            <Route path="/community" element={<Community />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
