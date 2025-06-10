import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaDollarSign, FaLightbulb } from "react-icons/fa";

const PricingTool = () => {
  const [carDetails, setCarDetails] = useState({
    make: "Toyota",
    model: "Camry",
    year: 2018,
    mileage: 50000,
    condition: "Good",
    location: "New York, NY",
  });

  // Simulated pricing data (replace with actual API call)
  const simulatedPrice = 18500;
  const priceRange = { min: 17000, max: 20000 };

  const handleInputChange = (e) => {
    setCarDetails({ ...carDetails, [e.target.name]: e.target.value });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold text-gray-900 mb-6 text-center"
      >
        Get Your Car's Smart Valuation 💰
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Car Details Form */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Enter Car Details
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="make"
              value={carDetails.make}
              onChange={handleInputChange}
              placeholder="Make (e.g., Toyota)"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="model"
              value={carDetails.model}
              onChange={handleInputChange}
              placeholder="Model (e.g., Camry)"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              name="year"
              value={carDetails.year}
              onChange={handleInputChange}
              placeholder="Year (e.g., 2018)"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              name="mileage"
              value={carDetails.mileage}
              onChange={handleInputChange}
              placeholder="Mileage (e.g., 50000)"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              name="condition"
              value={carDetails.condition}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
            <input
              type="text"
              name="location"
              value={carDetails.location}
              onChange={handleInputChange}
              placeholder="Location (e.g., New York, NY)"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </motion.div>

        {/* Price Recommendation & Tips */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            AI-Powered Valuation
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaChartLine className="text-blue-500" />
              <p className="text-lg font-semibold text-gray-900">
                Estimated Price: ${simulatedPrice.toLocaleString()}
              </p>
            </div>
            <p className="text-gray-600">
              Based on real-time market data and similar listings.
            </p>
            <div className="flex items-center space-x-2">
              <FaDollarSign className="text-green-500" />
              <p className="text-lg font-semibold text-gray-900">
                Price Range: ${priceRange.min.toLocaleString()} - $
                {priceRange.max.toLocaleString()}
              </p>
            </div>
            <p className="text-gray-600">
              Adjust your price to maximize profit and attract more buyers.
            </p>
            <div className="flex items-center space-x-2">
              <FaLightbulb className="text-yellow-500" />
              <p className="text-lg font-semibold text-gray-900">
                Maximize Your Profit Tips:
              </p>
            </div>
            <ul className="list-disc list-inside text-gray-600">
              <li>High-quality photos increase buyer interest.</li>
              <li>Detailed descriptions attract serious buyers.</li>
              <li>Competitive pricing leads to faster sales.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PricingTool;