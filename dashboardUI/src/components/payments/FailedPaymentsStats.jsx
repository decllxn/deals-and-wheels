import React from "react";

const failureStats = [
  { reason: "Insufficient Funds", count: 58 },
  { reason: "Card Expired", count: 33 },
  { reason: "Network Error", count: 20 },
  { reason: "Account Flagged", count: 11 },
];

export default function FailedPaymentsStats() {
  return (
    <div className="bg-[var(--bg)] p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">❗ Failed Payment Insights</h2>
      <ul className="space-y-3">
        {failureStats.map((item, index) => (
          <li key={index} className="flex justify-between text-[var(--text)]">
            <span>{item.reason}</span>
            <span className="font-bold text-[var(--accent)]">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
