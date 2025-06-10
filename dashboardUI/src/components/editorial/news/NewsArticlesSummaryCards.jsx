import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Clock,
  Flame,
  MessageSquare,
  Eye,
  BarChart,
  ArrowRightLeft,
} from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const newsSummaryData = [
  {
    label: "Published Articles",
    value: 326,
    icon: Newspaper,
    change: "+4.2%",
    trend: "up",
    gradient: "from-indigo-500 to-indigo-600",
    data: [5, 7, 6, 8, 9, 10],
  },
  {
    label: "Top Performing Story",
    value: "EVs Overtake SUVs",
    icon: Flame,
    change: "+12.7%",
    trend: "up",
    gradient: "from-orange-500 to-red-600",
    data: [1200, 1400, 1600, 1800, 2000, 2200],
  },
  {
    label: "Avg. Read Time",
    value: "3m 48s",
    icon: Clock,
    change: "+2.9%",
    trend: "up",
    gradient: "from-purple-500 to-purple-600",
    data: [3.2, 3.3, 3.5, 3.6, 3.7, 3.8],
  },
  {
    label: "Comments Received",
    value: 468,
    icon: MessageSquare,
    change: "-1.3%",
    trend: "down",
    gradient: "from-pink-500 to-pink-600",
    data: [100, 90, 85, 70, 65, 60],
  },
  {
    label: "Total Views",
    value: "32,480",
    icon: Eye,
    change: "+8.1%",
    trend: "up",
    gradient: "from-blue-500 to-blue-600",
    data: [4000, 4500, 4800, 5000, 5200, 5400],
  },
  {
    label: "Engagement Score",
    value: "78%",
    icon: BarChart,
    change: "+6.5%",
    trend: "up",
    gradient: "from-green-500 to-emerald-600",
    data: [65, 68, 72, 74, 76, 78],
  },
];

const NewsArticlesSummaryCards = () => {
  const [selectedRange, setSelectedRange] = useState("Month");

  return (
    <div className="w-full flex flex-col gap-6 mb-8">
      <div className="flex flex-wrap items-center justify-between p-4 bg-[--bg-secondary] rounded-2xl shadow">
        <h2 className="text-xl font-bold text-[--text]">News Articles Overview</h2>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="bg-[--bg] text-[--text] border border-[--border] rounded px-4 py-2 mt-2 sm:mt-0 focus:outline-none"
        >
          <option>Today</option>
          <option>Week</option>
          <option>Month</option>
          <option>Custom</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {newsSummaryData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[--bg-secondary] text-[--text] rounded-2xl p-6 shadow flex flex-col justify-between min-h-[170px]"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl text-white bg-gradient-to-r ${item.gradient}`}>
                <item.icon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[--text-muted] truncate">{item.label}</div>
                <div className="text-2xl font-semibold break-words truncate">{item.value}</div>
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

export default NewsArticlesSummaryCards;