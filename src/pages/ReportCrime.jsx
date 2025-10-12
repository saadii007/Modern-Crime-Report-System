import React, { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const ReportCrime = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      setMessage("You must be logged in to report a crime.");
      return;
    }

    try {
      await addDoc(collection(db, "crimes"), {
        title,
        description,
        location,
        date,
        reportedBy: user.email, // ✅ new field
        createdAt: serverTimestamp(),
      });

      setMessage("✅ Crime reported successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
    } catch (error) {
      setMessage("❌ Failed to report crime. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Report a Crime</h2>
      {message && <p className="text-center text-blue-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Crime Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportCrime;
