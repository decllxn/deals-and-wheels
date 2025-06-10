import React from "react";
import { AlertTriangle } from "lucide-react";

const healthFlags = [
  { flag: "Missing Images", count: 5 },
  { flag: "Missing Prices", count: 2 },
  { flag: "Older than 60 Days", count: 10 },
  { flag: "No Dealer Response", count: 3 },
  { flag: "Incomplete Descriptions", count: 8 },
];

const ListingHealthFlagsPanel = () => (
  <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg">
    <div className="flex items-center mb-6">
      <div className="text-4xl text-[var(--accent)] mr-4">
        <AlertTriangle />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          📉 Listings Health & Quality Warnings
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Issues affecting listing quality.
        </p>
      </div>
    </div>
    <ul className="list-none space-y-3">
      {healthFlags.map((item, idx) => (
        <li
          key={idx}
          className="flex justify-between items-center text-[var(--text)] py-2 border-b border-[var(--border)] last:border-b-0"
        >
          <span className="text-[var(--text-muted)]">{item.flag}</span>
          <span className="font-semibold px-3 py-1 bg-gray-100 rounded-full text-sm">
            {item.count}
          </span>
        </li>
      ))}
    </ul>
    <button className="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
      Fix All
    </button>
  </div>
);

export default ListingHealthFlagsPanel;