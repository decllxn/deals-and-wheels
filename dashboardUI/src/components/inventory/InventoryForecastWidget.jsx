import React from "react";

export default function InventoryForecastWidget() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">🤖 Inventory Forecast</h2>
      <div className="space-y-3 text-[var(--text)]">
        <div className="bg-[var(--bg-secondary)] p-4 rounded-xl">
          🔮 Demand for SUVs in Nairobi expected to rise by <strong className="text-[var(--accent)]">+23%</strong> in the next 14 days.
        </div>
        <div className="bg-[var(--bg-secondary)] p-4 rounded-xl">
          ⏳ Spare parts for Toyota models may stock out by <strong className="text-[var(--accent)]">May 3rd</strong>.
        </div>
        <div className="bg-[var(--bg-secondary)] p-4 rounded-xl">
          📉 Listings for hatchbacks projected to slow down by <strong className="text-[var(--accent)]">-15%</strong> this month.
        </div>
      </div>
    </div>
  );
}