// src/pages/dealer-dashboard/DashboardHeader.jsx
import React from "react";

export default function DashboardHeader({ dealer }) {
  return (
    <div className="flex items-center gap-4">
      {dealer.logo && (
        <img
          src={dealer.logo}
          alt="Dealer Logo"
          className="w-16 h-16 rounded"
        />
      )}
      <div>
        <h1 className="text-2xl font-bold">{dealer.company_name}</h1>
        <p className="text-gray-500">{dealer.user_email}</p>
      </div>
    </div>
  );
}