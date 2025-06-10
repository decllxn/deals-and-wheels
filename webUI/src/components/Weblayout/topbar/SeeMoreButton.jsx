import React from "react";
import { FaEllipsisH } from "react-icons/fa";

const SeeMoreButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 transition-colors duration-200"
      style={{
        color: "var(--text-color)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-color)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-color)")}
    >
      <FaEllipsisH className="text-sm sm:text-base" />
      <span className="hidden sm:inline">See More</span>
    </button>
  );
};

export default SeeMoreButton;