// src/pages/dealer-dashboard/DealerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

import DashboardHeader from "./Dashboard/DashboardHeader";
import DashboardSummaryCards from "./Dashboard/DashboardSummaryCards";
import DashboardOverview from "./Dashboard/DashboardOverview";
import DashboardTrendChart from "./Dashboard/DashboardTrendChart";
import DashboardLeaderboard from "./Dashboard/DashboardLeaderboard";

const API_BASE = "http://127.0.0.1:8000/api/dealer-dashboard/";

export default function DealerDashboard({ dealerId }) {
  const { access: authToken, user, isAuthenticated } = useAuth();

  const [overview, setOverview] = useState(null);
  const [metricsTrend, setMetricsTrend] = useState(null);
  const [summaryCards, setSummaryCards] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [dealerInfo, setDealerInfo] = useState(null);

  useEffect(() => {
    if (!authToken || !dealerId || !isAuthenticated) return;

    const headers = { Authorization: `Bearer ${authToken}` };

    const fetchAll = async () => {
      try {
        const [dashboardRes, leaderboardRes, dealerRes] = await Promise.all([
          axios.get(`${API_BASE}dashboard/`, { headers }),
          axios.get(`${API_BASE}leaderboard/`, { headers }),
          axios.get(`${API_BASE}overview/${dealerId}/`, { headers }),
        ]);

        setOverview(dashboardRes.data.overview);
        setMetricsTrend(dashboardRes.data.metrics_trend);
        setSummaryCards(dashboardRes.data.summary_cards);
        setLeaderboard(leaderboardRes.data.leaderboard);
        setDealerInfo(dealerRes.data.dealer);
      } catch (err) {
        console.error("Error fetching dealer dashboard:", err);
      }
    };

    fetchAll();
  }, [authToken, dealerId, isAuthenticated]);

  if (!isAuthenticated)
    return <p className="p-6 text-center">Please log in to view the dashboard.</p>;

  return (
    <div className="p-6 space-y-8">
      {dealerInfo && <DashboardHeader dealer={dealerInfo} />}

      {summaryCards && <DashboardSummaryCards data={summaryCards} />}

      {overview && <DashboardOverview data={overview} />}

      {metricsTrend && <DashboardTrendChart trend={metricsTrend} />}

      {leaderboard.length > 0 && <DashboardLeaderboard data={leaderboard} />}
    </div>
  );
}