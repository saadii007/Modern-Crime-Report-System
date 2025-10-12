import React, { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const MissingPeople = () => {
  const [name, setName] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [dateMissing, setDateMissing] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      setMessage("You must be logged in to report a missing person.");
      return;
    }

    try {
      await addDoc(collection(db, "missing_people"), {
        name,
        last_seen: lastSeen,
        date_missing: dateMissing,
        description,
        reportedBy: user.email, // ✅ new field
        createdAt: serverTimestamp(),
      });

      setMessage("✅ Missing person reported successfully!");
      setName("");
      setLastSeen("");
      setDateMissing("");
      setDescription("");
    } catch (error) {
      setMessage("❌ Failed to report. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Report Missing Person</h2>
      {message && <p className="text-center text-blue-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Last Seen Location"
          value={lastSeen}
          onChange={(e) => setLastSeen(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={dateMissing}
          onChange={(e) => setDateMissing(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description or Additional Info"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default MissingPeople;
