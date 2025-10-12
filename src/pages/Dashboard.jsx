// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [crimes, setCrimes] = useState([]);
  const [missingPeople, setMissingPeople] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 On mount - set user, fetch role, start listeners
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await ensureUserDoc(currentUser);
        await fetchUserRole(currentUser.uid);
        startRealtimeListeners();
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 🔹 Create user doc if missing
  const ensureUserDoc = async (currentUser) => {
    const userRef = doc(db, "users", currentUser.uid);
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
      await setDoc(userRef, { email: currentUser.email, role: "user" });
    }
  };

  // 🔹 Fetch role
  const fetchUserRole = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      setRole(userDoc.data().role || "user");
    } else {
      setRole("user");
    }
  };

  // 🔹 Real-time Firestore listeners
  const startRealtimeListeners = () => {
    const crimesRef = collection(db, "crimes");
    const missingRef = collection(db, "missing_people");
    const unsubCrimes = onSnapshot(crimesRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCrimes(data);
    });
    const unsubMissing = onSnapshot(missingRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMissingPeople(data);
    });

    return () => {
      unsubCrimes();
      unsubMissing();
    };
  };

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  // 🔹 Admin updates report status
const handleStatusChange = async (record, newStatus, type) => {
  const ref = doc(db, type, record.id);
  await updateDoc(ref, { status: newStatus });

  await addDoc(collection(db, "notifications"), {
    userEmail: record.reportedBy,
    message: `Your ${type === "crimes" ? "crime report" : "missing person report"} was updated to "${newStatus}".`,
    timestamp: serverTimestamp(),
  });
};


  // 🔹 Listen to user's notifications
useEffect(() => {
  if (!user) return;

  const notificationsRef = collection(db, "notifications");
  const q = query(
    notificationsRef,
    where("userEmail", "==", user.email),
    orderBy("timestamp", "desc")
  );

  let firstLoad = true;
  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setNotifications(data);

    if (!firstLoad && snapshot.docChanges().some((c) => c.type === "added")) {
      const newNotif = snapshot.docChanges().find((c) => c.type === "added");
      if (newNotif?.doc?.data()?.message) {
        alert(newNotif.doc.data().message);
      }
    }
    firstLoad = false;
  });

  return () => unsub();
}, [user]);


  const handleRowClick = (record) => {
    setSelectedRecord(record);
  };

  const closePopup = () => {
    setSelectedRecord(null);
  };

  // 🔹 Filter data
  const filteredData = [...crimes, ...missingPeople].filter((item) =>
    selectedLocation
      ? (item.location || item.last_seen)
          ?.toLowerCase()
          .includes(selectedLocation.toLowerCase())
      : true
  );

  const isOverview = location.pathname === "/dashboard";

  // 🔹 Restrict data
  const visibleData =
    role === "admin"
      ? filteredData
      : filteredData.filter((item) => item.reportedBy === user?.email);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-700 text-white p-4 min-h-screen flex flex-col">
        <h2 className="text-2xl mb-4">Dashboard</h2>
        <p className="text-sm mb-4">
          Welcome, {user ? user.email : "Guest"}{" "}
          <span className="text-yellow-300">({role})</span>
        </p>
        <nav className="flex flex-col gap-2 mb-4">
          <NavLink to="/dashboard" className="hover:text-yellow-300">
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/reportcrime"
            className="hover:text-yellow-300"
          >
            Report Crime
          </NavLink>
          <NavLink
            to="/dashboard/missingpeople"
            className="hover:text-yellow-300"
          >
            Missing People
          </NavLink>
          {role === "admin" && (
            <>
              <NavLink
                to="/dashboard/analytics"
                className="hover:text-yellow-300"
              >
                Analytics
              </NavLink>
              <NavLink
                to="/dashboard/criminals"
                className="hover:text-yellow-300"
              >
                Criminals
              </NavLink>
            </>
          )}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-2 p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100 overflow-auto relative">
        {isOverview && (
          <>
            <h2 className="text-3xl font-bold mb-4">Dashboard Overview</h2>

            {role === "admin" ? (
              <p className="mb-4 text-green-700 font-semibold">
                Manage and verify all reports.
              </p>
            ) : (
              <p className="mb-4 text-blue-700 font-semibold">
                View your submitted reports and track their status.
              </p>
            )}

            {/* 🔔 Notifications */}
            {notifications.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                <h3 className="font-semibold text-yellow-700 mb-2">
                  Notifications
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {notifications.slice(0, 3).map((notif, idx) => (
                    <li key={idx}>• {notif.message}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Filter */}
            <select
              className="p-2 border mb-4 w-full"
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
            </select>

            {/* Table */}
            <table className="min-w-full bg-white mt-4 rounded shadow">
              <thead>
                <tr className="bg-blue-200 text-left">
                  <th className="py-2 px-4">Title/Name</th>
                  <th className="py-2 px-4">Location/Last Seen</th>
                  <th className="py-2 px-4">Status</th>
                  {role === "admin" && <th className="py-2 px-4">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {visibleData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(item)}
                  >
                    <td className="py-2 px-4">{item.title || item.name}</td>
                    <td className="py-2 px-4">
                      {item.location || item.last_seen}
                    </td>
                    <td
                      className={`py-2 px-4 font-medium ${
                        item.status === "verified"
                          ? "text-green-600"
                          : item.status === "closed"
                          ? "text-gray-500"
                          : "text-orange-500"
                      }`}
                    >
                      {item.status || "pending"}
                    </td>
                    {role === "admin" && (
                      <td className="py-2 px-4">
                        <select
                          value={item.status || "pending"}
                          onChange={(e) =>
                            handleStatusChange(
                              item,
                              e.target.value,
                              item.title ? "crimes" : "missing_people"
                            )
                          }
                          className="border rounded p-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="verified">Verified</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {!isOverview && <Outlet />}

        {/* Popup */}
        {selectedRecord && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg relative max-w-md w-full">
              <h3 className="font-bold text-lg mb-2">Details</h3>
              <p>
                <strong>Title/Name:</strong>{" "}
                {selectedRecord.title || selectedRecord.name}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {selectedRecord.location || selectedRecord.last_seen}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedRecord.status || "Pending"}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedRecord.description || "No description available."}
              </p>
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 text-gray-500 text-2xl"
              >
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
