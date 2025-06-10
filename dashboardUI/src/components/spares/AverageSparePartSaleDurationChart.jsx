import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarDays } from "lucide-react";

const data = [
  { category: "Engine", days: 7 },
  { category: "Suspension", days: 12 },
  { category: "Electrical", days: 5 },
  { category: "Body", days: 9 },
];

const AverageSparePartSaleDurationChartModern = () => (
  <div className="bg-[--bg-secondary] rounded-2xl shadow-md p-5 flex flex-col">
    <div className="flex items-center mb-4">
      <CalendarDays className="text-[--accent] mr-2" size={20} />
      <h2 className="text-lg font-semibold text-[--text]">Avg. Sale Duration by Category</h2>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
        <YAxis
          unit=" days"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--text-muted)", fontSize: 12 }}
          domain={[0, Math.max(...data.map((item) => item.days)) + 2]}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6 }}
          itemStyle={{ color: "var(--text)" }}
        />
        <Bar dataKey="days" fill="var(--accent)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default AverageSparePartSaleDurationChartModern;