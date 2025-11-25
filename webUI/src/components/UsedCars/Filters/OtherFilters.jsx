import React from "react";
import AccordionSection from "./AccordionSection";

// 🔹 Minimal Range Input — no label above, users type directly
const RangeInput = ({ min, max, step = 1, value, onChange, paramKeys, unit = "" }) => {
  const handleInput = (index, newVal) => {
    const numericVal = Number(newVal);
    if (isNaN(numericVal)) return;

    let newValues = [...value];
    newValues[index] = Math.min(max, Math.max(min, numericVal));
    onChange(newValues, paramKeys);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => handleInput(0, e.target.value)}
        className="flex-1 px-2 py-1 text-sm border-b border-[var(--border-color)] text-[var(--text-color)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
        placeholder="Min"
      />
      <span className="text-[var(--muted-text)] font-medium">—</span>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => handleInput(1, e.target.value)}
        className="flex-1 px-2 py-1 text-sm border-b border-[var(--border-color)] text-[var(--text-color)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
        placeholder="Max"
      />
      {unit && <span className="text-sm text-[var(--muted-text)]">{unit}</span>}
    </div>
  );
};

// 🔹 Checkbox Pill — subtle, responsive
const CheckboxPill = ({ label, checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`px-3 py-1 rounded-full text-sm font-medium transition whitespace-nowrap
      ${checked
        ? "bg-[var(--accent-color)] text-white border border-[var(--accent-color)]"
        : "bg-transparent text-[var(--text-color)] border border-[var(--border-color)] hover:bg-[var(--highlight-color)] hover:text-white"
      }`}
  >
    {label}
  </button>
);

// 🔹 Central Filter Configuration
const FILTER_CONFIG = [
  { type: "range", title: "Year", paramKeys: ["min_year", "max_year"], min: 2000, max: 2025, step: 1, unit: "" },
  { type: "range", title: "Price (KSh)", paramKeys: ["min_price", "max_price"], min: 50000, max: 8000000, step: 100000, unit: "KSh" },
  { type: "range", title: "Mileage (KM)", paramKeys: ["min_mileage", "max_mileage"], min: 0, max: 300000, step: 1000, unit: "KM" },
  { type: "checkbox", title: "Fuel Type", paramKey: "fuel_type", options: ["Petrol", "Diesel", "Hybrid", "Electric"] },
  { type: "checkbox", title: "Transmission", paramKey: "transmission", options: ["Automatic", "Manual"] },
  { type: "checkbox", title: "Body Type", paramKey: "body_style", options: ["Sedan", "SUV", "Hatchback", "Coupe", "Pickup", "Van"] },
  { type: "checkbox", title: "Seller Type", paramKey: "seller_type", options: ["Dealer", "Private Seller"] },
  { type: "checkbox", title: "Condition", paramKey: "condition", options: ["New", "Used", "Certified Pre-Owned"] },
];

// 🔹 Main Filter Component
const OtherFilters = ({ filters, setFilters }) => {
  const handleRangeChange = (newValue, [minKey, maxKey]) => {
    setFilters((prev) => ({
      ...prev,
      [minKey]: newValue[0],
      [maxKey]: newValue[1],
    }));
  };

  const handleToggle = (paramKey, value, checked) => {
    setFilters((prev) => {
      const existing = prev?.[paramKey] ? prev[paramKey].split(",") : [];
      const updated = checked
        ? [...existing, value]
        : existing.filter((v) => v !== value);
      return { ...prev, [paramKey]: updated.length > 0 ? updated.join(",") : undefined };
    });
  };

  const isChecked = (paramKey, value) =>
    filters?.[paramKey]?.split(",").includes(value) ?? false;

  return (
    <>
      {FILTER_CONFIG.map((filter) =>
        filter.type === "range" ? (
          <AccordionSection key={filter.title} title={filter.title}>
            <RangeInput
              min={filter.min}
              max={filter.max}
              step={filter.step}
              unit={filter.unit}
              value={[
                filters?.[filter.paramKeys[0]] ?? filter.min,
                filters?.[filter.paramKeys[1]] ?? filter.max,
              ]}
              onChange={handleRangeChange}
              paramKeys={filter.paramKeys}
            />
          </AccordionSection>
        ) : (
          <AccordionSection key={filter.title} title={filter.title}>
            <div className="flex flex-wrap gap-2">
              {filter.options.map((opt) => (
                <CheckboxPill
                  key={opt}
                  label={opt}
                  checked={isChecked(filter.paramKey, opt)}
                  onChange={(val) => handleToggle(filter.paramKey, opt, val)}
                />
              ))}
            </div>
          </AccordionSection>
        )
      )}
    </>
  );
};

export default OtherFilters;