import React from "react";
import { Search, Funnel, Tag, Package, MapPin, Calendar } from "lucide-react";

const SparePartsFiltersModernShadow = () => (
  <div className="rounded-xl shadow-sm p-5 sticky top-4 z-10">
    <h2 className="text-lg font-semibold mb-3 text-[--text] flex items-center">
      <Funnel className="text-[--accent] mr-2" size={20} /> Filter Spare Parts
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <div className="relative shadow-inner rounded-md">
        <Search className="absolute left-3 top-2.5 text-[--text-muted] pointer-events-none" size={16} />
        <input
          type="text"
          placeholder="Search Category"
          className="rounded-md p-2 pl-9 text-[--text] w-full focus:outline-none"
        />
      </div>
      <select className="rounded-md p-2 text-[--text] focus:outline-none shadow-inner">
        <option>Condition</option>
        <option>New</option>
        <option>Used</option>
        <option>Refurbished</option>
      </select>
      <div className="relative shadow-inner rounded-md">
        <Package className="absolute left-3 top-2.5 text-[--text-muted] pointer-events-none" size={16} />
        <input
          type="text"
          placeholder="Dealer Name"
          className="rounded-md p-2 pl-9 text-[--text] w-full focus:outline-none"
        />
      </div>
      <div className="relative shadow-inner rounded-md">
        <MapPin className="absolute left-3 top-2.5 text-[--text-muted] pointer-events-none" size={16} />
        <input
          type="text"
          placeholder="Location"
          className="rounded-md p-2 pl-9 text-[--text] w-full focus:outline-none"
        />
      </div>
      <select className="rounded-md p-2 text-[--text] focus:outline-none shadow-inner">
        <option>Availability</option>
        <option>In Stock</option>
        <option>Out of Stock</option>
      </select>
      <div className="relative shadow-inner rounded-md">
        <Calendar className="absolute left-3 top-2.5 text-[--text-muted] pointer-events-none" size={16} />
        <input
          type="date"
          className="rounded-md p-2 pl-9 text-[--text] w-full focus:outline-none"
        />
      </div>
    </div>
  </div>
);

export default SparePartsFiltersModernShadow;