import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import DashboardLayout from "../components/BuyersDashboard/DashboardLayout";
import DashboardHome from "../components/BuyersDashboard/DashboardHome"; // Import DashboardHome
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";

const BuyersDashBoard = () => {
  return (
    <div className="mt-14">
      <Navbar />
      <DashboardLayout>
        <DashboardHome /> {/* Include DashboardHome */}
      </DashboardLayout>
      <WhyDealsAndWheels />
      <Footer />
    </div>
  );
};

export default BuyersDashBoard;