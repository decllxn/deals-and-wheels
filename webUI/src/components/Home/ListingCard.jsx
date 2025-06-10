import React from "react";
import { Link } from "react-router-dom";
import { FaCar, FaGasPump, FaTachometerAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaStore } from "react-icons/fa";

const ListingCard = ({ listing }) => {
  const {
    id,
    images,
    make,
    model,
    year,
    price,
    mileage,
    transmission,
    fuel_type,
    location,
    has_warranty,
    is_featured,
    is_sold,
    dealer, // Assuming your API response includes dealer information (e.g., dealer name)
    created_at,
  } = listing;

  const imageUrl = images && images.length > 0 ? images[0].image : "/placeholder-car.jpg"; // Use placeholder if no image

  return (
    <div className="bg-[var(--surface-color)] text-[var(--text-color)] rounded-lg shadow-md overflow-hidden border border-[var(--border-color)] flex flex-col h-full">
      <Link to={`/cars-for-sale/${id}`} className="flex-grow">
        <div className="relative">
          <img
            src={imageUrl}
            alt={`${year} ${make} ${model}`}
            className="w-full h-48 object-cover"
            style={{ maxHeight: '224px' }}
          />
          {is_featured && (
            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-lg shadow-md">
              Featured
            </div>
          )}
          {is_sold && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-lg shadow-md">
              Sold
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2 line-clamp-2">{`${year} ${make} ${model}`}</h3>
            <div className="flex items-center text-[var(--muted-text)] text-sm mb-1">
              <FaMapMarkerAlt className="mr-2 text-[var(--muted-text)]" />
              {location || "Location not specified"}
            </div>
            <div className="flex items-center text-[var(--muted-text)] text-sm mb-1">
              <FaTachometerAlt className="mr-2" />
              {mileage ? `${mileage.toLocaleString()} miles` : "N/A"}
            </div>
            <div className="flex items-center text-[var(--muted-text)] text-sm mb-1">
              <FaGasPump className="mr-2" />
              {fuel_type || "N/A"}
            </div>
            <div className="flex items-center text-[var(--muted-text)] text-sm mb-2">
              <FaCar className="mr-2" />
              {transmission || "N/A"}
            </div>
            {has_warranty !== undefined && (
              <div className="flex items-center text-[var(--muted-text)] text-sm mb-2">
                {has_warranty ? (
                  <>
                    <FaCheckCircle className="mr-2 text-green-500" />
                    Warranty Available
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="mr-2 text-red-500" />
                    No Warranty
                  </>
                )}
              </div>
            )}
            {dealer && (
              <div className="flex items-center text-[var(--text-color)] text-sm mb-1">
                <FaStore className="mr-2 text-[var(--muted-text)]" />
                Dealer: {dealer.name || dealer.email || "N/A"}
              </div>
            )}
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-[var(--accent-color)] mr-2">
                  {price} {/* Display raw price */}
                </span>
              </div>
              <div>
                <span className="text-md font-semibold text-green-600">
                  {price} {/* Display raw price again for KES (before conversion) */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 py-2 bg-[var(--highlight-color)] border-t border-[var(--border-color)] text-right text-sm">
        Listed on: {new Date(created_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ListingCard;