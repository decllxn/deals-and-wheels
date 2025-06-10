import React from "react";
import { FunnelChart, Funnel, Tooltip, LabelList, ResponsiveContainer } from "recharts";
import { Funnel as FunnelIcon } from "lucide-react";

const data = [
  { stage: "Listed", value: 1200, fill: "#60a5fa" },
  { stage: "Viewed", value: 950, fill: "#34d399" },
  { stage: "Inquired", value: 430, fill: "#facc15" },
  { stage: "Ordered", value: 180, fill: "#a78bfa" },
];

const SparePartsInventoryFunnelChartModern = () => (
  <div className="bg-[--bg] rounded-2xl shadow-md p-5 flex flex-col">
    <div className="flex items-center mb-4">
      <FunnelIcon className="text-[--accent] mr-2" size={20} />
      <h2 className="text-lg font-semibold text-[--text]">Inventory Funnel</h2>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <FunnelChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <Tooltip
          contentStyle={{ backgroundColor: "var(--bg-secondary)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6 }}
          itemStyle={{ color: "var(--text)" }}
        />
        <Funnel
          dataKey="value"
          data={data} // Explicitly pass the data prop here
          isAnimationActive
          stroke="var(--border)"
          strokeWidth={1}
          fillOpacity={0.8}
        >
          <LabelList position="right" fill="var(--text-muted)" stroke="none" dataKey="stage" />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  </div>
);

export default SparePartsInventoryFunnelChartModern;