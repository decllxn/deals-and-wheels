import React from "react";
import AppLayout from "../components/layout/AppLayout";

// Inventory Components
import InventoryPlatformSummaryCards from "../components/inventory/InventoryPlatformSummaryCards";
import DealerInventoryTable from "../components/inventory/DealerInventoryTable";
import ListingTrendsChart from "../components/inventory/ListingTrendsChart";
import TopPerformingListings from "../components/inventory/TopPerformingListings";
import InventoryHealthAlerts from "../components/inventory/InventoryHealthAlerts";
import InventorySearchFilters from "../components/inventory/InventorySearchFilters";
import ListingsGeoMap from "../components/inventory/ListingsGeoMap";
import InventoryForecastWidget from "../components/inventory/InventoryForecastWidget";
import DealerPerformancePanel from "../components/inventory/DealerPerformancePanel";

const Inventory = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* 🔹 Marketplace KPIs */}
        <div className="grid">
          <InventoryPlatformSummaryCards />
        </div>

        {/* 🔍 Filters Panel */}
        <div className="grid gap-6">
          <div className="xl:col-span-4">
            <InventorySearchFilters />
          </div>
          <div className="xl:col-span-3">
            <ListingTrendsChart />
          </div>
        </div>

        {/* 🔝 Top Performing + Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <TopPerformingListings />
          </div>
          <div className="xl:col-span-1">
            <InventoryHealthAlerts />
          </div>
        </div>

        {/* 🌍 Map + Forecasts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ListingsGeoMap />
          <InventoryForecastWidget />
        </div>

        {/* 🧑‍💼 Dealer Table */}
        <div className="grid grid-cols-1">
          <DealerInventoryTable />
        </div>

        {/* 📊 Dealer Performance */}
        <div className="grid grid-cols-1">
          <DealerPerformancePanel />
        </div>
      </div>
    </AppLayout>
  );
};

export default Inventory;