// CarsForSaleFilter.jsx
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Link } from "react-router-dom";
import { FaSlidersH } from "react-icons/fa";
import CarFilterDropdowns from "./CarFilterDropdowns";

const CarsForSaleFilter = forwardRef(({ onFiltersChange }, ref) => {
  const filterRef = useRef(null);

  // ✅ Expose scrollToTop method to parent
  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      if (filterRef.current) {
        const navbarOffset = 100; // adjust to match your navbar height
        const top =
          filterRef.current.getBoundingClientRect().top +
          window.scrollY -
          navbarOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
  }));

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
    ordering: "-created_at", // default to newest listings
    is_featured: "",
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedView, setSelectedView] = useState("Newest Listings");

  const updateFilters = (newFilters) => {
    setFilters((prev) => {
      const merged = { ...prev, ...newFilters };
      // ✅ Clean empty values before sending to parent
      const cleaned = Object.fromEntries(
        Object.entries(merged).filter(
          ([, value]) => value !== "" && value !== null && value !== undefined
        )
      );
      onFiltersChange?.(cleaned);
      return merged;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value });
  };

  const handleQuickFilter = (label) => {
    const viewMappings = {
      Featured: { is_featured: true, ordering: "-created_at" },
      "Newest Listings": { ordering: "-created_at" },
      "Lowest Price": { ordering: "price" },
      "Highest Price": { ordering: "-price" },
      "Lowest Mileage": { ordering: "mileage" },
    };

    setSelectedView(label);
    updateFilters(viewMappings[label] || {});
  };

  const resetFilters = () => {
    const reset = {
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
      ordering: "-created_at",
      is_featured: "",
    };
    setFilters(reset);
    onFiltersChange?.(reset);
    setSelectedView("Newest Listings");
  };

  return (
    <div
      ref={filterRef}
      className="w-full max-w-[1600px] mx-auto p-6 mt-12 bg-[var(--bg-color)]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <Link to="/cars-for-sale">
          <h2 className="text-2xl font-bold uppercase text-[var(--text-color)]">
            Cars for Sale
          </h2>
        </Link>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3">
          {[
            "Featured",
            "Newest Listings",
            "Lowest Price",
            "Highest Price",
            "Lowest Mileage",
          ].map((label) => (
            <button
              key={label}
              className={`text-sm font-medium transition-all px-3 py-1 rounded-md ${
                selectedView === label
                  ? "bg-[var(--accent-color)] text-white"
                  : "text-[var(--muted-text)] hover:text-[var(--accent-color)]"
              }`}
              onClick={() => handleQuickFilter(label)}
            >
              {label}
            </button>
          ))}

          <button
            onClick={resetFilters}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-all"
          >
            Reset
          </button>
        </div>

        {/* Advanced Filters toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-[var(--text-color)] text-[var(--bg-color)] hover:bg-[var(--muted-text)]"
        >
          <FaSlidersH />
          {showAdvancedFilters ? "Hide Filters" : "More Filters"}
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-6">
          <CarFilterDropdowns
            filters={filters}
            setFilters={updateFilters}
            handleFilterChange={handleFilterChange}
          />
        </div>
      )}
    </div>
  );
});

export default CarsForSaleFilter;