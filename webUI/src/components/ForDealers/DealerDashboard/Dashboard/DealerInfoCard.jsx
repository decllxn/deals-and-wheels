import React from "react";
import { Globe, MapPin, Phone } from "lucide-react";

export default function DealerInfoCard({ dealer }) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* About Section */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--accent-color)] mb-1 uppercase tracking-wide">
          About
        </h2>
        <p className="text-[var(--muted-text)] leading-relaxed text-sm">
          {dealer.description || "No description provided."}
        </p>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-3">
        <InfoItem icon={<Globe />} label="Website" value={dealer.website} />
        <InfoItem icon={<Phone />} label="Contact" value={dealer.contact_number} />
        <InfoItem icon={<MapPin />} label="Address" value={dealer.address} />
      </div>

      {/* Stats */}
      <div className="md:col-span-2 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Cars Listed" value={dealer.cars_listed_count || 0} />
        <Stat label="Cars Sold" value={dealer.cars_sold_count || 0} />
        <Stat
          label="Total Cars"
          value={(dealer.cars_listed_count || 0) + (dealer.cars_sold_count || 0)}
        />
        <Stat
          label="Rating"
          value={
            dealer.rating_count > 0
              ? `${dealer.average_rating} ★ (${dealer.rating_count})`
              : "No Ratings"
          }
        />
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-[var(--muted-text)] text-sm">
      <div className="flex items-center justify-center w-6 h-6 rounded-full 
                      bg-[var(--accent-color)]/5 border border-[var(--border-color)]">
        {React.cloneElement(icon, { className: "w-3.5 h-3.5 stroke-[1.25] text-[var(--accent-color)]" })}
      </div>
      <span className="font-medium text-[var(--text-color)]">{label}:</span>
      <span className="truncate text-[var(--muted-text)]">{value || "N/A"}</span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-4 rounded-xl border border-[var(--border-color)] 
                    bg-[var(--surface-color)]/60 backdrop-blur-md text-center 
                    shadow-[0_4px_12px_var(--shadow-color)] transition-all 
                    hover:shadow-[0_6px_20px_var(--shadow-color)]">
      <p className="text-lg font-semibold text-[var(--text-color)]">{value}</p>
      <p className="text-[var(--muted-text)] text-xs tracking-wide uppercase">{label}</p>
    </div>
  );
}