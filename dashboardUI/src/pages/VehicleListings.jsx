import React from "react";
import AppLayout from "../components/layout/AppLayout";

// 📦 Components
import VehicleListingSummaryCards from "../components/vehicle-listings/VehicleListingSummaryCards";
import ListingActivityTrendsChart from "../components/vehicle-listings/ListingActivityTrendsChart";
import VehicleSalesFunnelChart from "../components/vehicle-listings/VehicleSalesFunnelCHart";
import VehicleListingsGeoMap from "../components/vehicle-listings/VehicleListingsGeoMap";
import TopVehicleListingsTable from "../components/vehicle-listings/TopVehicleListingsTable";
import ListingHealthFlagsPanel from "../components/vehicle-listings/ListingHealthFlagsPanel";
import DealerListingsOverview from "../components/vehicle-listings/DealerListingsOverview";
import VehicleListingsFilters from "../components/vehicle-listings/VehicleListingsFilters";
import AverageSaleDurationChart from "../components/vehicle-listings/AverageSaleDurationChart";
import VehiclePricingAnalyticsChart from "../components/vehicle-listings/VehiclePricingAnalyticsChart";
import VehicleInventoryForecastWidget from "../components/vehicle-listings/VehicleInventoryForecastWidget";
import ExportAutomationTools from "../components/vehicle-listings/ExportAutomationTools";

const VehicleListings = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* 🔹 Summary KPIs */}
        <VehicleListingSummaryCards />

        {/* 🔸 Primary Grid for Trends + Funnel + Map */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
          <div className="xl:col-span-2">
            <ListingActivityTrendsChart />
          </div>
          <div className="xl:col-span-2">
            <VehicleListingsGeoMap />
          </div>
        </div>

        <div className="xl:col-span-1">
            <VehicleSalesFunnelChart />
        </div>

        {/* 🔍 Top Performing & Listing Health */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <TopVehicleListingsTable />
          </div>
          <div className="xl:col-span-1">
            <ListingHealthFlagsPanel />
          </div>
        </div>

        {/* 👥 Dealer Panel + Filter Controls */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <DealerListingsOverview />
          </div>
          <div className="xl:col-span-1">
            <VehicleListingsFilters />
          </div>
        </div>

        {/* 📊 Time to Sell + Pricing Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AverageSaleDurationChart />
          <VehiclePricingAnalyticsChart />
        </div>

        {/* 🤖 Forecast Widget */}
        <div className="grid grid-cols-1">
          <VehicleInventoryForecastWidget />
        </div>

        {/* 🧩 Export / Automation */}
        <div className="grid grid-cols-1">
          <ExportAutomationTools />
        </div>
      </div>
    </AppLayout>
  );
};

export default VehicleListings;