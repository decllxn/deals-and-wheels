import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layout,
  MessageSquare,
  Eye,
  Share2,
  ThumbsUp,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Flame
} from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const blogSummaryData = [
  {
    label: "Published Posts",
    value: 158,
    icon: Layout,
    change: "+2.1%",
    trend: "up",
    gradient: "from-teal-500 to-teal-600",
    data: [3, 4, 3, 5, 6, 5],
  },
  {
    label: "Most Popular Post",
    value: "The Ultimate Guide to...",
    icon: Flame, // Reusing Flame icon for popularity
    change: "+8.5%",
    trend: "up",
    gradient: "from-yellow-500 to-yellow-600",
    data: [800, 900, 1050, 1100, 1200, 1350],
  },
  {
    label: "Avg. Reading Time",
    value: "5m 12s",
    icon: Clock,
    change: "+1.8%",
    trend: "up",
    gradient: "from-indigo-500 to-indigo-600",
    data: [4.8, 4.9, 5.0, 5.1, 5.2, 5.3],
  },
  {
    label: "Total Comments",
    value: 1245,
    icon: MessageSquare,
    change: "+3.7%",
    trend: "up",
    gradient: "from-blue-500 to-blue-600",
    data: [200, 220, 250, 280, 300, 320],
  },
  {
    label: "Total Views",
    value: "65,320",
    icon: Eye,
    change: "+7.9%",
    trend: "up",
    gradient: "from-purple-500 to-purple-600",
    data: [8000, 9000, 9500, 10000, 10500, 11000],
  },
  {
    label: "Total Shares",
    value: 872,
    icon: Share2,
    change: "+5.1%",
    trend: "up",
    gradient: "from-pink-500 to-rose-600",
    data: [100, 110, 120, 130, 140, 150],
  },
  {
    label: "Total Likes",
    value: 1950,
    icon: ThumbsUp,
    change: "+6.2%",
    trend: "up",
    gradient: "from-lime-500 to-lime-600",
    data: [250, 280, 300, 320, 350, 380],
  },
  // You can add more relevant metrics for blogs
];

const BlogsSummaryCards = () => {
  const [selectedRange, setSelectedRange] = useState("Month");

  return (
    <div className="w-full flex flex-col gap-6 mb-8">
      <div className="flex flex-wrap items-center justify-between p-4 bg-[--bg-secondary] rounded-lg shadow">
        <h2 className="text-xl font-bold text-[--text]">Blog Overview</h2>
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
        {blogSummaryData.map((item, idx) => (
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

export default BlogsSummaryCards;