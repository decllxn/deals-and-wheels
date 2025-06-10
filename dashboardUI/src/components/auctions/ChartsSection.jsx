import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";

const auctionTrends = [
  { month: "Jan", auctions: 30 },
  { month: "Feb", auctions: 42 },
  { month: "Mar", auctions: 38 },
  { month: "Apr", auctions: 55 },
  { month: "May", auctions: 61 },
  { month: "Jun", auctions: 72 },
];

const bidsPerCategory = [
  { category: "SUV", bids: 240 },
  { category: "Sedan", bids: 190 },
  { category: "Truck", bids: 120 },
  { category: "Coupe", bids: 90 },
  { category: "Van", bids: 60 },
];

const platformEngagement = [
  { name: "Bidders", value: 450 },
  { name: "Sellers", value: 120 },
  { name: "Visitors", value: 820 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function ChartsSection() {
  return (
    <div className="bg-[var(--bg)] p-6 rounded-2xl shadow-md space-y-8">
      <h2 className="text-xl font-bold text-[var(--text)] mb-2">📈 Auction Platform Insights</h2>

      {/* Line Chart: Auction Trends */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Monthly Auction Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={auctionTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="auctions"
              stroke="var(--accent)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Bids Per Category */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Bids by Vehicle Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={bidsPerCategory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="category" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip />
            <Bar dataKey="bids" fill="var(--accent)" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Platform Engagement */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Platform Engagement</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={platformEngagement}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {platformEngagement.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}