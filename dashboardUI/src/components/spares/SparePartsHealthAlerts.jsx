import React from "react";
import { AlertCircle, ImageOff, FileWarning } from "lucide-react";

const alerts = [
  { icon: <ImageOff className="w-5 h-5 text-red-500" />, label: "Missing Images", count: 42 },
  { icon: <FileWarning className="w-5 h-5 text-orange-500" />, label: "Incomplete Descriptions", count: 29 },
  { icon: <AlertCircle className="w-5 h-5 text-yellow-500" />, label: "Inactive Dealers", count: 14 },
  { icon: <AlertCircle className="w-5 h-5 text-pink-500" />, label: "Not Updated (30+ days)", count: 36 },
];

const SparePartsHealthAlerts = () => (
  <div className="bg-[--bg-secondary] p-6 rounded-xl shadow-md">
    <h2 className="text-lg font-semibold mb-4 text-[--text]">🛠️ Spare Part Health Alerts</h2>
    <ul className="space-y-3">
      {alerts.map((alert, index) => (
        <li key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {alert.icon}
            <span className="text-[--text]">{alert.label}</span>
          </div>
          <span className="text-sm font-bold text-[--accent]">{alert.count}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default SparePartsHealthAlerts;