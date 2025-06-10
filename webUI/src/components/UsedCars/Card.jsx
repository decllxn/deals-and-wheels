import React from 'react';
import { FaCar, FaGasPump, FaTachometerAlt, FaMapMarkerAlt } from 'react-icons/fa';

const CarCard = ({ car }) => {
  const {
    id,
    image,
    make,
    model,
    year,
    price,
    mileage,
    location,
    fuel_type = 'Petrol', // optional dummy
    transmission = 'Automatic', // optional dummy
  } = car;

  return (
    <div className="bg-[var(--surface-color)] text-[var(--text-color)] rounded-lg shadow-md overflow-hidden border border-[var(--border-color)] flex flex-col h-full transition hover:shadow-lg">
      <div className="relative">
        <img
          src={image}
          alt={`${year} ${make} ${model}`}
          className="w-full h-48 object-cover"
          style={{ maxHeight: '224px' }}
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-semibold mb-2">{`${year} ${make} ${model}`}</h3>

          <div className="flex items-center text-[var(--muted-text)] text-sm mb-1">
            <FaMapMarkerAlt className="mr-2" />
            {location || 'Location not specified'}
          </div>

          <div className="flex items-center text-[var(--muted-text)] text-sm mb-1">
            <FaTachometerAlt className="mr-2" />
            {mileage.toLocaleString()} km
          </div>

          <div className="flex items-center text-[var(--muted-text)] text-sm mb-1">
            <FaGasPump className="mr-2" />
            {fuel_type}
          </div>

          <div className="flex items-center text-[var(--muted-text)] text-sm mb-1">
            <FaCar className="mr-2" />
            {transmission}
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-[var(--accent-color)]">
              KES {price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-[var(--highlight-color)] border-t border-[var(--border-color)] text-right text-sm text-[var(--text-color)]">
        Listing ID: #{id}
      </div>
    </div>
  );
};

export default CarCard;