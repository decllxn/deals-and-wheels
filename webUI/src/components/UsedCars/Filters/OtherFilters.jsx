import React from "react";
import AccordionSection from "./AccordionSection";

// Reusable Range Filter component
const RangeFilter = ({ label, min, max, step = 1, value, onChange, paramKeys }) => (
  <div className="mb-4">
    <label className="block mb-2 font-medium">{label}</label>
    <div className="flex items-center justify-between mb-2 text-sm">
      <span>{value[0]}</span>
      <span>{value[1]}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0] ?? min}
      onChange={(e) => onChange([Number(e.target.value), value[1]], paramKeys)}
      className="w-full mb-1"
    />
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[1] ?? max}
      onChange={(e) => onChange([value[0], Number(e.target.value)], paramKeys)}
      className="w-full"
    />
  </div>
);

// Reusable Checkbox Pill
const CheckboxPill = ({ label, checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`px-3 py-1 rounded-full border text-sm transition 
      ${
        checked
          ? "bg-[var(--accent-color)] text-white border-[var(--accent-color)]"
          : "bg-transparent text-[var(--text-color)] border-[var(--border-color)]"
      }`}
  >
    {label}
  </button>
);

// 🔹 Central Config
const FILTER_CONFIG = [
  {
    type: "range",
    title: "Year",
    label: "Year Range",
    paramKeys: ["min_year", "max_year"],
    min: 2000,
    max: 2025,
    step: 1,
  },
  {
    type: "range",
    title: "Price ($)",
    label: "Price Range",
    paramKeys: ["min_price", "max_price"],
    min: 1000,
    max: 100000,
    step: 500,
  },
  {
    type: "range",
    title: "Mileage (KM)",
    label: "Mileage",
    paramKeys: ["min_mileage", "max_mileage"],
    min: 0,
    max: 300000,
    step: 1000,
  },
  {
    type: "checkbox",
    title: "Fuel Type",
    paramKey: "fuel_type",
    options: ["Petrol", "Diesel", "Hybrid", "Electric"],
  },
  {
    type: "checkbox",
    title: "Transmission",
    paramKey: "transmission",
    options: ["Automatic", "Manual"],
  },
  {
    type: "checkbox",
    title: "Body Type",
    paramKey: "body_style",
    options: ["Sedan", "SUV", "Hatchback", "Coupe", "Pickup", "Van"],
  },
  {
    type: "checkbox",
    title: "Seller Type",
    paramKey: "seller_type",
    options: ["Dealer", "Private Seller"],
  },
  {
    type: "checkbox",
    title: "Condition",
    paramKey: "condition",
    options: ["New", "Used", "Certified Pre-Owned"],
  },
];

const OtherFilters = ({ filters, setFilters }) => {
  // 🔹 Range handler
  const handleRangeChange = (newValue, [minKey, maxKey]) => {
    setFilters((prev) => ({
      ...prev,
      [minKey]: newValue[0],
      [maxKey]: newValue[1],
    }));
  };

  // 🔹 Toggle handler (for checkboxes)
  const handleToggle = (paramKey, value, checked) => {
    setFilters((prev) => {
      const existing = prev?.[paramKey] ? prev[paramKey].split(",") : [];
      let updated;

      if (checked) {
        updated = [...existing, value];
      } else {
        updated = existing.filter((v) => v !== value);
      }

      return {
        ...prev,
        [paramKey]: updated.length > 0 ? updated.join(",") : undefined,
      };
    });
  };

  const isChecked = (paramKey, value) =>
    filters?.[paramKey]?.split(",").includes(value) ?? false;

  return (
    <>
      {FILTER_CONFIG.map((filter) =>
        filter.type === "range" ? (
          <AccordionSection key={filter.title} title={filter.title}>
            <RangeFilter
              label={filter.label}
              min={filter.min}
              max={filter.max}
              step={filter.step}
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