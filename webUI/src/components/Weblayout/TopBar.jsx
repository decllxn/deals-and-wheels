import React from "react";
import LeftButtons from "./topbar/LeftButtons";
import Breadcrumbs from "./topbar/Breadcrumbs";
import SeeMoreButton from "./topbar/SeeMoreButton";
import ThemeSwitcher from "./topbar/ThemeSwitcher";

const TopBar = ({ onSeeMoreClick }) => {
  return (
    <div
      className="w-full px-4 sm:px-8 py-2 border-b"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left Buttons */}
        <LeftButtons />

        {/* Centered Breadcrumb */}
        <Breadcrumbs />

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <SeeMoreButton onClick={onSeeMoreClick} />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default TopBar;