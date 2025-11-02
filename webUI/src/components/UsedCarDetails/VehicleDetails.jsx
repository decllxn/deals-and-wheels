import React, { useState } from "react";
import {
  Gauge,
  Settings,
  Car,
  Fuel,
  Users,
  MapPin,
  ClipboardList,
  CreditCard,
  StickyNote,
  Shield,
} from "lucide-react";
import SidebarDrawer from "./SidebarDrawer";
import VehicleFeatures from "./VehicleFeatures";

export default function VehicleDetails({ car }) {
  const [openSidebar, setOpenSidebar] = useState(null);

  if (!car) return <p>Loading car details...</p>;

  // ✅ Safeguard values
  const {
    title,
    manufacturer,
    dealer,
    features = [],
    equipment = [],
    location,
    price,
    mileage,
    transmission,
    drivetrain,
    engine,
    fuel_type,
    body_style,
    exterior_color,
    interior_color,
    vin,
    description,
  } = car;

  const column1 = [
    {
      label: "Mileage",
      value: `${mileage?.toLocaleString() ?? "N/A"} km`,
      icon: <Gauge className="w-5 h-5 text-[var(--accent-color)]" />,
    },
    {
      label: "Transmission",
      value: transmission ?? "N/A",
      icon: <Settings className="w-5 h-5 text-[var(--accent-color)]" />,
    },
    {
      label: "Engine",
      value: engine ?? "N/A",
      icon: <Car className="w-5 h-5 text-[var(--accent-color)]" />,
    },
  ];

  const column2 = [
    {
      label: "Fuel Type",
      value: fuel_type ?? "N/A",
      icon: <Fuel className="w-5 h-5 text-[var(--accent-color)]" />,
    },
    {
      label: "Drivetrain",
      value: drivetrain ?? "N/A",
      icon: <Users className="w-5 h-5 text-[var(--accent-color)]" />,
    },
    {
      label: "Location",
      value: location ?? "N/A",
      icon: <MapPin className="w-5 h-5 text-[var(--accent-color)]" />,
    },
  ];

  const renderSpec = (spec) => (
    <div key={spec.label}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 text-[var(--text-color)]">
          {spec.icon}
          <span className="font-medium">{spec.label}</span>
        </div>
        <p className="text-[var(--muted-text)]">{spec.value}</p>
      </div>
      <hr className="border-[var(--border-color)] mt-4" />
    </div>
  );

  return (
    <div className="w-full">
      {/* --- Title and Price --- */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-color)]">{title}</h1>
      </div>

      {/* --- Manufacturer & Dealer --- */}
      <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
        <div className="flex items-center gap-3">
          {manufacturer?.logo && (
            <img
              src={manufacturer.logo}
              alt={manufacturer.name}
              className="w-12 h-12 object-contain"
            />
          )}
          <div>
            <p className="text-sm text-[var(--muted-text)]">Manufacturer</p>
            <h3 className="font-semibold">{manufacturer?.name}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {dealer?.logo && (
            <img
              src={dealer.logo}
              alt={dealer.name}
              className="w-12 h-12 object-contain rounded-full"
            />
          )}
          <div>
            <p className="text-sm text-[var(--muted-text)]">Dealer</p>
            <h3 className="font-semibold flex items-center gap-2">
              {dealer?.name}
              {dealer?.is_verified && (
                <Shield className="w-4 h-4 text-green-500" />
              )}
            </h3>
            <a
              href={dealer?.website}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent-color)] text-sm"
            >
              {dealer?.website}
            </a>
          </div>
        </div>
      </div>

      {/* --- Specifications --- */}
      <h2 className="text-xl font-semibold mb-6 text-[var(--text-color)]">
        Vehicle Specifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        <div className="flex flex-col gap-6">{column1.map(renderSpec)}</div>
        <div className="flex flex-col gap-6">{column2.map(renderSpec)}</div>
      </div>

      {/* --- Features & Equipment --- */}
      <VehicleFeatures features={features} equipment={equipment} />
      
      {/* --- Extra Actions --- */}
      <div className="flex flex-col md:flex-row gap-4 mt-10">
        <button
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-lg border border-[var(--border-color)] bg-transparent hover:bg-[var(--highlight-color)] transition-all"
          onClick={() => setOpenSidebar("history")}
        >
          <ClipboardList className="w-4 h-4" /> Car History
        </button>

        <button
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-lg border border-[var(--border-color)] bg-transparent hover:bg-[var(--highlight-color)] transition-all"
          onClick={() => setOpenSidebar("running")}
        >
          <CreditCard className="w-4 h-4" /> Running Costs
        </button>
      </div>

      {/* --- Drawers --- */}
      <SidebarDrawer
        isOpen={openSidebar === "history"}
        onClose={() => setOpenSidebar(null)}
        title="Car History"
      >
        <p>
          You can load car accident reports, ownership records, and service
          history here.
        </p>
      </SidebarDrawer>

      <SidebarDrawer
        isOpen={openSidebar === "running"}
        onClose={() => setOpenSidebar(null)}
        title="Running Costs"
      >
        <p>
          Show estimated fuel costs, insurance, and maintenance cost summaries
          here.
        </p>
      </SidebarDrawer>
    </div>
  );
}