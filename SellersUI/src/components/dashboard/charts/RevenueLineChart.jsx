// charts/RevenueLineChart.js
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const RevenueLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--bg-secondary)] p-2 rounded shadow-md border border-[var(--border)]">
          <p className="label">{`Month: ${label}`}</p>
          <p className="text-green-500">{`Revenue: $${payload[0].value.toLocaleString()}`}</p>
          <p className="text-red-500">{`Expenses: $${payload[1].value.toLocaleString()}`}</p>
          <p className="text-blue-500">{`Profit: $${payload[2].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--text-muted)" />
        <YAxis stroke="var(--text-muted)" tickFormatter={(value) => `$${value.toLocaleString()}`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ padding: 10 }} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--accent)"
          strokeWidth={2}
          name="Revenue"
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#ef4444" // Red for expenses
          strokeWidth={2}
          name="Expenses"
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#3b82f6" // Blue for profit
          strokeWidth={2}
          name="Profit"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueLineChart;