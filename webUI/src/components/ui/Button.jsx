// components/ui/Button.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  variant = "solid",
  size = "md",
  color = "default",
  className = "",
}) => {
  const base =
    "rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]";
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
  };

  const variants = {
    solid: "bg-[var(--text-color)] text-[var(--bg-color)] hover:bg-[var(--muted-text)]",
    ghost: "bg-transparent hover:bg-[var(--border-color)] text-[var(--muted-text)]",
  };

  const colors = {
    default: "",
    danger: "text-red-500 hover:text-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${colors[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;