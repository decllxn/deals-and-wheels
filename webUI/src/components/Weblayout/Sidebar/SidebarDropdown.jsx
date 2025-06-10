import React, { useState } from "react";
import { FaArrowLeft, FaCar, FaGavel } from "react-icons/fa";

const iconMap = {
  car: <FaCar />,
  gavel: <FaGavel />,
};

const SidebarDropdown = ({ label, icon, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-[var(--text-color)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full py-2 hover:text-[var(--accent-color)] transition-all"
      >
        <span className="flex items-center space-x-3">
          {iconMap[icon]}
          <span>{label}</span>
        </span>
        <FaArrowLeft className={`transform transition-transform ${open ? "rotate-90" : "-rotate-90"}`} />
      </button>
      {open && <div className="pl-8 space-y-2 mt-2">{children}</div>}
    </div>
  );
};

export default SidebarDropdown;