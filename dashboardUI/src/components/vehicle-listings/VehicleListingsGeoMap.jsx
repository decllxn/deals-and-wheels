import React from "react";
import { MapPin } from "lucide-react";

const VehicleListingsGeoMap = () => {
  return (
    <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <div className="text-4xl text-[var(--accent)] mr-4">
          <MapPin />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            📍 Listings by Region
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Geographic distribution of vehicle listings.
          </p>
        </div>
      </div>
      <div className="w-full h-72 flex items-center justify-center bg-[var(--bg-secondary)] rounded-lg">
        {/* Replace this with your Map component when ready */}
        <span className="text-[var(--text-muted)] italic">
          [🌍 Map Placeholder – Listings Geo Distribution]
        </span>
      </div>
    </div>
  );
};

export default VehicleListingsGeoMap;