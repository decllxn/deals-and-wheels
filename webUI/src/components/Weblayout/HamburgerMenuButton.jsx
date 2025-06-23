import React from 'react';

const HamburgerMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      aria-label="Open main menu"
      className="group inline-flex w-12 h-12 items-center justify-center rounded-full transition focus:outline-none hover:opacity-75"
      onClick={onClick}
      aria-pressed={isOpen}
      style={{
        color: 'var(--text-color)',
      }}
    >
      <span className="sr-only">Menu</span>
      <svg className="w-6 h-6 fill-current pointer-events-none" viewBox="0 0 16 16">
        <rect
          className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] 
            ${isOpen ? "rotate-[315deg]" : "-translate-y-[5px] translate-x-[7px]"}`}
          y="7"
          width="9"
          height="2"
          rx="1"
        />
        <rect
          className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] 
            ${isOpen ? "rotate-45" : ""}`}
          y="7"
          width="16"
          height="2"
          rx="1"
        />
        <rect
          className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] 
            ${isOpen ? "rotate-[135deg]" : "translate-y-[5px]"}`}
          y="7"
          width="9"
          height="2"
          rx="1"
        />
      </svg>
    </button>
  );
};

export default HamburgerMenuButton;