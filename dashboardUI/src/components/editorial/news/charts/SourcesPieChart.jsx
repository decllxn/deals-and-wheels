import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { source: "Homepage", value: 40 },
  { source: "Social", value: 25 },
  { source: "Search", value: 20 },
  { source: "Email", value: 10 },
  { source: "Referral", value: 5 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

const SourcesPieChart = () => (
  <div className="bg-[--bg-secondary] rounded-2xl shadow p-6">
    <h3 className="text-lg font-semibold text-[--text] mb-4">Traffic Sources</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="source"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default SourcesPieChart;