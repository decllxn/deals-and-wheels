import React from "react";

const HamburgerMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      aria-label="Open main menu"
      className="relative w-10 h-10 bg-transparent text-current focus:outline-none md:hidden"
      onClick={onClick}
    >
      <div className="w-5 h-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span
          className={`absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out
            ${isOpen ? "rotate-45" : "-translate-y-1.5"}`}
        />
        <span
          className={`absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out
            ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out
            ${isOpen ? "-rotate-45" : "translate-y-1.5"}`}
        />
      </div>
    </button>
  );
};

export default HamburgerMenuButton;