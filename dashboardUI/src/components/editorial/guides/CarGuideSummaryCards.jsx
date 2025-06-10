import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layout, // For total guides
  MessageSquare, // For comments/discussions
  Eye,       // For total views
  Share2,    // For total shares
  ThumbsUp,  // For total likes/upvotes
  Clock,     // For average time spent
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  BookOpen, // For Guides Read
  Percent, // For conversion rate
} from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const guideSummaryData = [
  {
    label: "Published Guides",
    value: 85,
    icon: Layout,
    change: "+1.5%",
    trend: "up",
    gradient: "from-teal-500 to-teal-600",
    data: [2, 3, 2, 4, 5, 4],
  },
    {
    label: "Most Popular Guide",
    value: "Top 10 SUVs for Families",
    icon: BookOpen,
    change: "+6.3%",
    trend: "up",
    gradient: "from-yellow-500 to-yellow-600",
    data: [500, 550, 600, 650, 700, 750],
  },
  {
    label: "Avg. Time Spent",
    value: "7m 30s",
    icon: Clock,
    change: "+2.2%",
    trend: "up",
    gradient: "from-indigo-500 to-indigo-600",
    data: [7.1, 7.2, 7.3, 7.4, 7.5, 7.6],
  },
  {
    label: "Total Discussions",
    value: 892,
    icon: MessageSquare,
    change: "+4.8%",
    trend: "up",
    gradient: "from-blue-500 to-blue-600",
    data: [150, 170, 190, 210, 230, 240],
  },
  {
    label: "Total Views",
    value: "42,580",
    icon: Eye,
    change: "+9.1%",
    trend: "up",
    gradient: "from-purple-500 to-purple-600",
    data: [5000, 5500, 6000, 6500, 7000, 7500],
  },
  {
    label: "Total Shares",
    value: 630,
    icon: Share2,
    change: "+4.3%",
    trend: "up",
    gradient: "from-pink-500 to-rose-600",
    data: [80, 90, 100, 110, 120, 130],
  },
  {
    label: "Total Upvotes",
    value: 1480,
    icon: ThumbsUp,
    change: "+5.7%",
    trend: "up",
    gradient: "from-lime-500 to-lime-600",
    data: [200, 220, 240, 260, 280, 300],
  },
    {
    label: "Guides Read",
    value: "35,200",
    icon: BookOpen,
    change: "+8.0%",
    trend: "up",
    gradient: "from-orange-500 to-orange-600",
    data: [4000, 4300, 4600, 4900, 5200, 5500],
  },
  {
    label: "Conversion Rate",
    value: "2.5%",
    icon: Percent,
    change: "-0.3%",
    trend: "down",
    gradient: "from-red-500 to-red-600",
    data: [2.8, 2.7, 2.6, 2.55, 2.5, 2.45],
  },
];

const CarGuideSummaryCards = () => {
  const [selectedRange, setSelectedRange] = useState("Month");

  return (
    <div className="w-full flex flex-col gap-6 mb-8">
      <div className="flex flex-wrap items-center justify-between p-4 bg-[--bg-secondary] rounded-lg shadow">
        <h2 className="text-xl font-bold text-[--text]">Car Guide Overview</h2>
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
        {guideSummaryData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[--bg-secondary] text-[--text] rounded-lg p-6 shadow flex flex-col justify-between min-h-[170px]"
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

export default CarGuideSummaryCards;