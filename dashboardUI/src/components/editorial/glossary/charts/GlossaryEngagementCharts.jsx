import React, { useState, useEffect } from 'react';
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

const glossaryEngagementData = [
  { day: "Mon", definitions: 15, searches: 50, shares: 10 },
  { day: "Tue", definitions: 20, searches: 60, shares: 12 },
  { day: "Wed", definitions: 18, searches: 55, shares: 11 },
  { day: "Thu", definitions: 22, searches: 70, shares: 14 },
  { day: "Fri", definitions: 25, searches: 80, shares: 16 },
  { day: "Sat", definitions: 10, searches: 40, shares: 8 },
  { day: "Sun", definitions: 12, searches: 45, shares: 9 },
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

const GlossaryCustomChartCard = ({ title, dataKey, stroke, i }) => {
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
            <LineChart data={glossaryEngagementData}>
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

const GlossaryEngagementCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
      <GlossaryCustomChartCard
        i={0}
        title="Definitions Added"
        dataKey="definitions"
        stroke="#a855f7"
      />
      <GlossaryCustomChartCard
        i={1}
        title="Glossary Searches"
        dataKey="searches"
        stroke="#f44336"
      />
      <GlossaryCustomChartCard
        i={2}
        title="Term Shares"
        dataKey="shares"
        stroke="#34d399"
      />
    </div>
  );
};

export default GlossaryEngagementCharts;