import React from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";

const SidebarListView = ({ title, onBack, onClose }) => (
  <div className="space-y-4 relative">
    <div className="flex justify-between items-center mb-4">
      <button onClick={onBack} className="flex items-center space-x-2 text-sm text-[var(--text-color)]">
        <FaArrowLeft />
        <span>Back</span>
      </button>
      <button onClick={onClose} className="text-[var(--text-color)] text-lg">
        <FaTimes />
      </button>
    </div>
    <h2 className="text-xl font-semibold text-[var(--text-color)] mb-2">{title}</h2>
    <ul className="space-y-2 text-[var(--text-color)]">
      <li>Placeholder 1</li>
      <li>Placeholder 2</li>
      <li>Placeholder 3</li>
      <li>Placeholder 4</li>
    </ul>
  </div>
);

export default SidebarListView;