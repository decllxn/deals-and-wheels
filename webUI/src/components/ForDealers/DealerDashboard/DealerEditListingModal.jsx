import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import useDealerEditListingForm from "@hooks/useDealerEditListingForm";
import DealerImagesUploader from "./DealerImagesUploader"; // Import the new images component

export default function DealerEditListingModal({ car, onClose }) {
  const {
    formData,
    handleChange,
    handleListChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmit,
  } = useDealerEditListingForm(car, onClose);

  const choiceOptions = {
    transmission: ["Automatic", "Manual", "CVT", "Dual-Clutch", "Semi-Automatic", "Other"],
    drivetrain: ["FWD", "RWD", "AWD", "4WD"],
    fuel_type: ["Petrol", "Diesel", "Hybrid", "Electric"],
    body_style: ["Sedan", "SUV", "Hatchback", "Truck", "Coupe", "Convertible", "Wagon", "Other"],
    title_status: ["Clean", "Salvage", "Rebuilt", "Parts Only"],
    condition: ["New", "Used"],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-md bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--text-color)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[var(--accent-color)]">Edit Listing</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-[var(--border-color)]">
            <X className="w-5 h-5 stroke-[1.25] text-[var(--accent-color)]" />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            {["title", "make", "model", "year"].map((field) => (
              <input
                key={field}
                type={field === "year" ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-3 rounded-lg border border-[var(--border-color)] placeholder-[var(--muted-text)] focus:ring-1 focus:ring-[var(--highlight-color)] focus:outline-none"
              />
            ))}
          </div>

          {/* Price & Mileage */}
          <div className="grid grid-cols-2 gap-4">
            {["price", "mileage"].map((field) => (
              <input
                key={field}
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-3 rounded-lg border border-[var(--border-color)] placeholder-[var(--muted-text)] focus:ring-1 focus:ring-[var(--highlight-color)] focus:outline-none"
              />
            ))}
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-3 gap-4">
            {["transmission", "drivetrain", "fuel_type"].map((field) => (
              <div key={field} className="relative">
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-[var(--border-color)] focus:ring-1 focus:ring-[var(--highlight-color)] focus:outline-none appearance-none"
                >
                  <option value="">Select {field.replace("_", " ")}</option>
                  {choiceOptions[field].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-text)] pointer-events-none">▼</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["body_style", "title_status", "condition"].map((field) => (
              <div key={field} className="relative">
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-[var(--border-color)] focus:ring-1 focus:ring-[var(--highlight-color)] focus:outline-none appearance-none"
                >
                  <option value="">Select {field.replace("_", " ")}</option>
                  {choiceOptions[field].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-text)] pointer-events-none">▼</span>
              </div>
            ))}
          </div>

          {/* Colors, VIN, Engine */}
          <div className="grid grid-cols-3 gap-4">
            {["exterior_color", "interior_color", "vin"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.replace("_", " ").toUpperCase()}
                className="w-full p-3 rounded-lg border border-[var(--border-color)] placeholder-[var(--muted-text)] focus:ring-1 focus:ring-[var(--highlight-color)] focus:outline-none"
              />
            ))}
          </div>

          <input
            type="text"
            name="engine"
            value={formData.engine}
            onChange={handleChange}
            placeholder="Engine"
            className="w-full p-3 rounded-lg border border-[var(--border-color)] placeholder-[var(--muted-text)] focus:ring-1 focus:ring-[var(--highlight-color)] focus:outline-none"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="w-full p-3 rounded-lg border border-[var(--border-color)] placeholder-[var(--muted-text)] focus:ring-1 focus:ring-[var(--highlight-color)] focus:outline-none"
          />

          {/* Checkboxes */}
          <div className="flex gap-6">
            {["is_featured", "is_sold", "has_warranty"].map((field) => (
              <label key={field} className="flex items-center gap-2 font-medium text-[var(--accent-color)]">
                <input
                  type="checkbox"
                  name={field}
                  checked={formData[field]}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[var(--highlight-color)]"
                />
                {field.replace("is_", "").replace("_", " ").toUpperCase()}
              </label>
            ))}
          </div>

          {/* Images Section using the extracted component */}
          <DealerImagesUploader
            images={formData.images}
            onAdd={() => handleAddItem("images")}
            onRemove={(idx) => handleRemoveItem("images", idx)}
            onChange={handleChange}
          />

          {/* Features, Equipment, Modifications */}
          {["features", "equipment", "modifications"].map((listName) => (
            <div key={listName} className="mb-4">
              <h3 className="font-semibold mb-2 text-[var(--accent-color)]">
                {listName.charAt(0).toUpperCase() + listName.slice(1)}
              </h3>
              {formData[listName].map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleListChange(listName, idx, e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--border-color)] placeholder-[var(--muted-text)] focus:ring-1 focus:ring-[var(--highlight-color)]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(listName, idx)}
                    className="px-3 py-1 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(listName)}
                className="px-4 py-2 bg-[var(--highlight-color)] hover:bg-[var(--accent-hover)] text-white rounded transition"
              >
                Add {listName.slice(0, -1)}
              </button>
            </div>
          ))}

          {/* Form Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-[var(--border-color)] text-[var(--accent-color)] font-semibold rounded hover:bg-[var(--accent-hover)] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[var(--accent-color)] text-white font-semibold rounded hover:bg-[var(--accent-hover)] transition"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}