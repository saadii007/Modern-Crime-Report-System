import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [crimes, setCrimes] = useState([]);
  const [missingPeople, setMissingPeople] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const crimesSnapshot = await getDocs(collection(db, "crimes"));
      setCrimes(crimesSnapshot.docs.map((doc) => doc.data()));

      const missingSnapshot = await getDocs(collection(db, "missing_people"));
      setMissingPeople(missingSnapshot.docs.map((doc) => doc.data()));
    };

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    fetchData();
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  const handleRowClick = (record) => {
    setSelectedRecord(record);
  };

  const closePopup = () => {
    setSelectedRecord(null);
  };

  const filteredData = [...crimes, ...missingPeople].filter((item) => {
    return selectedLocation ? (item.location || item.last_seen).includes(selectedLocation) : true;
  });

  const isOverview = location.pathname === "/dashboard";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-700 text-white p-4 min-h-screen flex flex-col">
        <h2 className="text-2xl mb-4">Dashboard</h2>
        <p className="text-sm mb-4">Welcome, {user ? user.email : "Guest"}</p>
        <nav className="flex flex-col gap-2 mb-4">
          <NavLink to="/dashboard" className="hover:text-yellow-300">Overview</NavLink>
          <NavLink to="/dashboard/reportcrime" className="hover:text-yellow-300">Report Crime</NavLink>
          <NavLink to="/dashboard/missingpeople" className="hover:text-yellow-300">Missing People</NavLink>
          <NavLink to="/dashboard/analytics" className="hover:text-yellow-300">Analytics</NavLink>
        </nav>
        <button onClick={handleLogout} className="mt-2 p-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100 overflow-auto">
        {isOverview ? (
          <>
            <h2 className="text-3xl font-bold mb-4">Dashboard Overview</h2>
            {/* Recent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded shadow flex flex-col">
                <h3 className="font-bold mb-2">Recent Crimes</h3>
                {crimes.slice(0, 2).map((crime, index) => (
                  <div key={index} className="text-gray-700 mb-2 p-2 rounded bg-gray-50">
                    <strong>{crime.title}</strong> - {crime.location}, {crime.date}
                  </div>
                ))}
              </div>
              <div className="bg-white p-4 rounded shadow flex flex-col">
                <h3 className="font-bold mb-2">Recent Missing People</h3>
                {missingPeople.slice(0, 2).map((person, index) => (
                  <div key={index} className="text-gray-700 mb-2 p-2 rounded bg-gray-50">
                    <strong>{person.name}</strong> - Last Seen: {person.last_seen}, {person.date_missing}
                  </div>
                ))}
              </div>
            </div>

            {/* Search Feature */}
            <select
              className="p-2 border mb-4"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Colaba">Colaba</option>
              <option value="Thane">Thane</option>
              <option value="Dadar">Dadar</option>
              <option value="Bandra">Bandra</option>
              <option value="Andheri">Andheri</option>
              <option value="Borivali">Borivali</option>
              <option value="Juhu">Juhu</option>
              <option value="Goregaon">Goregaon</option>
            </select>

            {/* Table Section */}
            <table className="min-w-full bg-white mt-4 rounded shadow">
              <thead>
                <tr className="bg-blue-200 text-left">
                  <th className="py-2 px-4">Title/Name</th>
                  <th className="py-2 px-4">Location/Last Seen</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(item)}
                  >
                    <td className="py-2 px-4">{item.title || item.name}</td>
                    <td className="py-2 px-4">{item.location || item.last_seen}</td>
                    <td className="py-2 px-4">{item.date || item.date_missing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Outlet />
        )}

        {/* Popup Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg relative max-w-md w-full">
              <h3 className="font-bold text-lg mb-2">Details</h3>
              <p><strong>Title/Name:</strong> {selectedRecord.title || selectedRecord.name}</p>
              <p><strong>Location/Last Seen:</strong> {selectedRecord.location || selectedRecord.last_seen}</p>
              <p><strong>Description:</strong> {selectedRecord.description}</p>
              <button onClick={closePopup} className="absolute top-2 right-2 text-gray-500">
                ✖
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
