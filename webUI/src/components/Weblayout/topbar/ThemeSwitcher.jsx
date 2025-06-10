import React, { useEffect, useState } from "react";
import { FaMoon, FaSun, FaDesktop, FaCircleHalfStroke } from "react-icons/fa6";

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("System");

  const themes = [
    { name: "Light", icon: <FaSun className="mr-2" /> },
    { name: "Dark", icon: <FaMoon className="mr-2" /> },
    { name: "System", icon: <FaDesktop className="mr-2" /> },
    { name: "Neutral", icon: <FaCircleHalfStroke className="mr-2" /> },
  ];

  const applyTheme = (themeName) => {
    const root = document.documentElement;

    switch (themeName) {
      case "Light":
        localStorage.theme = "light";
        root.setAttribute("data-theme", "light");
        break;
      case "Dark":
        localStorage.theme = "dark";
        root.setAttribute("data-theme", "dark");
        break;
      case "Neutral":
        localStorage.theme = "neutral";
        root.setAttribute("data-theme", "neutral");
        break;
      case "System":
        localStorage.removeItem("theme");
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        root.setAttribute("data-theme", systemTheme);
        break;
      default:
        break;
    }
  };

  const handleThemeSelect = (themeName) => {
    setSelectedTheme(themeName);
    setIsOpen(false);
    applyTheme(themeName);
  };

  useEffect(() => {
    const storedTheme = localStorage.theme;
    if (storedTheme === "dark" || storedTheme === "light" || storedTheme === "neutral") {
      setSelectedTheme(storedTheme.charAt(0).toUpperCase() + storedTheme.slice(1));
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      setSelectedTheme("System");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
    }
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 transition-colors duration-200"
        style={{
          color: "var(--text-color)",
        }}
      >
        {themes.find((theme) => theme.name === selectedTheme)?.icon}
        <span className="hidden sm:inline">{selectedTheme}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-md shadow-lg z-50 border"
          style={{
            backgroundColor: "var(--surface-color)",
            borderColor: "var(--border-color)",
          }}
        >
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeSelect(theme.name)}
              className="flex items-center w-full px-4 py-2 text-sm transition-colors duration-200"
              style={{
                backgroundColor:
                  selectedTheme === theme.name ? "var(--highlight-color)" : "transparent",
                color: "var(--text-color)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-color)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  selectedTheme === theme.name ? "var(--accent-color)" : "var(--text-color)")
              }
            >
              {theme.icon}
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;