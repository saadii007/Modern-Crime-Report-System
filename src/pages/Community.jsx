// src/pages/Community.jsx
import React, { useState } from "react";

const Community = () => {
  const [messages, setMessages] = useState([
    {
      username: "John Doe",
      avatar: "/pic.png",
      message: "Be careful near the park, saw some suspicious activity.",
      timestamp: "2 mins ago",
    },
    {
      username: "Jane Smith",
      avatar: "/pic.png",
      message: "Lost my wallet near the station, please contact if found.",
      timestamp: "10 mins ago",
    },
    {
      username: "Mike Johnson",
      avatar: "/pic.png",
      message: "Police have increased patrolling in our area. Stay safe!",
      timestamp: "30 mins ago",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          username: "You",
          avatar: "/pic.png",
          message: newMessage,
          timestamp: "Just now",
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-4 space-y-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Community Forum</h1>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={msg.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <div className="bg-blue-100 p-3 rounded-lg shadow text-gray-800">
                  <p className="font-semibold">{msg.username}</p>
                  <p>{msg.message}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <form className="flex mt-4" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-lg focus:outline-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Community;
