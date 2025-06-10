import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", engagement: 60 },
  { day: "Tue", engagement: 65 },
  { day: "Wed", engagement: 70 },
  { day: "Thu", engagement: 72 },
  { day: "Fri", engagement: 78 },
  { day: "Sat", engagement: 75 },
  { day: "Sun", engagement: 80 },
];

const EngagementAreaChart = () => (
  <div className="bg-[--bg-secondary] rounded-2xl shadow p-6">
    <h3 className="text-lg font-semibold text-[--text] mb-4">Engagement Trend</h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="day" stroke="var(--text-muted)" />
        <YAxis stroke="var(--text-muted)" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="engagement"
          stroke="#6366f1"
          fillOpacity={1}
          fill="url(#colorEngagement)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default EngagementAreaChart;