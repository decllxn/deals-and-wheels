import { useState, useRef, useEffect } from "react";
import {
  User,
  Settings,
  MessageCircle,
  FileText,
  Lock,
  LogOut,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileDropdown({ theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Detect outside click
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
      {/* Profile Icon */}
      <motion.button
        onClick={toggleDropdown}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors duration-300 ${
          theme === "light" ? "bg-gray-300" : "bg-[#2a2a2a]"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="w-6 h-6 text-white" />
      </motion.button>

      {/* Profile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute right-0 mt-2 w-48 rounded-lg overflow-hidden z-10 ${
              theme === "light" ? "bg-white" : "bg-[#1f1f1f]"
            } shadow-lg`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-2 space-y-1 text-sm">
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--accent-hover)] rounded-lg transition-colors duration-200">
                <User className="w-5 h-5 text-[var(--text)]" />
                <span className="text-[var(--text)]">This Account</span>
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--accent-hover)] rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5 text-[var(--text)]" />
                <span className="text-[var(--text)]">Updates (42)</span>
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--accent-hover)] rounded-lg transition-colors duration-200">
                <MessageCircle className="w-5 h-5 text-[var(--text)]" />
                <span className="text-[var(--text)]">Messages (42)</span>
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--accent-hover)] rounded-lg transition-colors duration-200">
                <FileText className="w-5 h-5 text-[var(--text)]" />
                <span className="text-[var(--text)]">Tasks (42)</span>
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--accent-hover)] rounded-lg transition-colors duration-200">
                <FileText className="w-5 h-5 text-[var(--text)]" />
                <span className="text-[var(--text)]">Comments (42)</span>
              </button>
              <div className="border-t border-gray-200 my-2 dark:border-gray-700" />
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--accent-hover)] rounded-lg transition-colors duration-200">
                <Settings className="w-5 h-5 text-[var(--text)]" />
                <span className="text-[var(--text)]">Settings</span>
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--accent-hover)] rounded-lg transition-colors duration-200">
                <User className="w-5 h-5 text-[var(--text)]" />
                <span className="text-[var(--text)]">Profile</span>
              </button>
              <div className="border-t border-gray-200 my-2 dark:border-gray-700" />
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--accent-hover)] rounded-lg transition-colors duration-200">
                <Lock className="w-5 h-5 text-[var(--text)]" />
                <span className="text-[var(--text)]">Lock Account</span>
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--accent-hover)] rounded-lg transition-colors duration-200">
                <LogOut className="w-5 h-5 text-[var(--text)]" />
                <span className="text-[var(--text)]">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}