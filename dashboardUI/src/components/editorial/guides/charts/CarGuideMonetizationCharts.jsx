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
  
  const guideRevenueData = [
    { guide: "Car Buying Tips", views: 2200, revenue: 130 },
    { guide: "Selling Your Car Online", views: 1800, revenue: 110 },
    { guide: "Negotiating Car Prices", views: 2500, revenue: 150 },
    { guide: "Car Financing Options", views: 1500, revenue: 90 },
    { guide: "Trade-in Value Guide", views: 2000, revenue: 120 },
  ];
  
  const guideAffiliateData = [
    { guide: "Best Car Insurance", clicks: 300, conversions: 30 },
    { guide: "Auto Loan Providers", clicks: 240, conversions: 25 },
    { guide: "Car Detailing Products", clicks: 180, conversions: 18 },
    { guide: "Extended Warranty", clicks: 200, conversions: 22 },
    { guide: "Vehicle History Reports", clicks: 150, conversions: 15 },
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
  
  const CarGuideMonetizationCharts = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
        <CarGuideChartCard
          i={0}
          title="Guide Ad Revenue per Article"
          data={guideRevenueData}
          lines={[
            { key: "revenue", label: "Revenue ($)", color: "var(--accent)" },
            {
              key: "views",
              label: "Views",
              color: "#64b5f6", // blue-400
            },
          ]}
        />
        <CarGuideChartCard
          i={1}
          title="Guide Affiliate Performance"
          data={guideAffiliateData}
          lines={[
            { key: "clicks", label: "Clicks", color: "#facc15" }, // yellow-400
            { key: "conversions", label: "Conversions", color: "#f44336" }, // red-500
          ]}
        />
      </div>
    );
  };
  
  export default CarGuideMonetizationCharts;