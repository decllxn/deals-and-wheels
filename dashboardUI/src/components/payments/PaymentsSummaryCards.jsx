import React from "react";

// Sample static data – in a real app, this would come from your backend/API
const paymentStats = [
  {
    id: 1,
    label: "Total Revenue",
    value: "$1,200,000",
    icon: "💰",
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: 2,
    label: "Total Transactions",
    value: "12,345",
    icon: "🧾",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: 3,
    label: "Successful Payments",
    value: "11,900",
    icon: "🛍️",
    color: "bg-teal-500/10 text-teal-500",
  },
  {
    id: 4,
    label: "Failed Payments",
    value: "445",
    icon: "❗",
    color: "bg-red-500/10 text-red-500",
  },
  {
    id: 5,
    label: "Pending Payouts",
    value: "$24,300",
    icon: "🔄",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    id: 6,
    label: "Refunded Amounts",
    value: "$3,200",
    icon: "💳",
    color: "bg-purple-500/10 text-purple-500",
  },
];

export default function PaymentsSummaryCards() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {paymentStats.map((stat) => (
        <div
          key={stat.id}
          className="bg-[var(--bg)] rounded-2xl p-4 shadow-sm border border-[var(--border)] hover:shadow-md transition"
        >
          <div className="flex items-center space-x-3">
            <div className={`text-2xl p-2 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
              <h3 className="text-lg font-semibold text-[var(--text)]">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}