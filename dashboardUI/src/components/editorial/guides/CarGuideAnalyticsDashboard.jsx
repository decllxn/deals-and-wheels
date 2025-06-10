import React from "react";
import CarGuidePerformanceCharts from "./charts/CarGuidePerformanceCharts";
import CarGuideEngagementCharts from "./charts/CarGuideEngagementCharts";
import CarGuideMonetizationCharts from "./charts/CarGuideMonetizationCharts";

const CarGuideAnalyticsDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      <h2 className="text-2xl font-bold text-[--text]">Car Guide Analytics Dashboard</h2>
      <div>
        <CarGuidePerformanceCharts />
        <CarGuideEngagementCharts/>
        <CarGuideMonetizationCharts/>
      </div>
    </div>
  );
};

export default CarGuideAnalyticsDashboard;