import React from "react";

export default function PaymentsFiltersAndActions() {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 bg-[var(--bg)] p-4 rounded-2xl shadow-md">
      <div className="flex gap-2 flex-wrap">
        <select className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded px-3 py-1 text-[var(--text)]">
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="monthly">This Month</option>
          <option value="custom">Custom Range</option>
        </select>

        <select className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded px-3 py-1 text-[var(--text)]">
          <option value="">All Methods</option>
          <option value="mobile">Mobile Money</option>
          <option value="card">Card</option>
          <option value="bank">Bank Transfer</option>
        </select>

        <select className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded px-3 py-1 text-[var(--text)]">
          <option value="">All Segments</option>
          <option value="retail">Retail</option>
          <option value="dealer">Car Dealers</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button className="bg-[var(--accent)] text-white px-4 py-1 rounded hover:opacity-90 transition text-sm">
          Export CSV
        </button>
        <button className="bg-[var(--accent)] text-white px-4 py-1 rounded hover:opacity-90 transition text-sm">
          Export PDF
        </button>
        <button className="border border-[var(--accent)] text-[var(--accent)] px-4 py-1 rounded hover:bg-[var(--bg-secondary)] transition text-sm">
          + Manual Refund
        </button>
      </div>
    </div>
  );
}