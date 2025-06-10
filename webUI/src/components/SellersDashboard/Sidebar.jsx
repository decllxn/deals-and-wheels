import React, { useState } from "react";
import { FaCar, FaWallet, FaChartBar, FaUser, FaBars, FaSignOutAlt, FaCog } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-white dark:bg-[#1f1f1f] shadow-lg h-full p-4 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 overflow-hidden border-r dark:border-gray-700`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl p-2 mb-6 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition"
      >
        <FaBars />
      </button>

      {/* User Profile (Only Visible in Expanded Mode) */}
      {isOpen && (
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="https://via.placeholder.com/80"
            alt="User"
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <h3 className="text-gray-700 dark:text-gray-200 font-semibold mt-2">John Doe</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Verified Seller</p>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1">
        <SidebarLink icon={<FaChartBar />} text="Dashboard" isOpen={isOpen} />
        <SidebarLink icon={<FaCar />} text="Listings" isOpen={isOpen} />
        <SidebarLink icon={<FaWallet />} text="Payments" isOpen={isOpen} />
        <SidebarLink icon={<FaUser />} text="Profile" isOpen={isOpen} />
      </nav>

      {/* Settings & Logout (Always Visible) */}
      <div className="mt-auto">
        <SidebarLink icon={<FaCog />} text="Settings" isOpen={isOpen} />
        <SidebarLink icon={<FaSignOutAlt />} text="Logout" isOpen={isOpen} />
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, text, isOpen }) => (
  <div
    className="relative flex items-center p-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition"
    data-tooltip-id={isOpen ? undefined : text}
  >
    <span className="text-xl text-gray-700 dark:text-gray-300">{icon}</span>
    {isOpen && <span className="ml-3 text-gray-700 dark:text-gray-300">{text}</span>}

    {/* Tooltip for collapsed mode */}
    {!isOpen && <Tooltip id={text} content={text} place="right" />}
  </div>
);

export default Sidebar;