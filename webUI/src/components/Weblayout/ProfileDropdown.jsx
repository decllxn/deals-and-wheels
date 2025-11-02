// src/components/ProfileDropdown.jsx
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "My Watch List", path: "/watchlist" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-color)] hover:border-[var(--accent-color)] transition"
        >
          <i className="ri-user-3-line text-[var(--text-color)] text-xl" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 mt-4 w-64 bg-[var(--bg-color)]/95 backdrop-blur-lg rounded-lg shadow-xl border border-[var(--border-color)] overflow-hidden z-50"
          >
            {/* Profile Info */}
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--accent-color)] flex items-center justify-center rounded-full text-white font-semibold">
                {user?.first_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="truncate">
                <p className="text-[var(--text-color)] text-sm font-semibold truncate">
                  {user?.first_name || "User"}
                </p>
                <p className="text-[var(--muted-text)] text-xs truncate">{user?.email}</p>
              </div>
            </div>

            {/* Menu Items */}
            {menuItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="block px-4 py-3 text-sm text-[var(--text-color)] hover:bg-[#292929] hover:text-[var(--accent-color)] transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full text-left px-4 py-3 text-sm text-[var(--accent-color)] hover:bg-[#292929] transition"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;