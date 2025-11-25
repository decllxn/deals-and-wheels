import React from "react";
import { motion } from "framer-motion";
import ListingCard from "./ListingCard";

export default function DealerListings({ listings = [], loading, onDelete }) {
  return (
    <motion.div
      key="listings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {loading ? (
        <p className="text-center col-span-full py-10 text-[var(--muted-text)]">
          Loading listings...
        </p>
      ) : listings.length === 0 ? (
        <p className="text-center col-span-full py-10 text-[var(--muted-text)]">
          No listings available yet.
        </p>
      ) : (
        listings.map((car) => (
          <ListingCard
            key={car.id}
            car={car}
            onDelete={onDelete ? () => onDelete(car.id) : null}
          />
        ))
      )}
    </motion.div>
  );
}