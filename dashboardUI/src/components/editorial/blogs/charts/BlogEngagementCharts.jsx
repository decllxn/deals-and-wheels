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
  
  const blogEngagementData = [
    { day: "Mon", CTR: 2.12, Bounce: 72.5, Scroll: 55.2 },
    { day: "Tue", CTR: 1.88, Bounce: 68.1, Scroll: 60.9 },
    { day: "Wed", CTR: 2.55, Bounce: 70.3, Scroll: 58.7 },
    { day: "Thu", CTR: 2.01, Bounce: 65.9, Scroll: 63.4 },
    { day: "Fri", CTR: 2.90, Bounce: 69.8, Scroll: 66.1 },
    { day: "Sat", CTR: 1.65, Bounce: 75.2, Scroll: 59.5 },
    { day: "Sun", CTR: 2.33, Bounce: 71.0, Scroll: 52.8 },
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
  
  const BlogCustomChartCard = ({ title, dataKey, stroke, i }) => {
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
          className="rounded-lg shadow-md text-base mb-6 border"
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
              <LineChart data={blogEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke={vars.gridStroke} />
                <XAxis dataKey="day" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
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
  
  const BlogEngagementCharts = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        <BlogCustomChartCard
          i={0}
          title="Click-Through Rate (CTR)"
          dataKey="CTR"
          stroke="#a855f7" // Purple
        />
        <BlogCustomChartCard
          i={1}
          title="Bounce Rate"
          dataKey="Bounce"
          stroke="#f44336" // Red
        />
        <BlogCustomChartCard
          i={2}
          title="Scroll Depth"
          dataKey="Scroll"
          stroke="#34d399" // Teal
        />
      </div>
    );
  };
  
  export default BlogEngagementCharts;