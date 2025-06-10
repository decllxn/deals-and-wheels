import React from "react";
import AppLayout from "../components/layout/AppLayout";
import SalesOverviewKPIs from "../components/sales/SalesOverviewKPIs";
import SalesTrendChart from "../components/sales/SalesTrendChart";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import TopSellersBarChart from "../components/sales/TopSellerBarChart";
import RecentTransactionsTable from "../components/sales/RecentTransactionsTable";
import SalesFunnelAnalytics from "../components/sales/SalesFunnelAnalytics";
import AbandonedSalesInsights from "../components/sales/AbandonedSalesInsights";
import PaymentMethodBreakdown from "../components/sales/PaymentMethodBreakdown";
import RefundsReturnsSection from "../components/sales/RefundsReturnsSection";
import ForecastingWidget from "../components/sales/Forecasting";

export default function SalesDashboard() {
  return (
    <AppLayout>
      <div className="grid gap-6 p-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-min">
        {/* Hero KPI Section */}
        <div className="col-span-1 md:col-span-2 xl:col-span-4">
          <SalesOverviewKPIs />
        </div>

        {/* Sales Trend & Forecasting */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <SalesTrendChart />
        </div>
        <div className="col-span-1 xl:col-span-1">
          <ForecastingWidget />
        </div>

        {/* Category & Top Sellers */}
        <div className="col-span-1">
          <SalesByCategoryChart />
        </div>
        <div className="col-span-1">
          <TopSellersBarChart />
        </div>

        {/* Funnel & Abandoned Sales */}
        <div className="col-span-1 md:col-span-2 xl:col-span-2">
          <SalesFunnelAnalytics />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-2">
          <AbandonedSalesInsights />
        </div>

        {/* Payment, Refunds */}
        <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <PaymentMethodBreakdown />
        </div>
        <div className="col-span-1 xl:col-span-1">
          <RefundsReturnsSection />
        </div>

        {/* Recent Transactions Full Width */}
        <div className="col-span-1 md:col-span-2 xl:col-span-4">
          <RecentTransactionsTable />
        </div>
      </div>
    </AppLayout>
  );
}