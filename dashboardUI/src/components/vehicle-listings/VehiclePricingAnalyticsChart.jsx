import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Coins } from "lucide-react";

const pricingData = [
  { priceRange: "0-10k", frequency: 40 },
  { priceRange: "10k-20k", frequency: 120 },
  { priceRange: "20k-30k", frequency: 90 },
  { priceRange: "30k-40k", frequency: 75 },
  { priceRange: "40k+", frequency: 50 },
];

const VehiclePricingAnalyticsChart = () => (
  <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="text-4xl text-[var(--accent)] mr-4">
        <Coins />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          💰 Pricing Analytics
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Distribution of listings by price range.
        </p>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={pricingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
        <XAxis dataKey="priceRange" tick={{ fontSize: 12, fill: "var(--text-muted)" }} />
        <YAxis tick={{ fontSize: 12, fill: "var(--text-muted)" }} />
        <Tooltip contentStyle={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)", padding: "10px", color: "var(--text)" }} />
        <Bar dataKey="frequency" fill="var(--accent)" name="Listings Count" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default VehiclePricingAnalyticsChart;