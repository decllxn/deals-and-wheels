// pages/Dashboard.js
import React from "react";
import AppLayout from "../components/layout/AppLayout";
const DashboardHero = React.lazy(() => import('../components/dashboard/DashboardHero'));
import DashboardChartsLayout from "../components/dashboard/DashboardChartsLayout";
import DashboardLowerSection from "../components/dashboard/DashboardLowerSection";

const Dashboard = () => {
    const handleDownloadReport = () => {
        // Implement download report logic
      };
      
    return (
        <AppLayout>
            <DashboardHero userName="Mr. Munene" onDownloadReport={handleDownloadReport} />
            <DashboardChartsLayout />
            <DashboardLowerSection />
        </AppLayout>
    );
};

export default Dashboard;