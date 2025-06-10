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
const glossaryRevenueData = [
  { term: "Term A", views: 1200, revenue: 80 },
  { term: "Term B", views: 1500, revenue: 100 },
  { term: "Term C", views: 1000, revenue: 65 },
  { term: "Term D", views: 1800, revenue: 120 },
  { term: "Term E", views: 1300, revenue: 90 },
];

const glossaryAffiliateData = [
  { term: "Term X", clicks: 200, conversions: 20 },
  { term: "Term Y", clicks: 150, conversions: 15 },
  { term: "Term Z", clicks: 100, conversions: 10 },
  { term: "Term W", clicks: 220, conversions: 22 },
  { term: "Term V", clicks: 180, conversions: 18 },
];

// Motion variants for animation
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeInOut" },
  }),
};

// Optimized Chart Card Component
const GlossaryChartCard = ({ title, data, lines, i }) => {
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const chartStyles = useMemo(() => ({
    gridStroke: isDark ? "var(--border)" : "var(--border)",
    tooltipBg: isDark ? "var(--bg-secondary)" : "var(--bg-secondary)",
    tooltipText: isDark ? "var(--text)" : "var(--text)",
    tooltipBorder: isDark ? "var(--border)" : "var(--border)",
  }), [isDark]);

  return (
    <motion.div custom={i} variants={variants} initial="hidden" animate="visible" className="w-full">
      <div
        className="rounded-lg shadow-md border"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="p-5">
          <h3 className="text-md font-semibold mb-3 tracking-tight" style={{ color: "var(--text)" }}>
            {title}
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridStroke} />
              <XAxis dataKey="term" fontSize={10} stroke="currentColor" tickLine={false} axisLine={false} />
              <YAxis fontSize={10} stroke="currentColor" tickLine={false} axisLine={false} />
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
                textStyle={{ fontSize: 12, color: isDark ? "var(--text-muted)" : "var(--text-muted)" }}
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

// Main Component to render all charts
const GlossaryMonetizationCharts = () => {
  const charts = useMemo(
    () => [
      {
        title: "Glossary Ad Revenue per Term",
        data: glossaryRevenueData,
        lines: [
          { key: "revenue", label: "Revenue ($)", color: "var(--accent)" },
          { key: "views", label: "Views", color: "#64b5f6" },
        ],
      },
      {
        title: "Glossary Affiliate Performance",
        data: glossaryAffiliateData,
        lines: [
          { key: "clicks", label: "Clicks", color: "#facc15" },
          { key: "conversions", label: "Conversions", color: "#f44336" },
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

export default GlossaryMonetizationCharts;