import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle({ setTheme }) {
  const [theme, setLocalTheme] = useState(() => {
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setLocalTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";

  return (
    <motion.div
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      tabIndex={0}
      initial={false}
      animate={{
        backgroundColor: isDark ? "#1f1f1f" : "#f3f4f6",
      }}
      className="relative w-16 h-8 rounded-full cursor-pointer shadow-md px-1 flex items-center transition-colors duration-500"
    >
      {/* Track Glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark
            ? "0 0 8px rgba(239, 68, 68, 0.4)"
            : "0 0 8px rgba(59, 130, 246, 0.4)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Toggle Knob */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
        style={{
          backgroundColor: isDark ? "#ef4444" : "#3b82f6",
          x: isDark ? 32 : 0,
        }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-white" />
        ) : (
          <Sun className="w-4 h-4 text-white" />
        )}
      </motion.div>
    </motion.div>
  );
}