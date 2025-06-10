import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Coins,
  Car,
  Activity,
  Users,
  Clock,
} from "lucide-react";

// Mock data for demonstration
const initialAnalytics = {
  liveAuctions: { value: 28, change: 10 },
  bidsToday: { value: 134, change: -5 },
  totalRevenue: { value: 1200000, change: 8 },
  topCategory: { value: "SUVs", change: 0 },
  activeUsers: { value: 542, change: 12 },
  averageBid: { value: 42000, change: 3 },
  newListings: { value: 12, change: 15 },
  conversionRate: {value: 2.5, change: -0.5}
};

const AuctionAnalytics = () => {
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      // In a real app, you would fetch data here and update state
      // For this example, we'll just keep the initial data
      setAnalytics(initialAnalytics);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getChangeIcon = (change) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    } else {
      return null;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  return (
    <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-[var(--text)] mb-6">
        📊 Auction Analytics
      </h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards during loading */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[var(--bg-secondary)] p-6 rounded-2xl animate-pulse"
            >
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
            <div className="text-4xl text-[var(--accent)]">
              <Activity />
            </div>
            <div className="text-right">
              <h4 className="text-[var(--text)] font-semibold text-xl">
                {analytics.liveAuctions.value}
              </h4>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                Live Auctions
                {getChangeIcon(analytics.liveAuctions.change)}
                <span
                  className={
                    analytics.liveAuctions.change > 0
                      ? "text-green-500"
                      : analytics.liveAuctions.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  ({analytics.liveAuctions.change}%)
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
            <div className="text-4xl text-[var(--accent)]">
              <Users />
            </div>
            <div className="text-right">
              <h4 className="text-[var(--text)] font-semibold text-xl">
                {analytics.bidsToday.value}
              </h4>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                Bids Today
                {getChangeIcon(analytics.bidsToday.change)}
                <span
                  className={
                    analytics.bidsToday.change > 0
                      ? "text-green-500"
                      : analytics.bidsToday.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  ({analytics.bidsToday.change}%)
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
            <div className="text-4xl text-[var(--accent)]">
              <Coins />
            </div>
            <div className="text-right">
              <h4 className="text-[var(--text)] font-semibold text-xl">
                {formatCurrency(analytics.totalRevenue)}
              </h4>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                Total Revenue
                {getChangeIcon(analytics.totalRevenue.change)}
                <span
                  className={
                    analytics.totalRevenue.change > 0
                      ? "text-green-500"
                      : analytics.totalRevenue.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  ({analytics.totalRevenue.change}%)
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
            <div className="text-4xl text-[var(--accent)]">
              <Car />
            </div>
            <div className="text-right">
              <h4 className="text-[var(--text)] font-semibold text-xl">
                {analytics.topCategory.value}
              </h4>
              <p className="text-sm text-[var(--text-muted)]">Top Category</p>
            </div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
            <div className="text-4xl text-[var(--accent)]">
              <Users />
            </div>
            <div className="text-right">
              <h4 className="text-[var(--text)] font-semibold text-xl">
                {analytics.activeUsers.value}
              </h4>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                Active Users
                {getChangeIcon(analytics.activeUsers.change)}
                <span
                  className={
                    analytics.activeUsers.change > 0
                      ? "text-green-500"
                      : analytics.activeUsers.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  ({analytics.activeUsers.change}%)
                </span>
              </p>
            </div>
          </div>

            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
            <div className="text-4xl text-[var(--accent)]">
                <Coins/>
            </div>
            <div className="text-right">
              <h4 className="text-[var(--text)] font-semibold text-xl">
                {formatCurrency(analytics.averageBid)}
              </h4>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                Average Bid
                {getChangeIcon(analytics.averageBid.change)}
                <span
                  className={
                    analytics.averageBid.change > 0
                      ? "text-green-500"
                      : analytics.averageBid.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  ({analytics.averageBid.change}%)
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
            <div className="text-4xl text-[var(--accent)]">
              <Clock />
            </div>
            <div className="text-right">
              <h4 className="text-[var(--text)] font-semibold text-xl">
                {analytics.newListings.value}
              </h4>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                New Listings
                {getChangeIcon(analytics.newListings.change)}
                <span
                  className={
                    analytics.newListings.change > 0
                      ? "text-green-500"
                      : analytics.newListings.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  ({analytics.newListings.change}%)
                </span>
              </p>
            </div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition">
            <div className="text-4xl text-[var(--accent)]">
              <TrendingUp />
            </div>
            <div className="text-right">
              <h4 className="text-[var(--text)] font-semibold text-xl">
                {analytics.conversionRate.value}%
              </h4>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                Conversion Rate
                {getChangeIcon(analytics.conversionRate.change)}
                <span
                  className={
                    analytics.conversionRate.change > 0
                      ? "text-green-500"
                      : analytics.conversionRate.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  ({analytics.conversionRate.change}%)
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionAnalytics;