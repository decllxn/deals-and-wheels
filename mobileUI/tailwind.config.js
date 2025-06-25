// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#fdfdfd",
          dark: "#1f1f1f",
        },
        text: {
          light: "#000000",
          dark: "#ffffff",
        },
        accent: {
          light: "#e63946",
          dark: "#3b82f6",
        },
        accentHover: {
          light: "#d62828",
          dark: "#2563eb",
        },
        surface: {
          light: "#ffffff",
          dark: "#2a2a2a",
        },
        border: {
          light: "#dddddd",
          dark: "#444444",
        },
        muted: {
          light: "#555555",
          dark: "#bbbbbb",
        },
        highlight: {
          light: "#ffb4a2",
          dark: "#60a5fa",
        },
      },
      fontFamily: {
        sans: ["Lato", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};