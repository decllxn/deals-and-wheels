import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const pricingData = [
  { category: "Engine", avgPrice: 120 },
  { category: "Suspension", avgPrice: 80 },
  { category: "Electrical", avgPrice: 95 },
  { category: "Body", avgPrice: 110 },
];

const SparePartsPricingAnalyticsChart = () => (
  <div className="bg-[--bg-secondary] p-6 rounded-2xl shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-[--text]">💰 Pricing Analytics</h2>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={pricingData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis unit="$" />
        <Tooltip />
        <Area type="monotone" dataKey="avgPrice" stroke="#34d399" fill="#bbf7d0" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default SparePartsPricingAnalyticsChart;