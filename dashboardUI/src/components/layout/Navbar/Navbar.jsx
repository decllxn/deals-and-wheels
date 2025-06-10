// Navbar.js
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";
import MessagesDropdown from "./MessagesDropdown";
import NotificationsDropdown from "./NotificationsDropdown";

export default function Navbar({ onSidebarToggle, onRightbarToggle }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.theme === "dark" ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.theme = theme;
  }, [theme]);

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 shadow-md transition-colors duration-300 bg-[var(--bg)] text-[var(--text)]">
      {/* Left: Sidebar toggle */}
      <motion.button
        onClick={onSidebarToggle}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors duration-300 ${
          theme === "light" ? "bg-gray-300" : "bg-[#2a2a2a]"
        }`}
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      {/* Right: Controls */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <MessagesDropdown theme={theme} />
        <NotificationsDropdown theme={theme} />
        <ProfileDropdown theme={theme} />
        <ThemeToggle setTheme={setTheme} />

        {/* RightBar Toggle Button */}
        <motion.button
          onClick={onRightbarToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors duration-300 ${
            theme === "light" ? "bg-gray-300" : "bg-[#2a2a2a]"
          }`}
          whileHover={{ rotate: -90, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Menu className="w-6 h-6 rotate-180" />
        </motion.button>
      </div>
    </nav>
  );
}