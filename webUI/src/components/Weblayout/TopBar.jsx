import React from "react";
import LeftButtons from "./topbar/LeftButtons";
import SeeMoreButton from "./topbar/SeeMoreButton";
import ThemeSwitcher from "./topbar/ThemeSwitcher";

const TopBar = ({ onSeeMoreClick }) => {
  return (
    <div
      className="w-full px-3 sm:px-6 py-1.5 border-b text-sm"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left Buttons */}
        <LeftButtons />

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <SeeMoreButton onClick={onSeeMoreClick} />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default TopBar;