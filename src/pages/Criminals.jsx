// src/pages/Criminals.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Criminals = () => {
  const [criminals, setCriminals] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCriminals = async () => {
      const criminalsSnapshot = await getDocs(collection(db, "criminals"));
      setCriminals(criminalsSnapshot.docs.map((doc) => doc.data()));
    };

    fetchCriminals();
  }, []);

  const addCriminal = async () => {
    if (name && age && description) {
      const newCriminal = {
        name,
        age,
        description,
        image: "/pic.png",
      };

      await addDoc(collection(db, "criminals"), newCriminal);
      setCriminals([...criminals, newCriminal]);
      setName("");
      setAge("");
      setDescription("");
    }
  };

  const filteredCriminals = search
    ? criminals.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : criminals;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Criminals</h2>

      <div className="mb-4">
        <input
          type="text"
          className="p-2 border mr-2"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          className="p-2 border"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <textarea
          className="p-2 border col-span-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="p-2 bg-blue-700 text-white rounded" onClick={addCriminal}>
          Add Criminal
        </button>
      </div>

      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Age</th>
            <th className="py-2 px-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredCriminals.map((criminal, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4">
                <img src={criminal.image} alt="Criminal" className="w-12 h-12" />
              </td>
              <td className="py-2 px-4">{criminal.name}</td>
              <td className="py-2 px-4">{criminal.age}</td>
              <td className="py-2 px-4">{criminal.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Criminals;
