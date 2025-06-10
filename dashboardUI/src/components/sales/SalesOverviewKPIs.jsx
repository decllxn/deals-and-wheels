// SalesOverviewKPIs.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Package, Truck, Clock, XCircle, DollarSign } from "lucide-react";

const kpis = [
  {
    label: "Total Orders",
    value: 1289,
    icon: Package,
    color: "bg-blue-500",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    label: "Total Revenue",
    value: "$348,920",
    icon: DollarSign,
    color: "bg-green-500",
    gradient: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    label: "Refunds",
    value: 37,
    icon: XCircle,
    color: "bg-red-500",
    gradient: "bg-gradient-to-r from-red-500 to-red-600",
  },
  {
    label: "Pending Deliveries",
    value: 53,
    icon: Truck,
    color: "bg-yellow-500",
    gradient: "bg-gradient-to-r from-yellow-500 to-yellow-600",
  },
  {
    label: "Avg. Fulfillment Time",
    value: "3.4 days",
    icon: Clock,
    color: "bg-purple-500",
    gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
  {
    label: "Sales Growth",
    value: "+12.7%",
    icon: TrendingUp,
    color: "bg-emerald-500",
    gradient: "bg-gradient-to-r from-emerald-500 to-emerald-600",
  },
];

export default function SalesOverviewKPIs() {
  const [selectedRange, setSelectedRange] = useState("Month");

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-2xl shadow">
        <h2 className="text-xl font-bold text-[var(--text)]">Sales Overview</h2>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] rounded px-4 py-2 focus:outline-none"
        >
          <option>Today</option>
          <option>Week</option>
          <option>Month</option>
          <option>Custom</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[var(--bg-secondary)] text-[var(--text)] rounded-2xl p-6 shadow flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl text-white ${kpi.gradient}`}>
                <kpi.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[var(--text-muted)]">{kpi.label}</div>
                <div className="text-2xl font-semibold">{kpi.value}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-[var(--text-muted)]">
                {selectedRange} to Date
              </div>
              <div className="flex items-center justify-end">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-sm text-green-500">+5.2%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}