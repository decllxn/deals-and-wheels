import React from "react";

const SidebarSubItem = ({ label, onClick }) => (
  <div
    onClick={onClick}
    className="text-sm cursor-pointer hover:text-[var(--accent-color)] transition-all"
  >
    {label}
  </div>
);

export default SidebarSubItem;