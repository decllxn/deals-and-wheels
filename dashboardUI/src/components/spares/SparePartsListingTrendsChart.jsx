import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { date: "Mon", new: 20, removed: 5, views: 320 },
  { date: "Tue", new: 30, removed: 4, views: 400 },
  { date: "Wed", new: 28, removed: 3, views: 380 },
  { date: "Thu", new: 35, removed: 6, views: 420 },
  { date: "Fri", new: 32, removed: 2, views: 450 },
];

const SparePartsListingTrendsChartModernBlended = () => (
  <div className="bg-[--bg] rounded-2xl shadow-md p-5 flex flex-col">
    <div className="flex items-center mb-4">
      <h2 className="text-lg font-semibold text-[--text]">Listing Trends</h2>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={{ stroke: "var(--border)" }}
          tick={{ fill: "var(--text-muted)", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={{ stroke: "var(--border)" }}
          tick={{ fill: "var(--text-muted)", fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "var(--bg-secondary)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6 }}
          itemStyle={{ color: "var(--text)" }}
        />
        <Legend wrapperStyle={{ paddingTop: 20 }} />
        <Line type="monotone" dataKey="new" stroke="#34d399" strokeWidth={2} name="New Listings" dot={false} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="removed" stroke="#f87171" strokeWidth={2} name="Removed Listings" dot={false} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="views" stroke="#60a5fa" strokeWidth={2} name="Views" dot={false} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default SparePartsListingTrendsChartModernBlended;