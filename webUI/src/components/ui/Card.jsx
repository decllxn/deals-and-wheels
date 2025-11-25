import React from "react";

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-[var(--surface-color)] text-[var(--text-color)] 
      rounded-2xl shadow-sm hover:shadow-md 
      border border-[var(--border-color)] 
      transition-all duration-300 overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;