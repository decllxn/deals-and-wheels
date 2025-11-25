// components/filters/FilterButton.jsx
import React from "react";

const FilterButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium px-3 py-1 rounded-md transition-all border border-transparent
        ${
          active
            ? "bg-[var(--accent-color)] text-white shadow-sm"
            : "text-[var(--muted-text)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]"
        }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;