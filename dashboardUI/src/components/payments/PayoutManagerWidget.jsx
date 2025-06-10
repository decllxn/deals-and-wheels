import React, { useState } from "react";

const payouts = [
  { id: 1, amount: "$15,000", status: "Pending", date: "2025-04-10", reference: "P-20250410" },
  { id: 2, amount: "$20,000", status: "Completed", date: "2025-04-08", reference: "P-20250408" },
  { id: 3, amount: "$12,000", status: "Failed", date: "2025-04-07", reference: "P-20250407" },
  { id: 4, amount: "$18,500", status: "Pending", date: "2025-04-06", reference: "P-20250406" },
];

export default function PayoutManagerWidget() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPayouts = statusFilter === "All" ? payouts : payouts.filter(payout => payout.status === statusFilter);

  return (
    <div className="bg-[var(--bg)] p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">💰 Payout Manager</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="status" className="text-[var(--text-muted)]">Filter by Status:</label>
          <select
            id="status"
            className="bg-[var(--bg-secondary)] text-[var(--text)] rounded px-4 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <button className="bg-[var(--accent)] text-white px-4 py-2 rounded hover:opacity-90 transition text-sm">
          + Initiate Payout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Reference</th>
              <th className="py-2 text-left">Amount</th>
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayouts.map((payout) => (
              <tr key={payout.id} className="border-b">
                <td className="py-2">{payout.reference}</td>
                <td className="py-2">{payout.amount}</td>
                <td className="py-2">{payout.date}</td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      payout.status === "Pending" ? "bg-yellow-500" :
                      payout.status === "Completed" ? "bg-green-500" :
                      payout.status === "Failed" ? "bg-red-500" : "bg-gray-500"
                    }`}
                  >
                    {payout.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}