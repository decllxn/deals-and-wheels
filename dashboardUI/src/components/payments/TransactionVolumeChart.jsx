import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Mon", volume: 200, value: 12000 },
  { date: "Tue", volume: 300, value: 18000 },
  { date: "Wed", volume: 250, value: 16000 },
  { date: "Thu", volume: 400, value: 22000 },
  { date: "Fri", volume: 380, value: 21000 },
  { date: "Sat", volume: 420, value: 25000 },
  { date: "Sun", volume: 390, value: 23000 },
];

export default function TransactionVolumeChart() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">
        📊 Transaction Volume Trends
      </h2>
      <div className="h-72">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Volume"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              strokeWidth={2}
              name="Value ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}