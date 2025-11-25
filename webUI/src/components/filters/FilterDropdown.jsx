import React from "react";
import { FaChevronDown } from "react-icons/fa";

const FilterDropdown = ({
  name,
  value,
  options = [],
  onChange,
  icon = <FaChevronDown />,
}) => {
  const selectBase =
    "relative w-full px-4 py-3 rounded-lg focus:ring-2 appearance-none " +
    "bg-[var(--surface-color)] text-[var(--text-color)] border border-[var(--border-color)] " +
    "focus:ring-[var(--accent-color)]";
  const iconStyle =
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-text)]";

  const label = name
    .replace("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={selectBase}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className={iconStyle}>{icon}</div>
    </div>
  );
};

export default FilterDropdown;