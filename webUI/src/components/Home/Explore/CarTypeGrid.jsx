// components/ExploreCars/CarTypeGrid.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa'; // fallback icon

const CarTypeGrid = ({ carTypes }) => (
  <div className="mb-20 md:mb-24">
    <h3 className="text-2xl font-semibold text-gray-800 mb-8">Browse by Body Type</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
      {carTypes.map((type, index) => (
        <Link
          to={`/cars/type/${type.name.toLowerCase()}`}
          key={index}
          className="flex items-center justify-center bg-gray-100 p-4 md:p-5 rounded-lg hover:bg-gray-200 transition-all duration-200"
        >
          <div className="text-gray-700 text-xl md:text-2xl mr-3">
            {type.iconClass ? (
              <i className={`${type.iconClass} text-2xl md:text-3xl`} aria-hidden="true"></i>
            ) : (
              <FaCar className="w-7 h-7" />
            )}
          </div>
          <span className="text-gray-800 font-medium text-base md:text-lg">{type.name}</span>
        </Link>
      ))}
    </div>
  </div>
);

export default CarTypeGrid;