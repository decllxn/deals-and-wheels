import React from "react";

export default function PaymentsGeoMap() {
  return (
    <div className="bg-[var(--bg)] p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold text-[var(--text)] mb-4">🗺️ Regional Payment Heatmap</h2>
      <div className="text-center text-[var(--text-muted)] italic">
        [Geo heatmap placeholder – integrate charting library like Leaflet, Google Maps, or D3.js later]
      </div>
      <div className="mt-4 text-sm text-[var(--text-muted)] text-center">
        Analyze geographical payment data to improve targeted efforts.
      </div>
    </div>
  );
}