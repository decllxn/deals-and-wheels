import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { useMemo } from "react";

// Chart Data
const glossaryViewsData = [
  { term: "Term A", views: 2500, saves: 120 },
  { term: "Term B", views: 2000, saves: 100 },
  { term: "Term C", views: 3000, saves: 150 },
  { term: "Term D", views: 2200, saves: 110 },
  { term: "Term E", views: 2700, saves: 130 },
];

const glossaryEngagementData = [
  { term: "Term A", timeSpent: 45, searches: 30 },
  { term: "Term B", timeSpent: 40, searches: 25 },
  { term: "Term C", timeSpent: 50, searches: 35 },
  { term: "Term D", timeSpent: 42, searches: 28 },
  { term: "Term E", timeSpent: 48, searches: 32 },
];

// Memoized Styles
const useChartStyles = () => {
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return useMemo(
    () => ({
      gridStroke: isDark ? "var(--border)" : "var(--border)",
      tooltipBg: isDark ? "var(--bg-secondary)" : "var(--bg-secondary)",
      tooltipText: isDark ? "var(--text)" : "var(--text)",
      tooltipBorder: isDark ? "var(--border)" : "var(--border)",
    }),
    [isDark]
  );
};

// Motion variants for animation
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeInOut" },
  }),
};

// Chart Card Component
const GlossaryChartCard = ({ title, data, lines, i }) => {
  const chartStyles = useChartStyles();

  return (
    <motion.div
      custom={i}
      variants={variants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div
        className="rounded-lg shadow-md border"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="p-5">
          <h3
            className="text-md font-semibold mb-3 tracking-tight"
            style={{
              color: "var(--text)",
            }}
          >
            {title}
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridStroke} />
              <XAxis
                dataKey="term"
                fontSize={10}
                stroke="currentColor"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={10}
                stroke="currentColor"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                wrapperClassName="rounded-md shadow-sm py-2 px-3"
                contentStyle={{
                  backgroundColor: chartStyles.tooltipBg,
                  color: chartStyles.tooltipText,
                  borderRadius: "6px",
                  padding: "8px",
                  border: `1px solid ${chartStyles.tooltipBorder}`,
                }}
                itemStyle={{ color: chartStyles.tooltipText, fontSize: "12px" }}
                labelStyle={{ color: chartStyles.tooltipText, fontWeight: 600 }}
              />
              <Legend
                iconSize={10}
                textStyle={{
                  fontSize: 12,
                  color: chartStyles.tooltipText,
                }}
                wrapperStyle={{ bottom: 0, left: 0, lineHeight: "24px" }}
              />
              {lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.key}
                  name={line.label}
                  stroke={line.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

// Main Glossary Performance Charts Component
const GlossaryPerformanceCharts = () => {
  const charts = useMemo(
    () => [
      {
        title: "Glossary Term Views and Saves",
        data: glossaryViewsData,
        lines: [
          { key: "saves", label: "Saves", color: "var(--accent)" },
          { key: "views", label: "Views", color: "#64b5f6" },
        ],
      },
      {
        title: "Glossary Term Engagement",
        data: glossaryEngagementData,
        lines: [
          { key: "timeSpent", label: "Avg. Time (sec)", color: "#facc15" },
          { key: "searches", label: "Searches", color: "#f44336" },
        ],
      },
    ],
    []
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
      {charts.map((chart, i) => (
        <GlossaryChartCard
          key={i}
          i={i}
          title={chart.title}
          data={chart.data}
          lines={chart.lines}
        />
      ))}
    </div>
  );
};

export default GlossaryPerformanceCharts;