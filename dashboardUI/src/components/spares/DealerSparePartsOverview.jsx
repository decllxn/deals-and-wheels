import React from "react";
import { Users, UserCheck, UserPlus, UserX, AlertOctagon, TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  { label: "Total Dealers", value: 120, icon: Users, color: "text-blue-500" },
  { label: "Active Dealers", value: 95, icon: UserCheck, color: "text-green-500" },
  { label: "High-Conversion Dealers", value: 28, icon: TrendingUp, color: "text-emerald-500" },
  { label: "Inactive Dealers", value: 12, icon: UserX, color: "text-yellow-500" },
  { label: "Docs Missing", value: 5, icon: AlertOctagon, color: "text-red-500" },
];

const DealerSparePartsOverviewModernShadow = () => (
  <div className="rounded-2xl shadow-sm p-6 flex flex-col">
    <h2 className="text-lg font-semibold text-[--text] mb-4">
      <Users className="text-[--accent] mr-2" size={20} /> Dealer Performance
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="p-4 rounded-lg text-[--text] flex items-center space-x-3 shadow-inner"
        >
          <div className={`p-2 rounded-md bg-opacity-10 ${item.color}`}>
            <item.icon size={20} className={item.color} />
          </div>
          <div>
            <p className="text-sm text-[--text-muted]">{item.label}</p>
            <p className="text-lg font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DealerSparePartsOverviewModernShadow;