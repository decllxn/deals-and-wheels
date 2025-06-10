import React from "react";

export default function InventorySearchFilters() {
  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md space-y-4">
      <h2 className="text-xl font-bold text-[var(--text)] mb-2">🔍 Advanced Search & Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input className="input-style" placeholder="Search by product name..." />
        <select className="input-style">
          <option>All Types</option>
          <option>Cars</option>
          <option>Spare Parts</option>
          <option>Auctions</option>
        </select>
        <select className="input-style">
          <option>All Dealers</option>
          <option>Dealer A</option>
          <option>Dealer B</option>
        </select>
        <select className="input-style">
          <option>Availability</option>
          <option>In Stock</option>
          <option>Out of Stock</option>
        </select>
        <input className="input-style" type="date" placeholder="Date Listed" />
        <input className="input-style" placeholder="Location" />
      </div>
      <button className="bg-[var(--accent)] text-white px-4 py-2 rounded-xl hover:opacity-90">
        Apply Filters
      </button>
    </div>
  );
}