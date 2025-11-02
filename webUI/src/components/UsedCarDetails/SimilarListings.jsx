import React from "react";
import CarCard from "../UsedCars/Card";

export default function SimilarListings({ listings }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {listings.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}