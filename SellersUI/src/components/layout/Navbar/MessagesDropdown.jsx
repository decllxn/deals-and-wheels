import { useState, useRef, useEffect } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  {
    id: 1,
    sender: "Alice Johnson",
    content: "Hey! Can you review the report?",
    time: "2m ago",
  },
  {
    id: 2,
    sender: "Mark Evans",
    content: "Meeting moved to 3pm.",
    time: "15m ago",
  },
  {
    id: 3,
    sender: "Support",
    content: "Your ticket has been resolved.",
    time: "1h ago",
  },
];

export default function MessagesDropdown({ theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Messages Icon */}
      <motion.button
        onClick={toggleDropdown}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors duration-300 ${
          theme === "light" ? "bg-gray-300" : "bg-[#2a2a2a]"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute right-0 mt-2 w-72 max-w-sm rounded-lg overflow-hidden z-20 shadow-lg ${
              theme === "light" ? "bg-white" : "bg-[#1f1f1f]"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              <div className="font-semibold text-[var(--text)] mb-2">
                Messages
              </div>
              <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className="py-2 space-y-1">
                    <div className="text-sm font-medium text-[var(--text)]">
                      {msg.sender}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {msg.content}
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500">
                      {msg.time}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 flex items-center justify-center space-x-2 py-2 text-sm text-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-md transition-colors">
                <Mail className="w-4 h-4" />
                <span>Go to Inbox</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}