import React, { Suspense, lazy } from "react";

// Lazy load the chart components
const GlossaryPerformanceCharts = lazy(() => import("./charts/GlossaryPerformanceCharts"));
const GlossaryEngagementCharts = lazy(() => import("./charts/GlossaryEngagementCharts"));
const GlossaryMonetizationCharts = lazy(() => import("./charts/GlossaryMonetizationCharts"));

const GlossaryAnalyticsDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      <h2 className="text-2xl font-bold text-[--text]">Glossary Analytics Dashboard</h2>
      
      {/* Wrap the chart components with Suspense to handle lazy loading */}
      <Suspense fallback={<div>Loading charts...</div>}>
        <div>
          <GlossaryPerformanceCharts />
          <GlossaryEngagementCharts />
          <GlossaryMonetizationCharts />
        </div>
      </Suspense>
    </div>
  );
};

export default GlossaryAnalyticsDashboard;