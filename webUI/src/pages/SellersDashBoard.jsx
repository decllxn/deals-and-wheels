import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import DashboardLayout from "../components/SellersDashboard/DashboardLayout";
import DashboardHome from "../components/SellersDashboard/DashboardHome"; // Import DashboardHome
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";

const SellersDashBoard = () => {
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

export default SellersDashBoard;