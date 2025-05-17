// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const Analytics = () => {
  const [crimes, setCrimes] = useState([]);
  const [missingPeople, setMissingPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const crimesSnapshot = await getDocs(collection(db, "crimes"));
      setCrimes(crimesSnapshot.docs.map((doc) => doc.data()));

      const missingSnapshot = await getDocs(collection(db, "missing_people"));
      setMissingPeople(missingSnapshot.docs.map((doc) => doc.data()));
    };

    fetchData();
  }, []);

  // Pie Chart Data (Crimes by Location)
  const crimeLocations = crimes.map((crime) => crime.location);
  const locationCounts = crimeLocations.reduce((acc, loc) => {
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(locationCounts),
    datasets: [
      {
        data: Object.values(locationCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  // Bar Chart Data (Crimes Over Time)
  const crimeDates = crimes.map((crime) => crime.date);
  const crimeDateCounts = crimeDates.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(crimeDateCounts),
    datasets: [
      {
        label: "Crimes Reported Over Time",
        data: Object.values(crimeDateCounts),
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  // Line Chart Data (Missing People Over Time)
  const missingDates = missingPeople.map((person) => person.date_missing);
  const missingDateCounts = missingDates.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const lineData = {
    labels: Object.keys(missingDateCounts),
    datasets: [
      {
        label: "Missing People Over Time",
        data: Object.values(missingDateCounts),
        borderColor: "#FF6384",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Crimes by Location (Pie Chart)</h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Crimes Reported Over Time (Bar Chart)</h3>
          <Bar data={barData} />
        </div>
        <div className="bg-white p-4 rounded shadow col-span-1 md:col-span-2">
          <h3 className="font-bold mb-2">Missing People Over Time (Line Chart)</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
