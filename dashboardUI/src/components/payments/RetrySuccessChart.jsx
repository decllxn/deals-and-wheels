import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const retryData = [
  { method: "M-Pesa", successRate: 76 },
  { method: "Visa", successRate: 64 },
  { method: "Bank", successRate: 58 },
];

export default function RetrySuccessChart() {
  return (
    <div className="bg-[var(--bg)] p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">🔄 Retry Success Rates</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={retryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" stroke="var(--text-muted)" />
          <YAxis dataKey="method" type="category" stroke="var(--text-muted)" />
          <Tooltip />
          <Bar dataKey="successRate" fill="var(--accent)" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}