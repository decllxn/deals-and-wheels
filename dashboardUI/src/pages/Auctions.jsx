import React from "react";
import AppLayout from "../components/layout/AppLayout";
import LiveAuctionCardsPanel from "../components/auctions/LiveAuctionsCardsPanel";
import CreateAuctionWidget from "../components/auctions/CreateAuctionWidget";
import AuctionAnalytics from "../components/auctions/AuctionAnalytics";
import AuctionPerformanceCharts from "../components/auctions/AuctionPerformanceCharts";
import ChartsSection from "../components/auctions/ChartsSection";
import BidActivityFeed from "../components/auctions/BidActivityFeed";
import AuctionManagementTable from "../components/auctions/AuctionManagementTable";

const Auctions = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* 🔹 Top Row: Live Auctions + Create Widget */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="md:col-span-2 xl:col-span-3">
            <LiveAuctionCardsPanel />
          </div>
          <div className="md:col-span-1 xl:col-span-1">
            <CreateAuctionWidget />
          </div>
        </div>

        {/* 🔸 Analytics Row */}
        <div className="grid grid-cols-1">
          <AuctionAnalytics />
        </div>

        {/* 🔻 Performance + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            <AuctionPerformanceCharts />
          </div>
          <div className="xl:col-span-1">
            <BidActivityFeed />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-1">
            <ChartsSection />
        </div>

        {/* 📋 Management Table */}
        <div className="grid grid-cols-1">
          <AuctionManagementTable />
        </div>
      </div>
    </AppLayout>
  );
};

export default Auctions;