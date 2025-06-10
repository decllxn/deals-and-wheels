import React from "react";
import AppLayout from "../components/layout/AppLayout";

// Components (you'll build or plug these in)
import PaymentsSummaryCards from "../components/payments/PaymentsSummaryCards";
import PaymentMethodBreakdownChart from "../components/payments/PaymentMethodBreakdownChart";
import TransactionVolumeChart from "../components/payments/TransactionVolumeChart";
import RefundsReturnsChart from "../components/payments/RefundsReturnsChart";
import FailedPaymentsStats from "../components/payments/FailedPaymentsStats";
import RecentTransactionsTable from "../components/payments/RecentTransactionsTable";
import PayoutManagerWidget from "../components/payments/PayoutManagerWidget";
import PaymentForecastWidget from "../components/payments/PaymentForecastWidget";
import PaymentsGeoMap from "../components/payments/PaymentGeoMap";


const Payments = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* 📊 Summary Cards */}
        <div className="grid">
          <PaymentsSummaryCards />
        </div>

        {/* 🔄 Method + Volume */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PaymentMethodBreakdownChart />
          <TransactionVolumeChart />
        </div>

        {/* 🔁 Refunds + Failures */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RefundsReturnsChart />
          <FailedPaymentsStats />
        </div>

        {/* 🧾 Recent Transactions */}
        <div className="grid grid-cols-1">
          <RecentTransactionsTable />
        </div>

        {/* 💸 Payouts + Forecasting */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PayoutManagerWidget />
          <PaymentForecastWidget />
        </div>

        {/* 🌍 Optional Geo Map */}
        <div className="grid grid-cols-1">
          <PaymentsGeoMap />
        </div>
      </div>
    </AppLayout>
  );
};

export default Payments;