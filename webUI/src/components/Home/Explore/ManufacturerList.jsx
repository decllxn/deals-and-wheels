import React from "react";
import { Link } from "react-router-dom";

const ManufacturerList = ({ manufacturers }) => (
  <div>
    <h3 className="text-2xl font-semibold mb-6" style={{ color: "var(--text-color)" }}>
      Explore by Manufacturer
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
      {manufacturers
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((manufacturer, idx) => (
          <Link
            key={idx}
            to={`/cars/manufacturer/${manufacturer.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{ color: "var(--text-color)" }}
          >
            <div className="w-[56px] h-[36px] flex items-center justify-center">
              <img
                src={manufacturer.logoSrc}
                alt={manufacturer.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <span className="text-sm md:text-base font-medium text-center">
              {manufacturer.name}
            </span>
          </Link>
        ))}
    </div>
  </div>
);

export default ManufacturerList;