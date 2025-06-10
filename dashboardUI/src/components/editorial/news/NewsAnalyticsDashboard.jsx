import React from "react";
import ViewsLineChart from "./charts/ViewsLineChart";
import CategoriesBarChart from "./charts/CategoriesBarChart";
import EngagementAreaChart from "./charts/EngagementAreaChart";
import SourcesPieChart from "./charts/SourcesPieChart";

const NewsAnalyticsDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      <h2 className="text-2xl font-bold text-[--text]">News Analytics Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ViewsLineChart />
        <CategoriesBarChart />
        <EngagementAreaChart />
        <SourcesPieChart />
      </div>
    </div>
  );
};

export default NewsAnalyticsDashboard;
