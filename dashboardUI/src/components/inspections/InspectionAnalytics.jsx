import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, CartesianGrid, Legend } from "recharts";
import { ChartBar, ChartLine } from "lucide-react";

const inspectionData = [
  { month: "Jan", completed: 50, pending: 15 },
  { month: "Feb", completed: 65, pending: 10 },
  { month: "Mar", completed: 70, pending: 12 },
  { month: "Apr", completed: 55, pending: 18 },
];

const timelineData = [
  { week: "W1", averageTime: 2.5 },
  { week: "W2", averageTime: 2.8 },
  { week: "W3", averageTime: 2.3 },
  { week: "W4", averageTime: 2.6 },
];

const InspectionAnalyticsModern = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="bg-[--card] rounded-2xl shadow-md p-6 flex flex-col gap-6"
  >
    <h2 className="text-lg font-semibold text-[--text] flex items-center gap-2 mb-4">
      <ChartBar className="text-[--accent]" size={20} /> Inspection Analytics
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-[--bg] rounded-md border border-[--border]">
        <h3 className="text-md font-semibold text-[--text] mb-2 flex items-center gap-1">
          <ChartBar className="text-[--accent]" size={16} /> Completed vs. Pending
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={inspectionData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "var(--bg-secondary)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6 }} itemStyle={{ color: "var(--text)" }} />
            <Legend wrapperStyle={{ top: 5, right: 10, backgroundColor: 'transparent', borderRadius: 3, lineHeight: '1.5em' }} />
            <Bar dataKey="completed" fill="#34d399" name="Completed" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="#facc15" name="Pending" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-[--bg] rounded-md border border-[--border]">
        <h3 className="text-md font-semibold text-[--text] mb-2 flex items-center gap-1">
          <ChartLine className="text-[--accent]" size={16} /> Avg. Inspection Time (Weeks)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timelineData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="week" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} unit=" days" />
            <Tooltip contentStyle={{ backgroundColor: "var(--bg-secondary)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6 }} itemStyle={{ color: "var(--text)" }} />
            <Line type="monotone" dataKey="averageTime" stroke="#60a5fa" strokeWidth={2} name="Avg. Time" dot={false} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </motion.div>
);

export default InspectionAnalyticsModern;