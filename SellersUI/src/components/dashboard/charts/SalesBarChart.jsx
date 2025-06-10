// charts/SalesBarChart.js
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

const SalesBarChart = ({ data }) => {
  const barColors = [
    '#3b82f6', // blue-500
    '#ef4444', // red-500
    '#10b981', // green-500
    '#f59e0b', // yellow-500
    '#8b5cf6', // purple-500
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="category" stroke="var(--text-muted)" />
        <YAxis stroke="var(--text-muted)" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '8px',
          }}
          labelStyle={{ color: 'var(--text)' }}
          itemStyle={{ color: 'var(--text)' }}
          cursor={false} // Disable the cursor/hover effect
        />
        <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesBarChart;