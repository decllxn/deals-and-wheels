import React from 'react';
import CarCard from '../UsedCars/Card';

export default function SimilarListings({ listings }) {
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-[var(--text-color)] mb-8">
        Similar Listings You May Like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {listings.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
