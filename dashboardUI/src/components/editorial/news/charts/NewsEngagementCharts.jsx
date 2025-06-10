import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import { motion } from "framer-motion";
  import { useEffect, useState } from "react";
  
  const data = [
    { day: "Mon", CTR: 3.02, Bounce: 65.3, Scroll: 42.0 },
    { day: "Tue", CTR: 1.49, Bounce: 46.5, Scroll: 62.2 },
    { day: "Wed", CTR: 3.05, Bounce: 56.7, Scroll: 49.0 },
    { day: "Thu", CTR: 1.8, Bounce: 63.2, Scroll: 64.5 },
    { day: "Fri", CTR: 3.55, Bounce: 61.5, Scroll: 67.7 },
    { day: "Sat", CTR: 2.06, Bounce: 69.0, Scroll: 63.1 },
    { day: "Sun", CTR: 2.78, Bounce: 59.4, Scroll: 56.4 },
  ];
  
  const chartVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };
  
  const getCSSVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  
  const CustomChartCard = ({ title, dataKey, stroke, i }) => {
    const [vars, setVars] = useState({
      gridStroke: "#e5e7eb",
      tooltipBg: "#fff",
      tooltipText: "#333",
      tooltipBorder: "#ccc",
    });
  
    useEffect(() => {
      const updateThemeVars = () => {
        setVars({
          gridStroke: getCSSVar("--border"),
          tooltipBg: getCSSVar("--card"),
          tooltipText: getCSSVar("--text"),
          tooltipBorder: getCSSVar("--border"),
        });
      };
  
      updateThemeVars();
      const observer = new MutationObserver(updateThemeVars);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
  
      return () => observer.disconnect();
    }, []);
  
    return (
      <motion.div
        custom={i}
        variants={chartVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div
          className="rounded-2xl shadow-md text-base mb-6 border"
          style={{
            backgroundColor: getCSSVar("--card"),
            color: getCSSVar("--text"),
            borderColor: getCSSVar("--border"),
          }}
        >
          <div className="p-6">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: getCSSVar("--text") }}
            >
              {title}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={vars.gridStroke} />
                <XAxis dataKey="day" stroke="currentColor" fontSize={12} />
                <YAxis stroke="currentColor" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: vars.tooltipBg,
                    color: vars.tooltipText,
                    borderRadius: "6px",
                    padding: "8px",
                    border: `1px solid ${vars.tooltipBorder}`,
                  }}
                  itemStyle={{
                    color: vars.tooltipText,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={stroke}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: stroke }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const NewsEngagementCharts = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        <CustomChartCard
          i={0}
          title="Click-Through Rate (CTR)"
          dataKey="CTR"
          stroke="#6366f1" // Indigo
        />
        <CustomChartCard
          i={1}
          title="Bounce Rate"
          dataKey="Bounce"
          stroke="#dc2626" // Red
        />
        <CustomChartCard
          i={2}
          title="Scroll Depth"
          dataKey="Scroll"
          stroke="#16a34a" // Green
        />
      </div>
    );
  };
  
  export default NewsEngagementCharts;  