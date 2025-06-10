import React, { useState } from "react";
import { FaSearch, FaCar } from "react-icons/fa";

const MakeModelSearch = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Nissan"]; // Example makes
  const models = {
    Toyota: ["Corolla", "Camry", "Rav4", "Supra"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot"],
    Ford: ["Mustang", "F-150", "Focus", "Explorer"],
    BMW: ["3 Series", "5 Series", "X5", "M3"],
    Mercedes: ["C-Class", "E-Class", "S-Class", "GLC"],
    Audi: ["A4", "A6", "Q5", "R8"],
    Nissan: ["Altima", "Sentra", "Rogue", "GT-R"],
  }; // Example models based on make

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search:", make, model);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Search by Make & Model</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Make Select */}
        <div className="relative">
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">Select Make</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <FaCar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Model Select */}
        <div className="relative">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 appearance-none"
            disabled={!make}
          >
            <option value="">Select Model</option>
            {make &&
              models[make].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
          </select>
          <FaCar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        <FaSearch className="inline-block mr-2" />
        Search
      </button>
    </div>
  );
};

export default MakeModelSearch;