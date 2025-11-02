// src/pages/dealer-dashboard/DashboardLeaderboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp } from "lucide-react";

export default function DashboardLeaderboard({ data = [] }) {
  if (!data.length)
    return (
      <p
        className="text-center py-6 text-sm italic"
        style={{ color: "var(--muted-text)" }}
      >
        No leaderboard data available yet.
      </p>
    );

  return (
    <div
      className="p-6 rounded-2xl shadow-md border transition-all duration-300"
      style={{
        backgroundColor: "var(--surface-color)",
        borderColor: "var(--border-color)",
        boxShadow: "0 4px 20px var(--shadow-color, rgba(0,0,0,0.05))",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-2xl font-semibold flex items-center gap-2"
          style={{ color: "var(--text-color)" }}
        >
          <Trophy
            size={24}
            style={{
              color: "var(--accent-color)",
              filter: "drop-shadow(0 0 6px var(--highlight-color))",
            }}
          />
          Leaderboard
        </h2>
        <span
          className="text-sm font-medium px-3 py-1 rounded-full"
          style={{
            backgroundColor: "var(--highlight-color)",
            color: "var(--bg-color)",
          }}
        >
          Top Dealers
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full border-collapse">
          <thead>
            <tr
              style={{
                backgroundColor: "var(--bg-color)",
                borderBottom: `1px solid var(--border-color)`,
              }}
            >
              {["Rank", "Dealer", "Avg Health", "Avg Sell-Through", "Total Sold"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide"
                    style={{ color: "var(--muted-text)" }}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((d, index) => {
              const rankColors = [
                "var(--accent-color)",
                "var(--highlight-color)",
                "var(--muted-text)",
              ];
              const rankBadge =
                index < 3 ? (
                  <Star
                    size={18}
                    style={{
                      color: rankColors[index],
                      filter: "drop-shadow(0 0 5px var(--highlight-color))",
                    }}
                  />
                ) : (
                  <span style={{ color: "var(--muted-text)" }}>#{index + 1}</span>
                );

              return (
                <motion.tr
                  key={d.dealer_id}
                  whileHover={{
                    backgroundColor: "var(--highlight-color)",
                    color: "var(--bg-color)",
                    scale: 1.01,
                  }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer border-b last:border-0"
                  style={{
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--surface-color)",
                  }}
                >
                  <td className="px-4 py-3 font-medium flex items-center gap-2">
                    {rankBadge}
                    {d.dealer_name}
                  </td>
                  <td className="px-4 py-3 text-center font-mono">
                    {(d.avg_health_score * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-center font-mono">
                    {(d.avg_sell_through_rate * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-center font-semibold flex items-center justify-center gap-1">
                    <TrendingUp
                      size={16}
                      style={{ color: "var(--accent-color)" }}
                    />
                    {d.total_sold}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}