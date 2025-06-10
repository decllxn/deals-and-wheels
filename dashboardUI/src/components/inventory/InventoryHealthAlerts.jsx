import React from "react";

const alerts = [
  { id: 1, message: "📷 34 listings missing images" },
  { id: 2, message: "💲 19 listings missing prices" },
  { id: 3, message: "🕒 6 dealers inactive for 30+ days" },
  { id: 4, message: "🚫 4 expired auctions still live" },
];

export default function InventoryHealthAlerts() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">🚨 Inventory Health Flags</h2>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li key={alert.id} className="bg-[var(--bg-secondary)] text-[var(--text)] p-4 rounded-xl flex items-center">
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
}