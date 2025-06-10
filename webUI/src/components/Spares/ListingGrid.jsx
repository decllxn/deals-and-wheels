import React from "react";
import ListingCard from "./ListingCard";

const ListingGrid = ({ parts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
      {parts.map((part) => (
        <ListingCard key={part.id} part={part} />
      ))}
    </div>
  );
};

export default ListingGrid;