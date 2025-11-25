import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Gauge, Fuel, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const Card = ({ car }) => {
  if (!car) return null;

  const {
    id,
    slug,
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
    body_style,
    created_at,
  } = car;

  const imageUrl = images?.[0]?.image || "/placeholder-car.jpg";
  const carSlug = slug || `${make || "car"}-${model || ""}-${year || ""}-${id || ""}`
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const transmissionIcon = "/icons/gear-shift.png";
  const drivetrainIcon = "/icons/steering-wheel.png";

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group flex flex-col bg-[var(--surface-color)]/75 backdrop-blur-md 
        rounded-2xl border border-[var(--border-color)]/40 
        shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
        hover:shadow-[0_6px_28px_rgba(0,0,0,0.08)]
        overflow-hidden transition-all duration-300"
    >
      <Link
        to={`/listings/${carSlug}`}
        className="flex flex-col h-full"
        aria-label={`${year || ""} ${make || ""} ${model || ""}`}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={`${year || ""} ${make || ""} ${model || ""}`}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {is_featured && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium 
              bg-[var(--accent-color)]/85 text-white backdrop-blur-sm">
              Featured
            </div>
          )}

          {is_sold && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium 
              bg-red-500/85 text-white backdrop-blur-sm">
              Sold
            </div>
          )}

          {body_style && !is_sold && (
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium 
              bg-[var(--highlight-color)]/90 text-[var(--text-color)] backdrop-blur-sm">
              {body_style}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-grow p-4 space-y-2">
          <h3 className="text-lg font-semibold leading-snug text-[var(--text-color)] line-clamp-2">
            {`${year || ""} ${make || ""} ${model || ""}`}
          </h3>

          {/* Dealer Info */}
          {dealer?.name && (
            <p className="text-sm text-[var(--muted-text)]">
              <span className="font-medium text-[var(--accent-color)]">
                {dealer.name}
              </span>{" "}
              • {seller_type || "Dealer"}
            </p>
          )}

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[var(--muted-text)]">
            {location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={16} strokeWidth={1.5} />
                <span>{location}</span>
              </div>
            )}
            {mileage && (
              <div className="flex items-center gap-1.5">
                <Gauge size={16} strokeWidth={1.5} />
                <span>{mileage.toLocaleString()} km</span>
              </div>
            )}
            {fuel_type && (
              <div className="flex items-center gap-1.5">
                <Fuel size={16} strokeWidth={1.5} />
                <span>{fuel_type}</span>
              </div>
            )}
            {transmission && (
              <div className="flex items-center gap-1.5">
                <img src={transmissionIcon} alt="Transmission" className="w-4 h-4 opacity-80" />
                <span>{transmission}</span>
              </div>
            )}
            {drivetrain && (
              <div className="flex items-center gap-1.5">
                <img src={drivetrainIcon} alt="Drivetrain" className="w-4 h-4 opacity-80" />
                <span>{drivetrain}</span>
              </div>
            )}
            {has_warranty !== undefined && (
              <div className="flex items-center gap-1.5">
                {has_warranty ? (
                  <CheckCircle2 size={16} strokeWidth={1.5} className="text-green-600" />
                ) : (
                  <XCircle size={16} strokeWidth={1.5} className="text-red-500" />
                )}
                <span>{has_warranty ? "Warranty" : "No Warranty"}</span>
              </div>
            )}
          </div>

          {/* Price - fixed position at bottom of body */}
          <div className="mt-auto pt-3 text-2xl font-semibold text-[var(--accent-color)]">
            {price ? `KSh ${Math.round(price).toLocaleString()}` : "Price on Request"}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 text-xs border-t border-[var(--border-color)]/40 text-[var(--muted-text)]">
          Listed on: {created_at ? new Date(created_at).toLocaleDateString() : "Unavailable"}
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;