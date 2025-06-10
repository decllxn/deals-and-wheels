import React, { useState } from 'react';
import {
  Gauge, Settings, Car, Fuel, Users, MapPin,
  ClipboardList, CreditCard, StickyNote
} from 'lucide-react';
import SidebarDrawer from './SidebarDrawer';
import VehicleFeatures from './VehicleFeatures';

export default function VehicleDetails({ car }) {
  const [openSidebar, setOpenSidebar] = useState(null);

  // ✅ Safe guard for features object
  const features = car?.features || {};

  const column1 = [
    { label: 'Mileage', value: `${car.mileage?.toLocaleString() ?? 'N/A'} km`, icon: <Gauge className="w-5 h-5 text-[var(--accent-color)]" /> },
    { label: 'Transmission', value: car.transmission ?? 'N/A', icon: <Settings className="w-5 h-5 text-[var(--accent-color)]" /> },
    { label: 'Engine', value: car.engine ?? 'N/A', icon: <Car className="w-5 h-5 text-[var(--accent-color)]" /> },
  ];

  const column2 = [
    { label: 'Fuel Type', value: car.fuelType ?? 'N/A', icon: <Fuel className="w-5 h-5 text-[var(--accent-color)]" /> },
    { label: 'Drive Type', value: car.driveType ?? 'N/A', icon: <Users className="w-5 h-5 text-[var(--accent-color)]" /> },
    { label: 'Location', value: car.location ?? 'N/A', icon: <MapPin className="w-5 h-5 text-[var(--accent-color)]" /> },
  ];

  // Comfort features — these will match your Django boolean fields
  const comfortFeatures = [
    { label: 'Sat Nav', value: features?.satNav ?? false },
    { label: 'Bluetooth', value: features?.bluetooth ?? false },
    { label: 'Cruise Control', value: features?.cruiseControl ?? false },
    { label: 'Climate Control', value: features?.climateControl ?? false },
    { label: 'Leather Seats', value: features?.leatherSeats ?? false },
    { label: 'ISOFix Seats', value: features?.isoFix ?? false },
    { label: 'Parking Sensors', value: features?.parkingSensors ?? false },
    { label: 'Remote Locking', value: features?.remoteLocking ?? false },
  ];

  const safetyFeatures = [
    { label: 'ABS', value: features?.abs ?? false },
    { label: 'Airbags', value: features?.airbags ?? false },
    { label: 'Lane Assist', value: features?.laneAssist ?? false },
    { label: 'Hill Start Assist', value: features?.hillStartAssist ?? false },
    { label: 'Auto Emergency Braking', value: features?.aeb ?? false },
    { label: 'Blind Spot Monitor', value: features?.blindSpot ?? false },
    { label: 'Rear Camera', value: features?.rearCamera ?? false },
    { label: 'Tyre Pressure Monitoring', value: features?.tyrePressure ?? false },
  ];

  const dealerNotes = `
    This car has been very well maintained, full service history available.
    Non-smoker vehicle. Ready for immediate delivery.
  `;

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
    <div>
      <h2 className="text-xl font-semibold mb-6 text-[var(--text-color)]">Vehicle Specifications</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        <div className="flex flex-col gap-6">{column1.map(renderSpec)}</div>
        <div className="flex flex-col gap-6">{column2.map(renderSpec)}</div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-7">
        <button
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-lg border border-[var(--border-color)] bg-transparent hover:bg-[var(--highlight-color)] transition-all"
          onClick={() => setOpenSidebar('history')}
        >
          <ClipboardList className="w-4 h-4" /> Car History
        </button>

        <button
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-lg border border-[var(--border-color)] bg-transparent hover:bg-[var(--highlight-color)] transition-all"
          onClick={() => setOpenSidebar('running')}
        >
          <CreditCard className="w-4 h-4" /> Running Costs
        </button>
      </div>

      <VehicleFeatures comfortFeatures={comfortFeatures} safetyFeatures={safetyFeatures} />

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-color)] flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-[var(--accent-color)]" /> Dealer Notes
        </h2>
        <p className="text-[var(--muted-text)] text-sm leading-relaxed whitespace-pre-line">{dealerNotes}</p>
      </div>

      <SidebarDrawer isOpen={openSidebar === 'history'} onClose={() => setOpenSidebar(null)} title="Car History">
        <p>This is the car history placeholder. You can load car accident reports, ownership records, service history, etc.</p>
      </SidebarDrawer>

      <SidebarDrawer isOpen={openSidebar === 'running'} onClose={() => setOpenSidebar(null)} title="Running Costs">
        <p>This is the running costs placeholder. You can show estimated fuel costs, insurance, maintenance costs, etc.</p>
      </SidebarDrawer>
    </div>
  );
}
