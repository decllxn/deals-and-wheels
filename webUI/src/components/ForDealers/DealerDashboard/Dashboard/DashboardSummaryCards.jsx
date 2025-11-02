// src/pages/dealer-dashboard/DashboardSummaryCards.jsx
import React from "react";
import StatCard from "./components/StatCard";

export default function DashboardSummaryCards({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <StatCard title="Total Sold" value={data.total_sold} />
      <StatCard title="Total New" value={data.total_new} />
      <StatCard title="Average Health" value={data.average_health} suffix="%" />
      <StatCard title="Average Sell Through" value={data.average_sell_through} suffix="%" />
    </div>
  );
}