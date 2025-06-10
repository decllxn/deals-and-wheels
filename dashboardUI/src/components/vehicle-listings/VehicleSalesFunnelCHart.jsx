import React from "react";
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { value: 1200, name: "Total Listings" },
  { value: 780, name: "With Inquiries" },
  { value: 410, name: "Test Drives Scheduled" },
  { value: 230, name: "Vehicles Sold" },
];

const VehicleSalesFunnelChart = () => (
  <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="text-4xl text-[var(--accent)] mr-4">
        <TrendingUp />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          📊 Sales Conversion Funnel
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Progress from listings to sales.
        </p>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <FunnelChart>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            padding: "10px",
            color: "var(--text)",
          }}
        />
        <Funnel dataKey="value" data={data} isAnimationActive fill="var(--accent)" stroke="none">
          <LabelList
            position="right"
            fill="var(--text-muted)"
            stroke="none"
            dataKey="name"
            style={{ fontSize: 14 }}
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  </div>
);

export default VehicleSalesFunnelChart;