import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { date: "Mon", new: 23, removed: 5, stocked: 18 },
  { date: "Tue", new: 31, removed: 8, stocked: 25 },
  { date: "Wed", new: 26, removed: 4, stocked: 22 },
  { date: "Thu", new: 34, removed: 6, stocked: 28 },
  { date: "Fri", new: 29, removed: 7, stocked: 22 },
  { date: "Sat", new: 40, removed: 9, stocked: 31 },
  { date: "Sun", new: 37, removed: 5, stocked: 32 },
];

export default function ListingTrendsChart() {
  return (
    <div className="bg-[var(--bg-secondary)] p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">📈 Inventory Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="new" stroke="#4ade80" strokeWidth={2} name="New Listings" />
          <Line type="monotone" dataKey="removed" stroke="#f87171" strokeWidth={2} name="Removed Listings" />
          <Line type="monotone" dataKey="stocked" stroke="#60a5fa" strokeWidth={2} name="Stocked Listings" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}