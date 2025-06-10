import React from "react";
import { FaCar, FaWallet, FaChartBar, FaUser } from "react-icons/fa";

const HorizontalSidebar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-around overflow-x-auto scrollbar-hide">
      <SidebarLink icon={<FaChartBar />} text="Dashboard" />
      <SidebarLink icon={<FaCar />} text="Listings" />
      <SidebarLink icon={<FaWallet />} text="Payments" />
      <SidebarLink icon={<FaUser />} text="Profile" />
    </div>
  );
};

const SidebarLink = ({ icon, text }) => (
  <div className="text-center cursor-pointer">
    <span className="text-xl">{icon}</span>
    <p className="text-sm">{text}</p>
  </div>
);

export default HorizontalSidebar;