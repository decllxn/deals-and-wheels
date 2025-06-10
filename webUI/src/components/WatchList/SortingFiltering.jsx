import { useState } from "react";
import { FaSortAmountDown, FaFilter, FaCar, FaTag, FaUserTie } from "react-icons/fa";

const SortingFiltering = ({ onSortChange, onFilterChange }) => {
  const [filters, setFilters] = useState({
    auctionStatus: "All",
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    sellerType: "All",
  });

  const [sortOption, setSortOption] = useState("Newest");

  // Sorting options
  const sortOptions = ["Newest", "Ending Soon", "Price: Low to High", "Price: High to Low", "Recently Added"];
  const auctionStatusOptions = ["All", "Active", "Ending Soon", "Ended"];
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Auction Status */}
        <div>
          <label className="text-gray-700 font-semibold flex items-center mb-1">
            <FaFilter className="mr-2 text-green-600" /> Auction Status:
          </label>
          <select
            name="auctionStatus"
            value={filters.auctionStatus}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
          >
            {auctionStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

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

export default SortingFiltering;