import React from "react";
import { CheckCircle } from "lucide-react";

export default function VehicleFeatures({ features = [], equipment = [] }) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-6 text-[var(--text-color)]">
        Features & Equipment
      </h2>

      {/* --- Features --- */}
      {features?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-[var(--text-color)]">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {features.map((feat) => (
              <div key={feat.id} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--accent-color)]" />
                <span>{feat.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Equipment --- */}
      {equipment?.length > 0 && (
        <div>
          <h3 className="font-medium mb-3 text-[var(--text-color)]">Equipment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {equipment.map((eq) => (
              <div key={eq.id} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--accent-color)]" />
                <span>{eq.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}