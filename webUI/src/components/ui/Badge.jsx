import React from "react";

const Badge = ({ children, color = "accent", className = "" }) => {
  const colorMap = {
    accent: "bg-[var(--accent-color)] text-white",
    success: "bg-green-600 text-white",
    danger: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
    subtle: "bg-[var(--highlight-color)] text-[var(--text-color)]",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold uppercase rounded-full shadow-sm ${colorMap[color] || colorMap.accent} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;