// src/pages/dealer-dashboard/DashboardLeaderboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp } from "lucide-react";

export default function DashboardLeaderboard({ data = [] }) {
  if (!data.length)
    return (
      <p
        className="text-center py-8 text-sm italic"
        style={{ color: "var(--muted-text)" }}
      >
        No leaderboard data available yet.
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-3xl border shadow-lg overflow-hidden backdrop-blur-sm"
      style={{
        background: "var(--surface-color)",
        borderColor: "var(--border-color)",
        boxShadow: "0 4px 20px var(--shadow-color)",
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center px-6 py-5 border-b"
        style={{
          borderColor: "var(--border-color)",
          background: "var(--surface-color)",
        }}
      >
        <div className="flex items-center gap-2">
          <Trophy
            size={24}
            style={{
              color: "var(--accent-color)",
              filter: "drop-shadow(0 0 5px var(--highlight-color))",
            }}
          />
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--text-color)" }}
          >
            Dealer Leaderboard
          </h2>
        </div>
        <span
          className="text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide"
          style={{
            background: "var(--highlight-color)",
            color: "var(--bg-color)",
          }}
        >
          Top Performers
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr
              className="text-left uppercase text-xs"
              style={{
                backgroundColor: "var(--bg-color)",
                borderBottom: `1px solid var(--border-color)`,
                color: "var(--muted-text)",
              }}
            >
              <th className="px-6 py-3 font-medium">Rank</th>
              <th className="px-6 py-3 font-medium">Dealer</th>
              <th className="px-6 py-3 text-center font-medium">Avg Health</th>
              <th className="px-6 py-3 text-center font-medium">Sell-Through</th>
              <th className="px-6 py-3 text-center font-medium">Total Sold</th>
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
                  <span
                    className="font-semibold"
                    style={{ color: "var(--muted-text)" }}
                  >
                    #{index + 1}
                  </span>
                );

              return (
                <motion.tr
                  key={d.dealer_id || index}
                  whileHover={{
                    backgroundColor: "var(--highlight-color)",
                    scale: 1.005,
                  }}
                  transition={{ duration: 0.2 }}
                  className="border-b last:border-0 transition-all duration-200 cursor-pointer"
                  style={{
                    borderColor: "var(--border-color)",
                    background: "var(--surface-color)",
                  }}
                >
                  <td className="px-6 py-4 flex items-center gap-3 font-medium">
                    {rankBadge}
                    <span style={{ color: "var(--text-color)" }}>
                      {d.dealer_name}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center font-mono text-sm">
                    {(d.avg_health_score * 100).toFixed(1)}%
                  </td>

                  <td className="px-6 py-4 text-center font-mono text-sm">
                    {(d.avg_sell_through_rate * 100).toFixed(1)}%
                  </td>

                  <td className="px-6 py-4 text-center font-semibold flex items-center justify-center gap-1">
                    <TrendingUp
                      size={16}
                      style={{
                        color: "var(--accent-color)",
                      }}
                    />
                    {d.total_sold}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer summary */}
      <div
        className="px-6 py-3 text-xs text-right border-t"
        style={{ color: "var(--muted-text)", borderColor: "var(--border-color)" }}
      >
        Updated in real-time • {new Date().toLocaleDateString()}
      </div>
    </motion.div>
  );
}