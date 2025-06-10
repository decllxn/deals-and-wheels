// components/ExploreCars/ManufacturerList.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';

const ManufacturerList = ({ manufacturers }) => (
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-8">Explore by Manufacturer</h3>
    <div className="bg-gray-100 rounded-lg p-5 md:p-6">
      <details className="group">
        <summary className="flex items-center justify-between text-gray-800 font-medium cursor-pointer list-none">
          <span className="text-base md:text-lg">All Manufacturers</span>
          <span className="transition duration-300 transform group-open:-rotate-180">
            <FaCaretDown className="text-gray-700 text-lg" />
          </span>
        </summary>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {manufacturers.sort((a, b) => a.name.localeCompare(b.name)).map((manufacturer, index) => (
            <Link
              to={`/cars/manufacturer/${manufacturer.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="flex items-center text-gray-800 text-base md:text-lg hover:text-gray-500 transition-colors duration-200"
            >
              <div className="w-auto h-auto max-w-[56px] max-h-[36px] mr-3 flex items-center justify-center">
                <img src={manufacturer.logoSrc} alt={manufacturer.name} className="max-w-full max-h-full object-contain" />
              </div>
              {manufacturer.name}
            </Link>
          ))}
        </div>
      </details>
    </div>
  </div>
);

export default ManufacturerList;