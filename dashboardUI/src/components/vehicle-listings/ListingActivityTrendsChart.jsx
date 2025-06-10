import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartLine } from "lucide-react";

const data = [
  { date: "Mon", new: 50, expired: 5, views: 240 },
  { date: "Tue", new: 65, expired: 6, views: 270 },
  { date: "Wed", new: 45, expired: 3, views: 290 },
  { date: "Thu", new: 72, expired: 7, views: 330 },
  { date: "Fri", new: 90, expired: 10, views: 400 },
];

const ListingActivityTrendsChart = () => (
  <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="text-4xl text-[var(--accent)] mr-4">
        <ChartLine />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          📈 Listing Activity Trends
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Weekly trends for new, expired, and viewed listings.
        </p>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="var(--text-muted)" tick={{ fontSize: 12 }} />
        <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)", padding: "10px", color: "var(--text)" }} />
        <Legend wrapperStyle={{ color: "var(--text-muted)" }}/>
        <Line type="monotone" dataKey="new" stroke="#4CAF50" strokeWidth={2} name="New Listings" />
        <Line type="monotone" dataKey="expired" stroke="#FF5252" strokeWidth={2} name="Expired Listings"/>
        <Line type="monotone" dataKey="views" stroke="#2196F3" strokeWidth={2} name="Views" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ListingActivityTrendsChart;