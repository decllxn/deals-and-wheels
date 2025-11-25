// components/filters/CarsForSaleFilter.jsx
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

import CarFilterDropdowns from "./CarFilterDropdowns";
import FilterButton from "./FilterButton";
import { useFilters } from "../../hooks/useFilters";
import Button from "../ui/Button";

const CarsForSaleFilter = forwardRef(({ onFiltersChange }, ref) => {
  const filterRef = useRef(null);
  const {
    filters,
    showAdvancedFilters,
    selectedView,
    handleQuickFilter,
    handleFilterChange,
    resetFilters,
    toggleAdvancedFilters,
  } = useFilters(onFiltersChange);

  // Expose scrollToTop to parent
  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      if (filterRef.current) {
        const navbarOffset = 100;
        const top =
          filterRef.current.getBoundingClientRect().top +
          window.scrollY -
          navbarOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
  }));

  const quickFilters = [
    "Featured",
    "Newest Listings",
    "Lowest Price",
    "Highest Price",
    "Lowest Mileage",
  ];

  return (
    <div
      ref={filterRef}
      className="
        w-full 
        max-w-[1600px] 
        mx-auto 
        p-4 sm:p-6 
        mt-10 sm:mt-12 
        bg-[var(--bg-color)] 
        rounded-2xl 
        border border-[var(--border-color)] 
        shadow-sm
        transition-all
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-col 
          md:flex-row md:items-center md:justify-between 
          gap-4 md:gap-6 
          pb-4 
          border-b border-[var(--border-color)]
        "
      >
        {/* Title */}
        <Link to="/cars-for-sale">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors">
            Cars for Sale
          </h2>
        </Link>

        {/* Quick Filters */}
        <div
          className="
            flex flex-wrap justify-start sm:justify-center md:justify-end 
            gap-2 sm:gap-3 
            order-3 md:order-2
          "
        >
          {quickFilters.map((label) => (
            <FilterButton
              key={label}
              label={label}
              active={selectedView === label}
              onClick={() => handleQuickFilter(label)}
            />
          ))}

          <Button
            variant="ghost"
            color="danger"
            size="sm"
            className="!px-3"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-end order-2 md:order-3">
          <Button
            onClick={toggleAdvancedFilters}
            variant="solid"
            size="sm"
            className="
              flex items-center gap-2
              bg-[var(--accent-color)] 
              text-[var(--bg-color)] 
              transition-colors
            "
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showAdvancedFilters ? "Hide Filters" : "More Filters"}
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-6">
          <CarFilterDropdowns
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </div>
      )}
    </div>
  );
});

export default CarsForSaleFilter;