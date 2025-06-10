import React from "react";
import { FaCar, FaTag, FaTools, FaShippingFast, FaCheckCircle, FaStar, FaExclamationTriangle } from "react-icons/fa";

const ListingCard = ({ part }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative">
        <img
          src="/shocks.jpeg"
          alt={part.name}
          className="w-full h-48 object-contain"
        />
        {part.onSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-sm text-xs font-semibold">
            Sale!
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{part.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{part.description}</p>

        <div className="flex items-center mb-2">
          <FaCar className="text-gray-500 mr-2" />
          <span className="text-sm text-gray-700">{part.make} - {part.model} ({part.year})</span>
        </div>

        <div className="flex items-center mb-2">
          <FaTag className="text-gray-500 mr-2" />
          <span className="text-lg font-semibold text-blue-600">${part.price}</span>
        </div>

        <div className="flex items-center mb-2">
            <FaStar className="text-yellow-400 mr-2" />
            <span className="text-sm text-gray-700">{part.rating} ({part.reviewCount} Reviews)</span>
        </div>

        <div className="flex items-center mb-2">
            <FaTools className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{part.condition}</span>
        </div>

        <div className="flex items-center mb-2">
            {part.inStock ? <><FaCheckCircle className="text-green-500 mr-2" /><span className="text-sm text-green-700">In Stock</span></> : <><FaExclamationTriangle className="text-red-500 mr-2" /><span className="text-sm text-red-700">Out of Stock</span></>}
        </div>

        {part.shippingAvailable && (
          <div className="flex items-center mb-2">
            <FaShippingFast className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Shipping Available</span>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ListingCard;