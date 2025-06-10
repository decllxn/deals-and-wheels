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
  
  const guideEngagementData = [
    { day: "Mon", Listings: 25, Inquiries: 12, Shares: 8 },
    { day: "Tue", Listings: 20, Inquiries: 15, Shares: 10 },
    { day: "Wed", Listings: 30, Inquiries: 18, Shares: 12 },
    { day: "Thu", Listings: 28, Inquiries: 16, Shares: 9 },
    { day: "Fri", Listings: 35, Inquiries: 22, Shares: 15 },
    { day: "Sat", Listings: 18, Inquiries: 10, Shares: 7 },
    { day: "Sun", Listings: 22, Inquiries: 14, Shares: 11 },
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
  
  const CarGuideCustomChartCard = ({ title, dataKey, stroke, i }) => {
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
              <LineChart data={guideEngagementData}>
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
  
  const CarGuideEngagementCharts = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        <CarGuideCustomChartCard
          i={0}
          title="New Listings"
          dataKey="Listings"
          stroke="#a855f7" // Purple
        />
        <CarGuideCustomChartCard
          i={1}
          title="Buyer Inquiries"
          dataKey="Inquiries"
          stroke="#f44336" // Red
        />
        <CarGuideCustomChartCard
          i={2}
          title="Social Shares"
          dataKey="Shares"
          stroke="#34d399" // Teal
        />
      </div>
    );
  };
  
  export default CarGuideEngagementCharts;