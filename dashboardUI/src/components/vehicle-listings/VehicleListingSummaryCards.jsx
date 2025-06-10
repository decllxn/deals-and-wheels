import React from "react";
import { Car, Clock, Coins, Eye, MessageSquare, X, Package } from "lucide-react";

const summaryItems = [
  { label: "Total Active Listings", value: 1245, icon: <Car /> },
  { label: "New Listings This Week", value: 132, icon: <Package /> },
  { label: "Avg. Time to Sale", value: "12 days", icon: <Clock /> },
  { label: "Avg. Listing Price", value: "$8,200", icon: <Coins /> },
  { label: "Total Views", value: "45,000", icon: <Eye /> },
  { label: "Inquiries (Leads)", value: 768, icon: <MessageSquare /> },
  { label: "Expired/Unlisted", value: 89, icon: <X /> },
  { label: "Out-of-Stock Dealers", value: 12, icon: <Package /> },
];

const VehicleListingSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryItems.map((item, idx) => (
        <div
          key={idx}
          className="bg-[var(--bg)] rounded-2xl p-6 shadow-md flex flex-col items-start hover:shadow-lg transition-shadow duration-300 border border-[var(--border)]"
        >
          <div className="text-4xl text-[var(--accent)] mb-4">{item.icon}</div>
          <p className="text-sm text-[var(--text-muted)] mb-1">{item.label}</p>
          <h3 className="text-2xl font-semibold text-[var(--text)]">
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default VehicleListingSummaryCards;