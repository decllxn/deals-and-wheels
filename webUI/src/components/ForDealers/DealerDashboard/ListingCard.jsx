import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import {
  FaTachometerAlt,
  FaGasPump,
  FaMapMarkerAlt,
  FaCar,
} from "react-icons/fa";

export default function ListingCard({ car, onDelete }) {
  if (!car) return null;

  const {
    title,
    make,
    model,
    year,
    price,
    mileage,
    transmission,
    fuel_type,
    location,
    is_sold,
    images,
    created_at,
  } = car;

  const imageUrl =
    images && images.length > 0
      ? images[0].image
      : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="relative bg-[var(--surface-color)] text-[var(--text-color)] border border-[var(--border-color)] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={title || `${make} ${model}`}
          className="w-full h-48 object-cover rounded-t-xl"
        />

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition"
          title="Delete Listing"
        >
          <Trash2 size={16} />
        </button>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
              is_sold
                ? "bg-red-500/90 text-white"
                : "bg-green-500/90 text-white"
            }`}
          >
            {is_sold ? "Sold" : "Available"}
          </span>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
        <h3 className="text-lg font-semibold line-clamp-2">
          {title || `${year || ""} ${make || ""} ${model || ""}`}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--muted-text)]">
          {location && (
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-[var(--accent-color)]" size={13} />{" "}
              {location}
            </div>
          )}
          {mileage && (
            <div className="flex items-center gap-1">
              <FaTachometerAlt className="text-[var(--accent-color)]" size={13} />{" "}
              {mileage.toLocaleString()} km
            </div>
          )}
          {fuel_type && (
            <div className="flex items-center gap-1">
              <FaGasPump className="text-[var(--accent-color)]" size={13} />{" "}
              {fuel_type}
            </div>
          )}
          {transmission && (
            <div className="flex items-center gap-1">
              <FaCar className="text-[var(--accent-color)]" size={13} />{" "}
              {transmission}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-2 text-xl font-bold text-[var(--accent-color)]">
          {price
            ? `KSh ${Math.round(price).toLocaleString()}`
            : "Price on Request"}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-[var(--highlight-color)] border-t border-[var(--border-color)] text-xs text-[var(--muted-text)] flex justify-between items-center">
        <span>
          Listed:{" "}
          {created_at
            ? new Date(created_at).toLocaleDateString()
            : "Recently Added"}
        </span>
        <span className="italic text-[var(--accent-color)] font-medium">
          Dealer
        </span>
      </div>
    </motion.div>
  );
}