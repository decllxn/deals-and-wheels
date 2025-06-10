import React from "react";
import BlogPerformanceCharts from "./charts/BlogPerformanceCharts";

const BlogAnalyticsDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      <h2 className="text-2xl font-bold text-[--text]">Blog Analytics Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        <BlogPerformanceCharts />

      </div>
    </div>
  );
};

export default BlogAnalyticsDashboard;