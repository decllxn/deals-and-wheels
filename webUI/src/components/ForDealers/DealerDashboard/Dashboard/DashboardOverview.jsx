// src/pages/dealer-dashboard/DashboardOverview.jsx
import React from "react";
import StatCard from "./components/StatCard";

export default function DashboardOverview({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-6">
      <StatCard title="Active Listings" value={data.active_listings} />
      <StatCard title="Sold Today" value={data.sold_today} />
      <StatCard title="New Today" value={data.new_today} />
      <StatCard title="Health Score" value={data.health_score} suffix="%" />
      <StatCard title="Sell Through" value={data.sell_through} suffix="%" />
    </div>
  );
}