import React from "react";

const stats = [
  { label: "Active Car Listings", value: 1243, icon: "🚗" },
  { label: "Active Spare Parts", value: 987, icon: "🔧" },
  { label: "Live Auctions", value: 42, icon: "📦" },
  { label: "New This Week", value: 318, icon: "🕒" },
  { label: "Out of Stock", value: 76, icon: "❌" },
  { label: "Expired Listings", value: 54, icon: "⛔" },
];

export default function InventoryPlatformSummaryCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[var(--bg-secondary)] p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200"
        >
          <div className="text-2xl">{stat.icon}</div>
          <div className="text-[var(--text)] font-semibold mt-2">{stat.label}</div>
          <div className="text-2xl font-bold text-[var(--accent)]">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
