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
  BookOpen,
  Percent,
  FileText, // For total terms
  Search,    // For total searches
  Users,     //For total contributors
} from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const glossarySummaryData = [
  {
    label: "Total Terms",
    value: 520,
    icon: FileText,
    change: "+2.1%",
    trend: "up",
    gradient: "from-teal-500 to-teal-600",
    data: [500, 505, 510, 512, 515, 520],
  },
  {
    label: "Most Popular Term",
    value: "Term Definition",
    icon: BookOpen,
    change: "+5.8%",
    trend: "up",
    gradient: "from-yellow-500 to-yellow-600",
    data: [450, 480, 500, 520, 540, 560],
  },
  {
    label: "Avg. Time Spent",
    value: "5m 15s",
    icon: Clock,
    change: "+1.7%",
    trend: "up",
    gradient: "from-indigo-500 to-indigo-600",
    data: [5.1, 5.15, 5.2, 5.23, 5.25, 5.28],
  },
  {
    label: "Total Discussions",
    value: 675,
    icon: MessageSquare,
    change: "+3.5%",
    trend: "up",
    gradient: "from-blue-500 to-blue-600",
    data: [100, 110, 120, 130, 140, 145],
  },
  {
    label: "Total Views",
    value: "28,750",
    icon: Eye,
    change: "+7.5%",
    trend: "up",
    gradient: "from-purple-500 to-purple-600",
    data: [3000, 3200, 3400, 3600, 3800, 4000],
  },
  {
    label: "Total Shares",
    value: 480,
    icon: Share2,
    change: "+3.2%",
    trend: "up",
    gradient: "from-pink-500 to-rose-600",
    data: [60, 65, 70, 75, 80, 85],
  },
  {
    label: "Total Upvotes",
    value: 1120,
    icon: ThumbsUp,
    change: "+4.2%",
    trend: "up",
    gradient: "from-lime-500 to-lime-600",
    data: [150, 160, 170, 180, 190, 200],
  },
  {
    label: "Total Searches",
    value: "22,400",
    icon: Search,
    change: "+6.8%",
    trend: "up",
    gradient: "from-orange-500 to-orange-600",
    data: [2500, 2700, 2900, 3100, 3300, 3500],
  },
    {
    label: "Total Contributors",
    value: "25",
    icon: Users,
    change: "-0.8%",
    trend: "down",
    gradient: "from-red-500 to-red-600",
    data: [26, 25.8, 25.6, 25.4, 25.2, 25],
  },
];

const GlossarySummaryCards = () => {
  const [selectedRange, setSelectedRange] = useState("Month");

  return (
    <div className="w-full flex flex-col gap-6 mb-8">
      <div className="flex flex-wrap items-center justify-between p-4 bg-[--bg-secondary] rounded-lg shadow">
        <h2 className="text-xl font-bold text-[--text]">Glossary Overview</h2>
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
        {glossarySummaryData.map((item, idx) => (
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

export default GlossarySummaryCards;