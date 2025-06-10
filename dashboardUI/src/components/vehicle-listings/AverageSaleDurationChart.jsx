import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Clock } from "lucide-react";

const data = [
  { category: "SUV", avgDays: 30 },
  { category: "Sedan", avgDays: 25 },
  { category: "Truck", avgDays: 40 },
  { category: "Coupe", avgDays: 35 },
];

const AverageSaleDurationChart = () => (
  <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="text-4xl text-[var(--accent)] mr-4">
        <Clock />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          📆 Time to Sell Analysis
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Average duration (in days) to sell vehicles by category.
        </p>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="category" tick={{ fontSize: 12, fill: "var(--text-muted)" }} />
        <YAxis tick={{ fontSize: 12, fill: "var(--text-muted)" }} />
        <Tooltip contentStyle={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)", padding: "10px", color: "var(--text)" }} />
        <Bar dataKey="avgDays" fill="var(--accent)" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default AverageSaleDurationChart;