import React from "react";

const dealers = [
  {
    name: "AutoHub Kenya",
    listings: 120,
    flagged: false,
    responseTime: "1h 12m",
    conversionRate: "24%",
  },
  {
    name: "Jiji Motors",
    listings: 83,
    flagged: true,
    responseTime: "5h 48m",
    conversionRate: "14%",
  },
  {
    name: "Prime Auto Parts",
    listings: 61,
    flagged: false,
    responseTime: "2h 33m",
    conversionRate: "32%",
  },
];

export default function DealerPerformancePanel() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">💼 Dealer Performance</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-[var(--text-muted)] border-b border-[var(--border)]">
            <tr>
              <th className="py-2">Dealer</th>
              <th className="py-2">Listings</th>
              <th className="py-2">Response Time</th>
              <th className="py-2">Conversion Rate</th>
              <th className="py-2">Flag</th>
            </tr>
          </thead>
          <tbody className="text-[var(--text)]">
            {dealers.map((dealer, index) => (
              <tr key={index} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition">
                <td className="py-2 font-medium">{dealer.name}</td>
                <td className="py-2">{dealer.listings}</td>
                <td className="py-2">{dealer.responseTime}</td>
                <td className="py-2">{dealer.conversionRate}</td>
                <td className="py-2">{dealer.flagged ? "🚩" : "✅"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}