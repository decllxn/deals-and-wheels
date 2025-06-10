import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Mobile Money", value: 5200 },
  { name: "Credit/Debit Cards", value: 3400 },
  { name: "Bank Transfers", value: 1800 },
  { name: "Wallets", value: 600 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

export default function PaymentMethodBreakdownChart() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">
        💳 Payment Method Breakdown
      </h2>
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}