import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", Refunds: 320, Returns: 120 },
  { month: "Feb", Refunds: 280, Returns: 90 },
  { month: "Mar", Refunds: 340, Returns: 150 },
  { month: "Apr", Refunds: 410, Returns: 190 },
];

export default function RefundsReturnsChart() {
  return (
    <div className="bg-[var(--bg)] p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">↩️ Refunds & Returns</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Refunds" stackId="a" fill="#f87171" />
          <Bar dataKey="Returns" stackId="a" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}