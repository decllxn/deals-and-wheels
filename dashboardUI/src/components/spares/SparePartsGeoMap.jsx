import React from "react";
import { MapPin } from "lucide-react";

const SparePartsGeoMapModern = () => (
  <div className="bg-[--bg] rounded-2xl shadow-md p-5 flex flex-col">
    <div className="flex items-center mb-4">
      <MapPin className="text-[--accent] mr-2" size={20} />
      <h2 className="text-lg font-semibold text-[--text]">Geographic Distribution</h2>
    </div>
    {/* Replace with real map integration like Mapbox or Leaflet */}
    <div className="h-64 w-full rounded-lg bg-gradient-to-br from-indigo-200 via-blue-300 to-cyan-200 opacity-70 flex items-center justify-center text-gray-700 font-semibold text-lg">
      Map Visualization Area
    </div>
    <p className="text-sm text-[--text-muted] mt-3">
      Distribution of spare parts listings across different regions.
    </p>
  </div>
);

export default SparePartsGeoMapModern;