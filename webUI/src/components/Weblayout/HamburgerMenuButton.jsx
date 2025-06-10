import React from 'react';

const HamburgerMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      aria-label="Open main menu"
      // Removed all background and shadow classes.
      // Used `rounded-full` for a circular hit area common for icon buttons.
      // Added `hover:opacity-75` for a subtle visual feedback on hover.
      className="group inline-flex w-12 h-12 text-center items-center justify-center rounded-full transition focus:outline-none md:hidden hover:opacity-75"
      onClick={onClick}
      aria-pressed={isOpen}
      style={{
        // Removed `backgroundColor`. The `color` property is still set to control the SVG fill.
        color: 'var(--text-color)', // Color of the SVG bars (inherited by fill-current)
      }}
    >
      <span className="sr-only">Menu</span>
      <svg className="w-6 h-6 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        {/* Top bar */}
        <rect
          className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] 
            ${isOpen ? "translate-x-0 translate-y-0 rotate-[315deg]" : "-translate-y-[5px] translate-x-[7px]"}`}
          y="7"
          width="9"
          height="2"
          rx="1"
        ></rect>
        {/* Middle bar */}
        <rect
          className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] 
            ${isOpen ? "rotate-45" : ""}`}
          y="7"
          width="16"
          height="2"
          rx="1"
        ></rect>
        {/* Bottom bar */}
        <rect
          className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] 
            ${isOpen ? "translate-y-0 rotate-[135deg]" : "translate-y-[5px] translate-x-[0px]"}`}
          y="7"
          width="9"
          height="2"
          rx="1"
        ></rect>
      </svg>
    </button>
  );
};

export default HamburgerMenuButton;