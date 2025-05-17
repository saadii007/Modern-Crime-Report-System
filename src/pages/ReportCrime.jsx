// src/pages/ReportCrime.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const ReportCrime = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "crimes"), {
        title,
        description,
        location,
        date,
      });
      alert("Crime report submitted successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Report a Crime</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded" required></textarea>
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 border rounded" required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportCrime;
