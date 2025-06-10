import React from "react";

const SparePartsForecastWidget = () => {
  return (
    <div className="bg-[--bg-secondary] p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[--text]">📦 Inventory Forecast</h2>
      <ul className="space-y-2 text-[--text-muted]">
        <li>• High demand expected for <span className="text-[--text] font-medium">engine components</span> next month</li>
        <li>• <span className="text-[--text] font-medium">Suspension parts</span> projected to run low in Nairobi region</li>
        <li>• <span className="text-[--text] font-medium">Seasonal demand</span> increase for AC parts in Q2</li>
        <li>• Recommend stocking <span className="text-[--text] font-medium">electrical spares</span> by end of quarter</li>
      </ul>
    </div>
  );
};

export default SparePartsForecastWidget;