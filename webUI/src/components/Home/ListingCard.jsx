import React from "react";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaGasPump,
  FaTachometerAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaStore,
  FaBolt,
  FaCogs,
} from "react-icons/fa";

const ListingCard = ({ listing }) => {
  if (!listing) return null;

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
    dealer,
    seller_type,
    drivetrain,
    created_at,
  } = listing;

  const imageUrl =
    images && images.length > 0 ? images[0].image : "/placeholder-car.jpg";

  return (
    <div className="bg-[var(--surface-color)] text-[var(--text-color)] rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-[var(--border-color)]">
      <Link to={`/cars-for-sale/${id}`} className="flex-grow flex flex-col">
        {/* Car Image */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={`${year || ""} ${make || ""} ${model || ""}`}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          {is_featured && (
            <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-semibold uppercase rounded-lg shadow-sm">
              Featured
            </div>
          )}
          {is_sold && (
            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-xs font-semibold uppercase rounded-lg shadow-sm">
              Sold
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-grow justify-between space-y-2">
          {/* Title */}
          <h3 className="text-lg font-semibold line-clamp-2">{`${year || ""} ${make || ""} ${model || ""}`}</h3>

          {/* Key Specs */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--muted-text)]">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              {location || "N/A"}
            </div>
            <div className="flex items-center">
              <FaTachometerAlt className="mr-1" />
              {mileage ? `${mileage.toLocaleString()} mi` : "N/A"}
            </div>
            <div className="flex items-center">
              <FaGasPump className="mr-1" />
              {fuel_type || "N/A"}
            </div>
            <div className="flex items-center">
              <FaCar className="mr-1" />
              {transmission || "N/A"}
            </div>
            <div className="flex items-center">
              <FaCogs className="mr-1" />
              {drivetrain || "N/A"}
            </div>
            {has_warranty !== undefined && (
              <div className="flex items-center">
                {has_warranty ? (
                  <>
                    <FaCheckCircle className="mr-1 text-green-500" /> Warranty
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="mr-1 text-red-500" /> No Warranty
                  </>
                )}
              </div>
            )}
            {seller_type && (
              <div className="flex items-center">
                <FaStore className="mr-1" />
                {seller_type}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mt-3 text-2xl font-bold text-[var(--accent-color)]">
            {price ? `KSh ${Math.round(price).toLocaleString()}` : "Price on Request"}
          </div>
        </div>
      </Link>

      {/* Listed Date */}
      <div className="px-4 py-2 bg-[var(--highlight-color)] border-t border-[var(--border-color)] text-right text-sm text-[var(--text-color)] rounded-b-xl">
        Listed on: {created_at ? new Date(created_at).toLocaleDateString() : "N/A"}
      </div>
    </div>
  );
};

export default ListingCard;