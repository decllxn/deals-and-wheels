import React from "react";
import { FaCar, FaChartLine, FaWallet } from "react-icons/fa";

const DashboardHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <StatCard
        icon={<FaCar className="text-blue-500" />}
        title="Active Listings"
        value="15"
        description="View your active car listings"
      />
      <StatCard
        icon={<FaChartLine className="text-green-500" />}
        title="Bids Received"
        value="120"
        description="Total number of bids received"
      />
      <StatCard
        icon={<FaWallet className="text-yellow-500" />}
        title="Earnings"
        value="Ksh 250,000"
        description="Total earnings from sales"
      />
    </div>
  );
};

const StatCard = ({ icon, title, value, description }) => (
  <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <span className="text-4xl mr-4">{icon}</span>
      <div>
        <h4 className="text-gray-500">{title}</h4>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default DashboardHome;