import React from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

const LeftButtons = () => {
  return (
    <div className="flex items-center gap-x-1 sm:gap-x-4 text-sm sm:text-base font-medium">
      <button
        className="flex items-center gap-x-1 sm:gap-x-2 px-2 sm:px-3 py-1 transition-colors duration-200"
        style={{ color: "var(--text-color)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-color)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-color)")}
      >

        <Link>
            <FaShoppingCart className="text-sm sm:text-base" /> 
        </Link>
        <Link to="buy-a-car">
            <span className="hidden sm:inline">Buying?</span>
        </Link>
      </button>

      <button
        className="flex items-center gap-x-1 sm:gap-x-2 px-2 sm:px-3 py-1 transition-colors duration-200"
        style={{ color: "var(--text-color)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-color)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-color)")}
      >
        <FaStore className="text-sm sm:text-base" />
        <span className="hidden sm:inline">Selling?</span>
      </button>
    </div>
  );
};

export default LeftButtons;