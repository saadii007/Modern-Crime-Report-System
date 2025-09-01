// src/pages/Community.jsx
import React, { useState } from "react";

const Community = () => {
  const [messages, setMessages] = useState([
    {
      username: "Aarav Sharma",
      avatar: "/pic.png",
      message: "Be careful near the park, saw some suspicious activity.",
      timestamp: "2 mins ago",
    },
    {
      username: "Priya Mehta",
      avatar: "/pic.png",
      message: "Lost my wallet near the station, please contact if found.",
      timestamp: "10 mins ago",
    },
    {
      username: "Rohan Verma",
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
    <div
      className="flex flex-col items-center justify-center p-6 min-h-screen 
      bg-gradient-to-r from-blue-900 via-gray-900 to-black"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl w-full max-w-3xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-white drop-shadow-md">
          Community Forum
        </h1>

        {/* Messages */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="flex items-start gap-3 hover:scale-[1.01] transition-transform"
            >
              <img
                src={msg.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border border-white/30"
              />
              <div className="flex flex-col">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl shadow-md text-white border border-white/10">
                  <p className="font-semibold text-yellow-300">
                    {msg.username}
                  </p>
                  <p>{msg.message}</p>
                </div>
                <p className="text-xs text-gray-300 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <form
          className="flex mt-4 bg-white/10 rounded-lg overflow-hidden border border-white/20 backdrop-blur-sm"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            className="flex-grow p-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600/80 text-white px-5 hover:bg-blue-700/90 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Community;
