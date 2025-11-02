import React from "react";
import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa"; // fallback icon if PNG is missing

const CarTypeGrid = ({ carTypes }) => (
  <div className="mb-20 md:mb-24">
    <h3
      className="text-2xl font-semibold mb-8"
      style={{ color: "var(--text-color)" }}
    >
      Browse by Body Type
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
      {carTypes.map((type, index) => (
        <Link
          to={`/cars/type/${type.name.toLowerCase()}`}
          key={index}
          className="flex flex-col items-center justify-center p-4 md:p-5 rounded-lg transition-all duration-200"
          style={{
            backgroundColor: "var(--surface-color)",
            color: "var(--text-color)",
            border: "1px solid var(--border-color)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--highlight-color)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--surface-color)")
          }
        >
          <div className="w-12 h-12 mb-3 flex items-center justify-center">
            {type.iconSrc ? (
              <img
                src={type.iconSrc}
                alt={type.name}
                className="w-12 h-12 object-contain"
                style={{ filter: "invert(var(--invert-icons, 0))" }} // 👈 respect theme
                onError={(e) => {
                  e.currentTarget.style.display = "none"; // hide broken image
                  e.currentTarget.parentNode.innerHTML =
                    `<svg class="w-12 h-12" style="color: var(--text-color);" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h18v-2H3v2zm0 6h18v-2H3v2zm0-12h18V5H3v2z"/></svg>`;
                }}
              />
            ) : (
              <FaCar className="w-12 h-12" style={{ color: "var(--text-color)" }} />
            )}
          </div>
          <span
            className="font-medium text-base md:text-lg text-center"
            style={{ color: "var(--text-color)" }}
          >
            {type.name}
          </span>
        </Link>
      ))}
    </div>
  </div>
);

export default CarTypeGrid;