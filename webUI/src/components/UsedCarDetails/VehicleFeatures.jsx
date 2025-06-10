import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function VehicleFeatures({ comfortFeatures, safetyFeatures }) {
  const renderFeature = (label, hasFeature) => (
    <div key={label} className="flex items-center gap-2">
      {hasFeature ? (
        <CheckCircle className="w-4 h-4 text-[var(--accent-color)]" />
      ) : (
        <XCircle className="w-4 h-4 text-[var(--border-color)] opacity-50" />
      )}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-6 text-[var(--text-color)]">Vehicle Features</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-3 text-[var(--text-color)]">Comfort & Convenience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {comfortFeatures.map(({ label, value }) => renderFeature(label, value))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-[var(--text-color)]">Safety & Assistance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {safetyFeatures.map(({ label, value }) => renderFeature(label, value))}
        </div>
      </div>
    </div>
  );
}
