import React from "react";

export default function PaymentForecastWidget() {
  return (
    <div className="bg-[var(--bg)] p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold text-[var(--text)] mb-2">📈 Forecasted Revenue</h2>
      <p className="text-[var(--text-muted)] mb-4">
        Estimated revenue for the next period based on trends and predictive modeling.
      </p>
      <div className="bg-[var(--bg-secondary)] p-4 rounded-xl text-[var(--accent)] text-xl font-semibold text-center">
        $128,700 projected next month
      </div>
    </div>
  );
}