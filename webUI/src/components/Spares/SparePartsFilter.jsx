import React, { useState } from "react";
import { FaSearch, FaSlidersH, FaChevronDown, FaTag, FaTools, FaBolt, FaCar, FaPaintRoller, FaTachometerAlt, FaCogs, FaRulerCombined, FaCarBattery, FaOilCan, FaCircle, FaLightbulb, FaExclamationTriangle, FaThermometerHalf, FaFan, FaWheelchair, FaCarCrash, FaMoneyBillWave } from "react-icons/fa";

const SparePartsFilter = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    make: "",
    model: "",
    year: "",
    priceRange: "",
    condition: "",
    location: "",
    compatibility: "",
    brand: "",
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const selectStyle = "relative w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 appearance-none";
  const iconStyle = "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500";

  return (
    <div className="w-full max-w-[1600px] mx-auto bg-white shadow-xl rounded-xl p-6 mt-12">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-black uppercase">Spare Parts</h2>

        {/* Quick Sort Filters */}
        <div className="hidden md:flex gap-4">
          {["Best Deals", "Newest Listings", "Lowest Price", "Top Rated Sellers"].map((filter, index) => (
            <button
              key={index}
              className="text-gray-700 hover:text-blue-600 transition-all text-sm font-medium"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Expand Filters Button */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-900 transition-all"
        >
          <FaSlidersH />
          More Filters
        </button>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center w-full mt-4">
        <FaSearch className="absolute left-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search for parts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
        />
        <button
          onClick={() => {
            // Implement search logic here
          }}
          className="ml-4 bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-all"
        >
          Search
        </button>
      </div>

      {/* Advanced Filters - Expandable */}
      {showAdvancedFilters && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Category */}
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className={selectStyle}
            >
              <option value="">Category</option>
              <option value="Engine Parts">Engine Parts</option>
              <option value="Transmission Parts">Transmission Parts</option>
              <option value="Brake System">Brake System</option>
              <option value="Suspension & Steering">Suspension & Steering</option>
              <option value="Electrical & Lighting">Electrical & Lighting</option>
              <option value="Body Parts">Body Parts</option>
              <option value="Interior Parts">Interior Parts</option>
              <option value="Exhaust System">Exhaust System</option>
              <option value="Cooling System">Cooling System</option>
              <option value="Wheels & Tires">Wheels & Tires</option>
              <option value="Accessories">Accessories</option>
              <option value="Body Mods">Body Mods</option>
              <option value="Performance Parts">Performance Parts</option>
              <option value="Safety & Security">Safety & Security</option>
              <option value="Maintenance & Fluids">Maintenance & Fluids</option>
              <option value="Other">Other</option>
            </select>
            <FaTools className={iconStyle} />
          </div>

          {/* Make */}
          <div className="relative">
            <select
              value={filters.make}
              onChange={(e) => setFilters({ ...filters, make: e.target.value })}
              className={selectStyle}
            >
              <option value="">Make</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Other">Other</option>
            </select>
            <FaCar className={iconStyle} />
          </div>

          {/* Model */}
          <div className="relative">
            <select
              value={filters.model}
              onChange={(e) => setFilters({ ...filters, model: e.target.value })}
              className={selectStyle}
            >
              <option value="">Model</option>
              {/* Populate models dynamically based on make */}
            </select>
            <FaTachometerAlt className={iconStyle} />
          </div>

          {/* Year */}
          <div className="relative">
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className={selectStyle}
            >
              <option value="">Year</option>
              {/* Populate years dynamically */}
            </select>
            <FaCogs className={iconStyle} />
          </div>

          {/* Price Range */}
          <div className="relative">
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              className={selectStyle}
            >
              <option value="">Price Range</option>
              <option value="Under 1000">Under 1000</option>
              <option value="1000 - 5000">1000 - 5000</option>
              <option value="5000 - 10000">5000 - 10000</option>
              <option value="10000+">10000+</option>
            </select>
            <FaMoneyBillWave className={iconStyle} />
          </div>

          {/* Condition */}
          <div className="relative">
            <select
              value={filters.condition}
              onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
              className={selectStyle}
            >
              <option value="">Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
            <FaRulerCombined className={iconStyle} />
          </div>

          {/* Location */}
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className={selectStyle}
            >
              <option value="">Location</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Nakuru">Nakuru</option>
            </select>
            <FaTag className={iconStyle} />
          </div>

          {/* Compatibility */}
          <div className="relative">
            <select
              value={filters.compatibility}
              onChange={(e) => setFilters({ ...filters, compatibility: e.target.value })}
              className={selectStyle}
            >
              <option value="">Compatibility</option>
              {/* Populate based on make, model, year */}
            </select>
            <FaBolt className={iconStyle} />
          </div>

          {/* Brand */}
          <div className="relative">
            <select
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
              className={selectStyle}
            >
              <option value="">Brand</option>
              {/* Populate brands dynamically */}
            </select>
            <FaTag className={iconStyle} />
          </div>

          {/* Brake System */}
          <div className="relative">
            <select
              value={filters.brakeSystem}
              onChange={(e) => setFilters({ ...filters, brakeSystem: e.target.value })}
              className={selectStyle}
            >
              <option value="">Brake System</option>
              <option value="Disc Brakes">Disc Brakes</option>
              <option value="Drum Brakes">Drum Brakes</option>
              <option value="ABS">ABS</option>
            </select>
            <FaExclamationTriangle className={iconStyle} />
          </div>

          {/* Electrical & Lighting */}
          <div className="relative">
            <select
              value={filters.electricalLighting}
              onChange={(e) => setFilters({ ...filters, electricalLighting: e.target.value })}
              className={selectStyle}
            >
              <option value="">Electrical & Lighting</option>
              <option value="Headlights">Headlights</option>
              <option value="Tail Lights">Tail Lights</option>
              <option value="Batteries">Batteries</option>
            </select>
            <FaLightbulb className={iconStyle} />
          </div>

          {/* Cooling System */}
          <div className="relative">
            <select
              value={filters.coolingSystem}
              onChange={(e) => setFilters({ ...filters, coolingSystem: e.target.value })}
              className={selectStyle}
            >
              <option value="">Cooling System</option>
              <option value="Radiators">Radiators</option>
              <option value="Fans">Fans</option>
              <option value="Thermostats">Thermostats</option>
            </select>
            <FaThermometerHalf className={iconStyle} />
          </div>

          {/* Wheels & Tires */}
          <div className="relative">
            <select
              value={filters.wheelsTires}
              onChange={(e) => setFilters({ ...filters, wheelsTires: e.target.value })}
              className={selectStyle}
            >
              <option value="">Wheels & Tires</option>
              <option value="Tires">Tires</option>
              <option value="Rims">Rims</option>
            </select>
            <FaCircle className={iconStyle} />
          </div>

          {/* Body Mods */}
          <div className="relative">
            <select
              value={filters.bodyMods}
              onChange={(e) => setFilters({ ...filters, bodyMods: e.target.value })}
              className={selectStyle}
            >
              <option value="">Body Mods</option>
              <option value="Spoilers">Spoilers</option>
              <option value="Body Kits">Body Kits</option>
              <option value="Paint">Paint</option>
            </select>
            <FaPaintRoller className={iconStyle} />
          </div>

          {/* Maintenance & Fluids */}
          <div className="relative">
            <select
              value={filters.maintenanceFluids}
              onChange={(e) => setFilters({ ...filters, maintenanceFluids: e.target.value })}
              className={selectStyle}
            >
              <option value="">Maintenance & Fluids</option>
              <option value="Oil">Oil</option>
              <option value="Filters">Filters</option>
            </select>
            <FaOilCan className={iconStyle} />
          </div>

          {/* Steering */}
          <div className="relative">
            <select
              value={filters.steering}
              onChange={(e) => setFilters({ ...filters, steering: e.target.value })}
              className={selectStyle}
            >
              <option value="">Steering</option>
              <option value="Steering Wheels">Steering Wheels</option>
              <option value="Steering Racks">Steering Racks</option>
            </select>
            <FaCircle className={iconStyle} />
          </div>

          {/* Car Battery */}
          <div className="relative">
            <select
              value={filters.carBattery}
              onChange={(e) => setFilters({ ...filters, carBattery: e.target.value })}
              className={selectStyle}
            >
              <option value="">Car Battery</option>
              <option value="Car Battery">Car Battery</option>
            </select>
            <FaCarBattery className={iconStyle} />
          </div>

          {/* Car Crash */}
          <div className="relative">
            <select
              value={filters.carCrash}
              onChange={(e) => setFilters({ ...filters, carCrash: e.target.value })}
              className={selectStyle}
            >
              <option value="">Car Crash</option>
              <option value="Car Crash">Car Crash</option>
            </select>
            <FaCarCrash className={iconStyle} />
          </div>

          {/* Fan */}
          <div className="relative">
            <select
              value={filters.fan}
              onChange={(e) => setFilters({ ...filters, fan: e.target.value })}
              className={selectStyle}
            >
              <option value="">Fan</option>
              <option value="Fan">Fan</option>
            </select>
            <FaFan className={iconStyle} />
          </div>

          {/* Wheelchair */}
          <div className="relative">
            <select
              value={filters.wheelchair}
              onChange={(e) => setFilters({ ...filters, wheelchair: e.target.value })}
              className={selectStyle}
            >
              <option value="">Wheelchair</option>
              <option value="Wheelchair">Wheelchair</option>
            </select>
            <FaWheelchair className={iconStyle} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SparePartsFilter;