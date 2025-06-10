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
  
  const carGuideViewsData = [
    { guide: "Choosing Your First Car", views: 1800, interest: 85 },
    { guide: "Selling Your Used Car", views: 1200, interest: 70 },
    { guide: "Maintaining Your Car", views: 2000, interest: 92 },
    { guide: "Understanding Car Insurance", views: 1500, interest: 80 },
    { guide: "Best Family SUVs of 2024", views: 1650, interest: 88 },
  ];
  
  const carGuideEngagementData = [
    { guide: "Choosing Your First Car", timeSpent: 30, inquiries: 18 },
    { guide: "Selling Your Used Car", timeSpent: 25, inquiries: 15 },
    { guide: "Maintaining Your Car", timeSpent: 35, inquiries: 22 },
    { guide: "Understanding Car Insurance", timeSpent: 28, inquiries: 19 },
    { guide: "Best Family SUVs of 2024", timeSpent: 40, inquiries: 25 },
  ];
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeInOut" },
    }),
  };
  
  const CarGuideChartCard = ({ title, data, lines, i }) => {
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
                  dataKey="guide"
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
  
  const CarGuidePerformanceCharts = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
        <CarGuideChartCard
          i={0}
          title="Car Guide Views and Interest"
          data={carGuideViewsData}
          lines={[
            { key: "interest", label: "Interest Score", color: "var(--accent)" },
            {
              key: "views",
              label: "Views",
              color: "#64b5f6", // blue-400
            },
          ]}
        />
        <CarGuideChartCard
          i={1}
          title="Car Guide Engagement Metrics"
          data={carGuideEngagementData}
          lines={[
            { key: "timeSpent", label: "Avg. Time (min)", color: "#facc15" }, // yellow-400
            { key: "inquiries", label: "Inquiries", color: "#f44336" }, // red-500
          ]}
        />
      </div>
    );
  };
  
  export default CarGuidePerformanceCharts;