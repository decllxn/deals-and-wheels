import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: "My Watch List", path: "/watchlist" },
    { name: "Buyers Dashboard", path: "/buyers-dashboard" },
    { name: "Sellers Dashboard", path: "/sellers-dashboard" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 bg-[var(--bg-color)] flex items-center justify-center rounded-full border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all"
        >
          <i className="ri-user-3-line text-[var(--text-color)] text-xl" />
        </motion.div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="absolute left-1/2 translate-x-[-50%] sm:left-auto sm:right-0 sm:translate-x-0 mt-4 w-64 max-w-[90vw] bg-[var(--bg-color)]/90 backdrop-blur-lg rounded-lg shadow-xl border border-[var(--border-color)] overflow-hidden z-50"
        >
          {/* Profile Info */}
          <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#292929] flex items-center justify-center rounded-full">
              <Link to="/profile">
                <i className="ri-user-3-line text-white text-xl" />
              </Link>
            </div>
            <div className="truncate">
              <Link to="/profile" className="text-[var(--text-color)] text-sm font-semibold truncate">
                John Doe
              </Link>
              <p className="text-[var(--muted-text)] text-xs truncate">johndoe@example.com</p>
            </div>
          </div>

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={item.path}
                className="block px-4 py-3 text-[var(--text-color)] text-sm transition-all duration-300 hover:bg-[#292929] hover:text-[var(--accent-color)]"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

          {/* Logout Button */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <button
              className="w-full px-4 py-3 text-left text-[var(--accent-color)] text-sm transition-all duration-300 hover:bg-[#292929] hover:text-[var(--accent-hover)]"
              onClick={() => setIsOpen(false)}
            >
              Logout
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileDropdown;