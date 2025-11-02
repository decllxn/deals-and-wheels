// src/pages/dealer-dashboard/DashboardTrendChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardTrendChart({ trend }) {
  const data = {
    labels: trend.dates,
    datasets: [
      {
        label: "Health Score",
        data: trend.health_scores,
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        tension: 0.4,
      },
      {
        label: "Sell Through Rate",
        data: trend.sell_through,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
      {
        label: "Avg Prices",
        data: trend.avg_prices,
        borderColor: "#facc15",
        backgroundColor: "rgba(250, 204, 21, 0.2)",
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    stacked: false,
    plugins: { legend: { position: "top" } },
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: { display: true, text: "Score / Rate" },
      },
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Price (Ksh)" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-2">Performance Trend (Last 30 Days)</h2>
      <Line data={data} options={options} />
    </div>
  );
}