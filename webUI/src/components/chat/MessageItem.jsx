// src/components/MessageItem.jsx
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export default function MessageItem({ message, onQuote }) {
  const { user } = useAuth();
  const isSelf = message.sender.email === user?.email;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      layout
      className={`p-2 rounded max-w-[75%] cursor-pointer mb-1 ${
        isSelf ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
      }`}
      onClick={() => onQuote && onQuote(message)}
    >
      {/* Sender */}
      <div className="text-sm font-medium mb-1">{message.sender.email}</div>

      {/* Quoted message */}
      {message.quoted_message && (
        <div className="border-l-2 border-gray-300 pl-2 text-gray-500 text-sm mb-1">
          {message.quoted_message.text.length > 100
            ? message.quoted_message.text.slice(0, 100) + "..."
            : message.quoted_message.text}
        </div>
      )}

      {/* Main text */}
      <div>{message.text}</div>

      {/* Timestamp */}
      <div className="text-xs text-gray-400 mt-1 text-right">
        {new Date(message.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </motion.div>
  );
}