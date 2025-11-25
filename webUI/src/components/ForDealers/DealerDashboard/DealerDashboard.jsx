// src/pages/dealer-dashboard/DealerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

import DashboardHeader from "./Dashboard/DashboardHeader";
import DashboardSummaryCards from "./Dashboard/DashboardSummaryCards";
import DashboardOverview from "./Dashboard/DashboardOverview";
import DashboardTrendChart from "./Dashboard/DashboardTrendChart";
import DashboardLeaderboard from "./Dashboard/DashboardLeaderboard";

const API_BASE = "http://127.0.0.1:8000/api";

export default function DealerDashboard() {
  const { access: authToken, isAuthenticated, user } = useAuth();

  const [dealerInfo, setDealerInfo] = useState(null);
  const [summaryCards, setSummaryCards] = useState(null);
  const [overview, setOverview] = useState(null);
  const [metricsTrend, setMetricsTrend] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authToken || !isAuthenticated || !user?.dealer_profile) return;

    const headers = { Authorization: `Bearer ${authToken}` };

    const fetchAll = async () => {
      try {
        setLoading(true);

        // ✅ Fetch dealer info for the logged-in dealer
        const [dealerRes, dashboardRes, leaderboardRes, overviewRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/dealers/api/dealers/${user.dealer_profile.slug}/`, { headers }),
          axios.get(`${API_BASE}/dealer-dashboard/dashboard/`, { headers }),
          axios.get(`${API_BASE}/dealer-dashboard/leaderboard/`, { headers }),
          axios.get(`${API_BASE}/dealer-dashboard/overview/${user.dealer_profile.id}/`, { headers }),
        ]);

        // ✅ Set state
        setDealerInfo(dealerRes.data);
        setSummaryCards(dashboardRes.data.summary_cards);
        setMetricsTrend(dashboardRes.data.metrics_trend);
        setOverview(overviewRes.data.overview);
        setLeaderboard(leaderboardRes.data.leaderboard);
      } catch (err) {
        console.error("❌ Error fetching dealer dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [authToken, isAuthenticated, user]);

  if (!isAuthenticated)
    return <p className="p-6 text-center">Please log in to view your dashboard.</p>;

  if (loading)
    return <p className="p-6 text-center text-[var(--muted-text)]">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* ✅ Header Section */}
      {dealerInfo && (
        <div className="mt-6">
          <DashboardHeader dealer={dealerInfo} />
        </div>
      )}

      {/* ✅ Summary Cards */}
      {summaryCards && <DashboardSummaryCards data={summaryCards} />}

      {/* ✅ Overview */}
      {overview && <DashboardOverview data={overview} />}

      {/* ✅ Metrics Trend Chart */}
      {metricsTrend && <DashboardTrendChart trend={metricsTrend} />}

      {/* ✅ Leaderboard */}
      {leaderboard.length > 0 && <DashboardLeaderboard data={leaderboard} />}
    </div>
  );
}