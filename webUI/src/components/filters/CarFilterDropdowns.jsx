import React from "react";
import FilterDropdown from "./FilterDropdown";
import {
  FaShieldAlt,
  FaTag,
  FaMoneyBillWave,
} from "react-icons/fa";

const CarFilterDropdowns = ({ filters, setFilters, handleFilterChange }) => {
  const handlePriceChange = (e) => {
    const [gte, lte] = e.target.value.split("-");
    setFilters((prev) => ({
      ...prev,
      price__gte: gte || "",
      price__lte: lte || "",
    }));
  };

  const selectBase =
    "relative w-full px-4 py-3 rounded-lg focus:ring-2 appearance-none bg-[var(--surface-color)] " +
    "text-[var(--text-color)] border border-[var(--border-color)] focus:ring-[var(--accent-color)]";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* 💰 Price Range */}
      <div className="relative">
        <select
          name="priceRange"
          onChange={handlePriceChange}
          className={selectBase}
        >
          <option value="">Price Range</option>
          <option value="0-">No Minimum</option>
          <option value="0-1000000">Under 1M</option>
          <option value="1000000-5000000">1M - 5M</option>
          <option value="5000000-10000000">5M - 10M</option>
          <option value="10000000-">10M+</option>
        </select>
        <FaMoneyBillWave className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-text)]" />
      </div>

      {/* ⚙️ Transmission */}
      <FilterDropdown
        name="transmission"
        value={filters.transmission}
        options={["Automatic", "Manual", "CVT", "Dual-Clutch", "Semi-Automatic"]}
        onChange={handleFilterChange}
      />

      {/* 🛞 Drivetrain */}
      <FilterDropdown
        name="drivetrain"
        value={filters.drivetrain}
        options={["FWD", "RWD", "AWD", "4WD"]}
        onChange={handleFilterChange}
      />

      {/* ⛽ Fuel Type */}
      <FilterDropdown
        name="fuel_type"
        value={filters.fuel_type}
        options={["Petrol", "Diesel", "Hybrid", "Electric"]}
        onChange={handleFilterChange}
      />

      {/* 🚗 Body Style */}
      <FilterDropdown
        name="body_style"
        value={filters.body_style}
        options={[
          "Sedan",
          "SUV",
          "Hatchback",
          "Truck",
          "Coupe",
          "Convertible",
          "Wagon",
          "Other",
        ]}
        onChange={handleFilterChange}
      />

      {/* 🛡 Warranty */}
      <FilterDropdown
        name="has_warranty"
        value={filters.has_warranty}
        options={["True", "False"]}
        icon={<FaShieldAlt />}
        onChange={handleFilterChange}
      />

      {/* 🏷 Seller Type */}
      <FilterDropdown
        name="seller_type"
        value={filters.seller_type}
        options={["Dealer", "Private Seller"]}
        icon={<FaTag />}
        onChange={handleFilterChange}
      />

      {/* 📍 Location */}
      <div className="relative">
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Location"
          className={selectBase}
        />
      </div>

      {/* 🏢 Dealer */}
      <div className="relative">
        <input
          type="text"
          name="dealer"
          value={filters.dealer}
          onChange={handleFilterChange}
          placeholder="Dealer Name"
          className={selectBase}
        />
      </div>
    </div>
  );
};

export default CarFilterDropdowns;