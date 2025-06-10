import React from "react";
import { PackageCheck } from "lucide-react";

const inventoryForecastData = [
  { category: "SUV", predictedShortage: 20, seasonality: "High Demand" },
  { category: "Sedan", predictedShortage: 10, seasonality: "Stable" },
  { category: "Truck", predictedShortage: 5, seasonality: "Low Demand" },
  { category: "Coupe", predictedShortage: 15, seasonality: "High Demand" },
];

const VehicleInventoryForecastWidget = () => (
  <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="text-4xl text-[var(--accent)] mr-4">
        <PackageCheck />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          📦 Inventory Forecasting
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Predicted shortages and seasonality.
        </p>
      </div>
    </div>
    <div className="space-y-4">
      {inventoryForecastData.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[var(--text)] py-3 border-b border-[var(--border)] last:border-b-0"
        >
          <span className="text-[var(--text-muted)] mb-1 sm:mb-0">{item.category}</span>
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4">
            <span className="font-semibold">Shortage: {item.predictedShortage}</span>
            <span className="font-semibold">{item.seasonality}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default VehicleInventoryForecastWidget;