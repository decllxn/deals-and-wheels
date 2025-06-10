import React from "react";

const dealers = [
  {
    name: "AutoWorld Ltd",
    listings: 120,
    mediaRate: "95%",
    lastUpdated: "2 days ago",
    avgDuration: "14 days",
  },
  {
    name: "SpareZone",
    listings: 73,
    mediaRate: "88%",
    lastUpdated: "5 days ago",
    avgDuration: "18 days",
  },
  {
    name: "MotoLink",
    listings: 103,
    mediaRate: "92%",
    lastUpdated: "1 day ago",
    avgDuration: "13 days",
  },
];

export default function DealerInventoryTable() {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl shadow-md p-6 overflow-x-auto">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">👥 Dealer Inventory Overview</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-[var(--border)]">
            <th className="py-2 pr-4">Dealer</th>
            <th className="py-2 pr-4">Listings</th>
            <th className="py-2 pr-4">% With Media</th>
            <th className="py-2 pr-4">Last Updated</th>
            <th className="py-2">Avg. Duration</th>
          </tr>
        </thead>
        <tbody>
          {dealers.map((dealer, index) => (
            <tr key={index} className="border-b border-[var(--border)] hover:bg-[var(--bg-hover)]">
              <td className="py-2 pr-4">{dealer.name}</td>
              <td className="py-2 pr-4 font-medium">{dealer.listings}</td>
              <td className="py-2 pr-4">{dealer.mediaRate}</td>
              <td className="py-2 pr-4">{dealer.lastUpdated}</td>
              <td className="py-2">{dealer.avgDuration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}