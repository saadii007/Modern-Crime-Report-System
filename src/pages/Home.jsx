import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/home.jpg')" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Marquee Text */}
      <div className="bg-blue-800 bg-opacity-70 text-white py-2 flex items-center justify-center">
        <div className="animate-marquee whitespace-nowrap text-center text-lg px-4">
          🚨 Welcome to the Crime Reporting Management System (CRMS) 🚨 &nbsp;&nbsp;
          📢 Report Crimes, Missing People, and Stay Updated. 📢
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-white px-4 py-10 space-y-10">
        {/* Intro Section */}
        <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-lg max-w-20xl text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to CRMS</h1>
          <p className="text-lg mb-6">
            The ultimate platform for reporting crimes, locating missing persons, and accessing
            crime analytics — all in one secure system.
          </p>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transform transition duration-300"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Transparent Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
          <div className="bg-gray-500 bg-opacity-60 p-8 rounded-xl shadow-lg max-w-2xl text-center hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-3">🕵️ Report a Crime</h3>
            <p className="text-sm mb-4">
              Submit detailed crime reports quickly and securely. Help authorities maintain law and
              order effectively.
            </p>
            <Link
              to="/dashboard/reportcrime"
              className="text-blue-300 hover:text-blue-400 font-semibold"
            >
              Report Now →
            </Link>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30 text-center hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-3">🚨 Missing People</h3>
            <p className="text-sm mb-4">
              Share details of missing individuals and contribute to a safer, connected community.
            </p>
            <Link
              to="/dashboard/missingpeople"
              className="text-blue-300 hover:text-blue-400 font-semibold"
            >
              Report Missing →
            </Link>
          </div>

          <div className="bg-gray-500 bg-opacity-60 p-8 rounded-xl shadow-lg max-w-2xl text-center hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-3">📊 Analytics & Insights</h3>
            <p className="text-sm mb-4">
              Gain insight into crime trends, hotspots, and missing reports with live analytics.
            </p>
            <Link
              to="/dashboard/analytics"
              className="text-blue-300 hover:text-blue-400 font-semibold"
            >
              View Analytics →
            </Link>
          </div>
        </div>

        {/* Awareness Video Section */}
        <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 text-center">
          <h2 className="text-2xl font-bold mb-4">🎥 Learn About Cyber Crimes</h2>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
<iframe width="850" height="500" src="https://www.youtube.com/embed/3N-y_3X-PD0?si=9vXH66l6IXixvxcj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="text-center text-sm text-gray-200 bg-black/40 py-4 w-full mt-10">
          © {new Date().getFullYear()} CRMS | Designed for safer communities 💙
        </footer>
      </main>
    </div>
  );
};

export default Homepage;
