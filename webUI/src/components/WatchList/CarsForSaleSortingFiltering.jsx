import { useState } from "react";
import { FaSortAmountDown, FaCar, FaTag, FaUserTie, FaGasPump, FaCogs, FaCalendarAlt } from "react-icons/fa";

const CarsForSaleSortingFiltering = ({ onSortChange, onFilterChange }) => {
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    transmission: "All",
    fuelType: "All",
    sellerType: "All",
  });

  const [sortOption, setSortOption] = useState("Newest Listings");

  // Sorting options
  const sortOptions = ["Newest Listings", "Price: Low to High", "Price: High to Low", "Oldest Listings"];

  // Transmission options
  const transmissionOptions = ["All", "Automatic", "Manual"];

  // Fuel type options
  const fuelTypes = ["All", "Petrol", "Diesel", "Hybrid", "Electric"];

  // Seller type options
  const sellerTypes = ["All", "Dealer", "Individual"];

  // Handle sorting change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    onSortChange(event.target.value);
  };

  // Handle filtering change
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
      {/* Sorting Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <label className="text-gray-700 font-semibold flex items-center mb-1">
            <FaSortAmountDown className="mr-2 text-blue-600" /> Sort By:
          </label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full lg:w-64 border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtering Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Car Make */}
        <div>
          <label className="text-gray-700 font-semibold flex items-center mb-1">
            <FaCar className="mr-2 text-yellow-500" /> Make:
          </label>
          <input
            type="text"
            name="make"
            value={filters.make}
            onChange={handleFilterChange}
            placeholder="e.g. Toyota"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Car Model */}
        <div>
          <label className="text-gray-700 font-semibold flex items-center mb-1">
            <FaCar className="mr-2 text-yellow-500" /> Model:
          </label>
          <input
            type="text"
            name="model"
            value={filters.model}
            onChange={handleFilterChange}
            placeholder="e.g. Land Cruiser"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Price Range */}
        <div className="flex space-x-2">
          <div>
            <label className="text-gray-700 font-semibold flex items-center mb-1">
              <FaTag className="mr-2 text-green-500" /> Min Price:
            </label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Ksh 500,000"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold flex items-center mb-1">
              <FaTag className="mr-2 text-green-500" /> Max Price:
            </label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Ksh 5,000,000"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Year Range */}
        <div className="flex space-x-2">
          <div>
            <label className="text-gray-700 font-semibold flex items-center mb-1">
              <FaCalendarAlt className="mr-2 text-blue-500" /> Min Year:
            </label>
            <input
              type="number"
              name="minYear"
              value={filters.minYear}
              onChange={handleFilterChange}
              placeholder="e.g. 2015"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold flex items-center mb-1">
              <FaCalendarAlt className="mr-2 text-blue-500" /> Max Year:
            </label>
            <input
              type="number"
              name="maxYear"
              value={filters.maxYear}
              onChange={handleFilterChange}
              placeholder="e.g. 2024"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Transmission Type */}
        <div>
          <label className="text-gray-700 font-semibold flex items-center mb-1">
            <FaCogs className="mr-2 text-red-500" /> Transmission:
          </label>
          <select
            name="transmission"
            value={filters.transmission}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500"
          >
            {transmissionOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="text-gray-700 font-semibold flex items-center mb-1">
            <FaGasPump className="mr-2 text-orange-500" /> Fuel Type:
          </label>
          <select
            name="fuelType"
            value={filters.fuelType}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {fuelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Seller Type */}
        <div>
          <label className="text-gray-700 font-semibold flex items-center mb-1">
            <FaUserTie className="mr-2 text-purple-600" /> Seller Type:
          </label>
          <select
            name="sellerType"
            value={filters.sellerType}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {sellerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default CarsForSaleSortingFiltering;