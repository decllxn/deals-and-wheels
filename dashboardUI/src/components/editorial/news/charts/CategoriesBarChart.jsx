import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { category: "EVs", articles: 45 },
  { category: "SUVs", articles: 30 },
  { category: "Hybrids", articles: 28 },
  { category: "Luxury", articles: 20 },
  { category: "Reviews", articles: 35 },
];

const CategoriesBarChart = () => (
  <div className="bg-[--bg-secondary] rounded-2xl shadow p-6">
    <h3 className="text-lg font-semibold text-[--text] mb-4">Articles per Category</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="category" stroke="var(--text-muted)" />
        <YAxis stroke="var(--text-muted)" />
        <Tooltip />
        <Bar dataKey="articles" fill="#10b981" barSize={40} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CategoriesBarChart;