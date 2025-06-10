import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { date: "Mon", views: 3200 },
  { date: "Tue", views: 4500 },
  { date: "Wed", views: 4000 },
  { date: "Thu", views: 5200 },
  { date: "Fri", views: 6100 },
  { date: "Sat", views: 4800 },
  { date: "Sun", views: 5300 },
];

const ViewsLineChart = () => (
  <div className="bg-[--bg-secondary] rounded-2xl shadow p-6">
    <h3 className="text-lg font-semibold text-[--text] mb-4">Views Over Time</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="date" stroke="var(--text-muted)" />
        <YAxis stroke="var(--text-muted)" />
        <Tooltip />
        <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ViewsLineChart;