import React from "react";
import Sidebar from "./Sidebar";
import HorizontalSidebar from "./HorizontalSidebar";
import Topbar from "./Topbar";
import WhyBuy from "./WhyBuy"

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <div className="lg:flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <Topbar />
          <div className="lg:hidden">
            <HorizontalSidebar />
          </div>
          <main className="p-6 bg-gray-100 flex-1">
            {children}
            <WhyBuy />
          </main>
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;