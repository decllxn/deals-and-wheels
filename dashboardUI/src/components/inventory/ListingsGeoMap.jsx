import React from "react";

export default function ListingsGeoMap() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md h-full">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">📌 Regional Listing Map</h2>
      <div className="flex items-center justify-center h-72 bg-[var(--bg-secondary)] rounded-xl">
        <span className="text-[var(--text-muted)]">🌍 Heatmap placeholder (Map of East/Central Africa)</span>
      </div>
      <p className="text-sm mt-4 text-[var(--text-muted)]">
        Shows listing density by location. Useful to spot coverage gaps and hot auction zones.
      </p>
    </div>
  );
}