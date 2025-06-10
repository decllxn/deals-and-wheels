import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSlidersH,
  FaChevronDown,
  FaTag,
  FaShieldAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import SearchBarWithDropdown from "./SearchBarWithDropdown";

const CarsForSaleFilter = () => {
  const [filters, setFilters] = useState({
    price__gte: "",
    price__lte: "",
    transmission: "",
    drivetrain: "",
    fuel_type: "",
    body_style: "",
    has_warranty: "",
    seller_type: "",
    location: "",
    dealer: "",
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (searchTerm) => {
    navigate(`/cars-for-sale?search=${searchTerm}&${new URLSearchParams(filters).toString()}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickFilter = (type) => {
    const filters = {
      Featured: "is_featured=True",
      "Newest Listings": "ordering=-created_at",
      "Lowest Price": "ordering=price",
      "Highest Price": "ordering=-price",
      "Lowest Mileage": "ordering=mileage",
    };
    navigate(`/cars-for-sale?${filters[type] || ""}`);
  };

  const selectBase =
    "relative w-full px-4 py-3 rounded-lg focus:ring-2 appearance-none bg-[var(--surface-color)] text-[var(--text-color)] border border-[var(--border-color)] focus:ring-[var(--accent-color)]";
  const iconStyle =
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-text)]";

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 mt-12 shadow-xl bg-[var(--surface-color)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
        <Link to="/cars-for-sale">
          <h2 className="text-2xl font-bold uppercase text-[var(--text-color)]">Cars for Sale</h2>
        </Link>

        <div className="hidden md:flex gap-4">
          {["Featured", "Newest Listings", "Lowest Price", "Highest Price", "Lowest Mileage"].map((label) => (
            <button
              key={label}
              className="text-sm font-medium transition-all text-[var(--muted-text)] hover:text-[var(--accent-color)]"
              onClick={() => handleQuickFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-[var(--text-color)] text-[var(--bg-color)] hover:bg-[var(--muted-text)]"
        >
          <FaSlidersH />
          More Filters
        </button>
      </div>

      <div className="mt-4">
        <SearchBarWithDropdown onSearchSubmit={handleSearchSubmit} />
      </div>

      {showAdvancedFilters && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Price Range */}
          <div className="relative">
            <select
              name="priceRange"
              onChange={(e) => {
                const [gte, lte] = e.target.value.split("-");
                setFilters((prev) => ({
                  ...prev,
                  price__gte: gte || "",
                  price__lte: lte || "",
                }));
              }}
              className={selectBase}
            >
              <option value="">Price Range</option>
              <option value="0-">No Minimum</option>
              <option value="0-1000000">Under 1M</option>
              <option value="1000000-5000000">1M - 5M</option>
              <option value="5000000-10000000">5M - 10M</option>
              <option value="10000000-">10M+</option>
            </select>
            <FaMoneyBillWave className={iconStyle} />
          </div>

          {/* Transmission */}
          <Dropdown name="transmission" value={filters.transmission} options={["Automatic", "Manual", "CVT", "Dual-Clutch", "Semi-Automatic"]} onChange={handleFilterChange} />
          {/* Drivetrain */}
          <Dropdown name="drivetrain" value={filters.drivetrain} options={["FWD", "RWD", "AWD", "4WD"]} onChange={handleFilterChange} />
          {/* Fuel Type */}
          <Dropdown name="fuel_type" value={filters.fuel_type} options={["Petrol", "Diesel", "Hybrid", "Electric"]} onChange={handleFilterChange} />
          {/* Body Style */}
          <Dropdown name="body_style" value={filters.body_style} options={["Sedan", "SUV", "Hatchback", "Truck", "Coupe", "Convertible", "Wagon", "Other"]} onChange={handleFilterChange} />
          {/* Warranty */}
          <Dropdown name="has_warranty" value={filters.has_warranty} options={["True", "False"]} icon={<FaShieldAlt />} onChange={handleFilterChange} />
          {/* Seller Type */}
          <Dropdown name="seller_type" value={filters.seller_type} options={["Dealer", "Private Seller"]} icon={<FaTag />} onChange={handleFilterChange} />

          {/* Location */}
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

          {/* Dealer */}
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
      )}
    </div>
  );
};

const Dropdown = ({ name, value, options, onChange, icon = <FaChevronDown /> }) => {
  const selectBase =
    "relative w-full px-4 py-3 rounded-lg focus:ring-2 appearance-none bg-[var(--surface-color)] text-[var(--text-color)] border border-[var(--border-color)] focus:ring-[var(--accent-color)]";
  const iconStyle =
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-text)]";

  return (
    <div className="relative">
      <select name={name} value={value} onChange={onChange} className={selectBase}>
        <option value="">{name.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className={iconStyle}>{icon}</div>
    </div>
  );
};

export default CarsForSaleFilter;