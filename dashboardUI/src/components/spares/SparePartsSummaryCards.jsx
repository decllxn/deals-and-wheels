import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package2,
  PlusCircle,
  XCircle,
  Tag,
  Eye,
  MessageSquare,
  Clock,
  TrendingDown,
  TrendingUp,
  ArrowRightLeft,
} from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const summaryData = [
  {
    label: "Total Listings",
    value: 1240,
    icon: Package2,
    change: "+3.8%",
    trend: "up",
    gradient: "from-indigo-500 to-indigo-600",
    data: [5, 6, 7, 10, 9, 12],
  },
  {
    label: "New This Week",
    value: 85,
    icon: PlusCircle,
    change: "+5.4%",
    trend: "up",
    gradient: "from-green-500 to-green-600",
    data: [2, 3, 4, 6, 5, 8],
  },
  {
    label: "Out-of-Stock / Removed",
    value: 40,
    icon: XCircle,
    change: "-2.1%",
    trend: "down",
    gradient: "from-red-500 to-red-600",
    data: [8, 6, 5, 4, 4, 3],
  },
  {
    label: "Avg. Price/Category",
    value: "$145",
    icon: Tag,
    change: "+1.2%",
    trend: "up",
    gradient: "from-blue-500 to-blue-600",
    data: [140, 142, 144, 145, 146, 145],
  },
  {
    label: "Total Views",
    value: "18,340",
    icon: Eye,
    change: "+9.8%",
    trend: "up",
    gradient: "from-yellow-500 to-yellow-600",
    data: [1500, 1800, 1700, 2000, 2100, 2200],
  },
  {
    label: "Total Inquiries",
    value: 310,
    icon: MessageSquare,
    change: "+6.2%",
    trend: "up",
    gradient: "from-purple-500 to-purple-600",
    data: [20, 25, 30, 33, 35, 40],
  },
  {
    label: "Recently Updated",
    value: 62,
    icon: Clock,
    change: "-1.7%",
    trend: "down",
    gradient: "from-pink-500 to-pink-600",
    data: [12, 14, 13, 12, 11, 10],
  },
];

const SparePartsSummaryCardsModern = () => {
  const [selectedRange, setSelectedRange] = useState("Month");

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between p-4 bg-[--bg-secondary] rounded-2xl shadow">
        <h2 className="text-xl font-bold text-[--text]">Spare Parts Overview</h2>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="bg-[--bg] text-[--text] border border-[--border] rounded px-4 py-2 focus:outline-none"
        >
          <option>Today</option>
          <option>Week</option>
          <option>Month</option>
          <option>Custom</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {summaryData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[--bg-secondary] text-[--text] rounded-2xl p-6 shadow flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl text-white bg-gradient-to-r ${item.gradient}`}>
                <item.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[--text-muted]">{item.label}</div>
                <div className="text-2xl font-semibold">{item.value}</div>
              </div>
            </div>

            <div className="mt-4">
              <Sparklines data={item.data} width={100} height={30}>
                <SparklinesLine
                  color={
                    item.trend === "up"
                      ? "#22c55e"
                      : item.trend === "down"
                      ? "#ef4444"
                      : "#a1a1aa"
                  }
                  style={{ fill: "none", strokeWidth: 2 }}
                />
              </Sparklines>
              <div className="text-xs text-[--text-muted] mt-2">{selectedRange} to Date</div>
              <div className="flex items-center justify-end">
                {item.trend === "up" ? (
                  <TrendingUp size={16} className="text-green-500 mr-1" />
                ) : item.trend === "down" ? (
                  <TrendingDown size={16} className="text-red-500 mr-1" />
                ) : (
                  <ArrowRightLeft size={16} className="text-gray-400 mr-1" />
                )}
                <span
                  className={`text-sm ${
                    item.trend === "up"
                      ? "text-green-500"
                      : item.trend === "down"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SparePartsSummaryCardsModern;