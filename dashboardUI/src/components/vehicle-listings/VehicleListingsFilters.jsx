import React, { useState } from "react";
import { Filter } from "lucide-react";

const VehicleListingsFilters = () => {
  const [filters, setFilters] = useState({
    vehicleType: "All",
    dealer: "All",
    location: "All",
    priceRange: [0, 50000],
    status: "Active",
    timeListed: "All",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[var(--bg)] rounded-3xl p-6 shadow-lg sticky top-0">
      <div className="flex items-center mb-6">
        <div className="text-4xl text-[var(--accent)] mr-4">
          <Filter />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            🕹️ Filter & Control Panel
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Adjust listings based on your criteria.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[var(--text)]">Vehicle Type</label>
          <select
            name="vehicleType"
            value={filters.vehicleType}
            onChange={handleFilterChange}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] p-3 rounded-lg text-[var(--text)]"
          >
            <option value="All">All</option>
            <option value="Car">Car</option>
            <option value="Truck">Truck</option>
            <option value="Motorcycle">Motorcycle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-[var(--text)]">Dealer</label>
          <select
            name="dealer"
            value={filters.dealer}
            onChange={handleFilterChange}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] p-3 rounded-lg text-[var(--text)]"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-[var(--text)]">Location</label>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] p-3 rounded-lg text-[var(--text)]"
          >
            <option value="All">All</option>
            <option value="New York">New York</option>
            <option value="California">California</option>
            <option value="Texas">Texas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-[var(--text)]">Price Range</label>
          <input
            type="range"
            min="0"
            max="50000"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-[var(--text-muted)]">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-[var(--text)]">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] p-3 rounded-lg text-[var(--text)]"
          >
            <option value="Active">Active</option>
            <option value="Sold">Sold</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-[var(--text)]">Time Listed</label>
          <select
            name="timeListed"
            value={filters.timeListed}
            onChange={handleFilterChange}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] p-3 rounded-lg text-[var(--text)]"
          >
            <option value="All">All</option>
            <option value="Past Week">Past Week</option>
            <option value="Past Month">Past Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VehicleListingsFilters;