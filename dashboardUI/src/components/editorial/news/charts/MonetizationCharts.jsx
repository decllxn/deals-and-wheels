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
  
  const revenueData = [
    { article: "EVs 2025", views: 1000, revenue: 130 },
    { article: "SUV Guide", views: 820, revenue: 115 },
    { article: "Car Mods", views: 560, revenue: 70 },
    { article: "EV vs Hybrid", views: 1200, revenue: 180 },
    { article: "Luxury Brands", views: 720, revenue: 100 },
  ];
  
  const affiliateData = [
    { article: "EVs 2025", clicks: 130, conversions: 14 },
    { article: "SUV Guide", clicks: 80, conversions: 9 },
    { article: "Car Mods", clicks: 62, conversions: 7 },
    { article: "EV vs Hybrid", clicks: 95, conversions: 10 },
    { article: "Luxury Brands", clicks: 51, conversions: 5 },
  ];
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeInOut" },
    }),
  };
  
  const ChartCard = ({ title, data, lines, i }) => {
    const isDark =
      typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark");
  
    const gridStroke = isDark ? "var(--border)" : "var(--border)";
    const tooltipBg = isDark ? "var(--bg-secondary)" : "var(--bg-secondary)";
    const tooltipText = isDark ? "var(--text)" : "var(--text)";
    const tooltipBorder = isDark ? "var(--border)" : "var(--border)";
  
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
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="article"
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
                    backgroundColor: tooltipBg,
                    color: tooltipText,
                    borderRadius: "6px",
                    padding: "8px",
                    border: `1px solid ${tooltipBorder}`,
                  }}
                  itemStyle={{ color: tooltipText, fontSize: "12px" }}
                  labelStyle={{ color: tooltipText, fontWeight: 600 }}
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
  
  const MonetizationCharts = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
        <ChartCard
          i={0}
          title="Ad Revenue per Article"
          data={revenueData}
          lines={[
            { key: "revenue", label: "Revenue ($)", color: "var(--accent)" },
            {
              key: "views",
              label: "Views",
              color: "#64b5f6", // blue-400
            },
          ]}
        />
        <ChartCard
          i={1}
          title="Affiliate Link Performance"
          data={affiliateData}
          lines={[
            { key: "clicks", label: "Clicks", color: "#facc15" }, // yellow-400
            { key: "conversions", label: "Conversions", color: "#f44336" }, // red-500
          ]}
        />
      </div>
    );
  };
  
  export default MonetizationCharts;