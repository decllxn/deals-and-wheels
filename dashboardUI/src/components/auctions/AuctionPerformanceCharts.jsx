import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { date: "Apr 01", listings: 12, bids: 48 },
  { date: "Apr 02", listings: 18, bids: 64 },
  { date: "Apr 03", listings: 14, bids: 52 },
  { date: "Apr 04", listings: 20, bids: 71 },
  { date: "Apr 05", listings: 17, bids: 63 },
  { date: "Apr 06", listings: 22, bids: 88 },
  { date: "Apr 07", listings: 19, bids: 75 },
];

export default function AuctionPerformanceCharts() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">📊 Auction Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip
            contentStyle={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
            labelStyle={{ color: "var(--text-muted)" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="listings"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Listings"
          />
          <Line
            type="monotone"
            dataKey="bids"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Bids"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}