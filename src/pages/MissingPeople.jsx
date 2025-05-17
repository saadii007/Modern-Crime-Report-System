// src/pages/MissingPeople.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const MissingPeople = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [dateMissing, setDateMissing] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "missing_people"), {
        name,
        age,
        last_seen: lastSeen,
        date_missing: dateMissing,
        description,
      });
      alert("Missing person report submitted successfully!");
      setName("");
      setAge("");
      setLastSeen("");
      setDateMissing("");
      setDescription("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Report a Missing Person</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded" required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 border rounded" required />
        <input type="text" placeholder="Last Seen Location" value={lastSeen} onChange={(e) => setLastSeen(e.target.value)} className="w-full p-3 border rounded" required />
        <input type="date" value={dateMissing} onChange={(e) => setDateMissing(e.target.value)} className="w-full p-3 border rounded" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded" required></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">Submit Report</button>
      </form>
    </div>
  );
};

export default MissingPeople;
