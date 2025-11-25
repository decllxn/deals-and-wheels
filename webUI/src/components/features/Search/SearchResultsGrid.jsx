import React from "react";
import SearchResultsCard from "./SearchResultsCard";

const SearchResultsGrid = ({ results = [] }) => {
  if (!results.length)
    return (
      <div className="text-center text-[var(--muted-text)] mt-16 text-sm">
        No cars found matching your criteria.
      </div>
    );

  return (
    <div
      className="
        mt-10
        grid
        gap-6 sm:gap-8 lg:gap-10
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-3 
        2xl:grid-cols-4
        max-w-[1600px]
        mx-auto
        px-4 sm:px-6 lg:px-8
        transition-all
      "
    >
      {results.map((listing) => (
        <SearchResultsCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default SearchResultsGrid;