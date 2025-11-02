import React, { useState } from "react";
import MakeFilter from "./MakeFilter";
import ModelFilter from "./ModelFilter";
import OtherFilters from "./OtherFilters";

const FiltersContainer = ({ appliedFilters, setAppliedFilters }) => {
  const [pendingFilters, setPendingFilters] = useState(appliedFilters);

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);

    // ✅ Scroll to top of listings
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="p-4 rounded shadow-md sticky top-20 w-72"
      style={{
        backgroundColor: "var(--surface-color)",
        color: "var(--text-color)",
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <MakeFilter filters={pendingFilters} setFilters={setPendingFilters} />
      <ModelFilter filters={pendingFilters} setFilters={setPendingFilters} />
      <OtherFilters filters={pendingFilters} setFilters={setPendingFilters} />

      {/* Apply button */}
      <button
        onClick={applyFilters}
        className="mt-4 px-4 py-2 rounded w-full font-semibold transition"
        style={{
          backgroundColor: "var(--accent-color)",
          color: "#fff",
        }}
      >
        Apply Filters
      </button>

      {/* Clear button */}
      <button
        onClick={() => {
          setPendingFilters({});
          setAppliedFilters({});
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="mt-2 px-4 py-2 rounded w-full border font-medium transition"
        style={{
          borderColor: "var(--border-color)",
          color: "var(--text-color)",
        }}
      >
        Clear All
      </button>
    </div>
  );
};

export default FiltersContainer;