import React from "react";
import AppLayout from "../components/layout/AppLayout";

// Importing all spare parts listing components
import SparePartsSummaryCards from "../components/spares/SparePartsSummaryCards";
import SparePartsListingTrendsChart from "../components/spares/SparePartsListingTrendsChart";
import SparePartsInventoryFunnelChart from "../components/spares/SparePartsInventoryFunnelChart";
import SparePartsGeoMap from "../components/spares/SparePartsGeoMap";
import TopSparePartsTable from "../components/spares/TopSparePartsTable";
import SparePartsHealthAlerts from "../components/spares/SparePartsHealthAlerts";
import DealerSparePartsOverview from "../components/spares/DealerSparePartsOverview";
import SparePartsFiltersPanel from "../components/spares/SparePartsFilters";
import AverageSparePartSaleDurationChart from "../components/spares/AverageSparePartSaleDurationChart";
import SparePartsPricingAnalyticsChart from "../components/spares/SparePartsPricingAnalyticsChart";
import SparePartsForecastWidget from "../components/spares/SparePartsForecastWidget";
import ExportAutomationTools from "../components/spares/ExportAutomationTools";

const Spares = () => {
  return (
    <AppLayout>
      <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Section 1: Key Summary Cards (Full width on all screens) */}
        <div className="col-span-full">
          <SparePartsSummaryCards />
        </div>

        {/* Section 2: Trends and Analytics */}
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <SparePartsListingTrendsChart />
        </div>
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <SparePartsInventoryFunnelChart />
        </div>

        {/* Section 3: Geo Distribution and Top Listings */}
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <SparePartsGeoMap />
        </div>
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <TopSparePartsTable />
        </div>

        {/* Section 4: Health Warnings and Dealer Overview */}
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <SparePartsHealthAlerts />
        </div>
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <DealerSparePartsOverview />
        </div>

        {/* Section 5: Filters and Sale Duration */}
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <SparePartsFiltersPanel />
        </div>
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <AverageSparePartSaleDurationChart />
        </div>

        {/* Section 6: Pricing & Forecasting */}
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <SparePartsPricingAnalyticsChart />
        </div>
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <SparePartsForecastWidget />
        </div>

        {/* Section 7: Export and Automation Tools (Full width on all screens) */}
        <div className="col-span-full">
          <ExportAutomationTools />
        </div>
      </div>
    </AppLayout>
  );
};

export default Spares;