import React, { useState } from "react";

const mockTransactions = [
  {
    user: "John Doe",
    amount: "$200",
    status: "Success",
    method: "Visa",
    time: "Apr 14, 2025 • 11:23 AM",
    reference: "#TXN-1021",
  },
  {
    user: "Jane Kimani",
    amount: "$540",
    status: "Failed",
    method: "M-Pesa",
    time: "Apr 14, 2025 • 10:45 AM",
    reference: "#TXN-1020",
  },
  // More mock data...
];

export default function RecentTransactionsTable() {
  const [search, setSearch] = useState("");

  const filtered = mockTransactions.filter((txn) =>
    txn.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[var(--bg)] p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[var(--text)]">📋 Recent Transactions</h2>
        <input
          type="text"
          placeholder="Search by user"
          className="bg-[var(--bg-secondary)] border border-[var(--border)] px-3 py-1 rounded text-[var(--text)]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-[var(--text-muted)] border-b border-[var(--border)]">
              <th className="py-2">User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Method</th>
              <th>Time</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((txn, index) => (
              <tr key={index} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition">
                <td className="py-2 font-medium text-[var(--text)]">{txn.user}</td>
                <td>{txn.amount}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      txn.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td>{txn.method}</td>
                <td>{txn.time}</td>
                <td className="text-[var(--accent)]">{txn.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}