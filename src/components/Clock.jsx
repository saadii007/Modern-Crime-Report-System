// src/components/Clock.jsx
import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <span className="text-sm text-gray-300">
      {time.toLocaleDateString()} | {time.toLocaleTimeString()}
    </span>
  );
};

export default Clock;
