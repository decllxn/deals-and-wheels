// src/pages/dealer-dashboard/components/StatCard.jsx
import React from "react";

export default function StatCard({ title, value, suffix = "" }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center justify-center">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-xl font-bold mt-2">
        {value}
        {suffix}
      </p>
    </div>
  );
}