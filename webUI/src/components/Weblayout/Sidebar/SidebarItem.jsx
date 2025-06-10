import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const iconMap = {
  cart: <FaShoppingCart />,
};

const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center space-x-3 text-[var(--text-color)] py-2 cursor-pointer hover:text-[var(--accent-color)] transition-all">
    {iconMap[icon]}
    <span>{label}</span>
  </div>
);

export default SidebarItem;