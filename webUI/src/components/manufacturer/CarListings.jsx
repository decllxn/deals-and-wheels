import { useState } from 'react';
import { CarListingsViewSelector } from './listings/CarListingsViewSelector';
import { CarListingsFilterBar } from './listings/CarListingsFilterBar';
import { CarListingsGrid } from './listings/CarListingsGrid';

export function CarListings({ cars }) {
  const [selectedType, setSelectedType] = useState('All');
  const [activeView, setActiveView] = useState('New');

  const filteredCars = selectedType === 'All'
    ? cars
    : cars.filter(car => car.type?.toLowerCase() === selectedType.toLowerCase());

  const filteredByView = filteredCars.filter(car => {
    if (activeView === 'Used') return car.used === true;
    if (activeView === 'Auction') return car.auction === true;
    return car.used === false && !car.auction;
  });

  return (
    <section
      className="px-6 py-16 md:py-24 space-y-12 max-w-7xl mx-auto"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Browse and Compare All {cars[0]?.brand || 'Brand'} Models
        </h2>
        <p className="text-lg text-[var(--muted-text)]">
          Filter by body type, then explore by availability.
        </p>
      </div>

      {/* Centered View Selector */}
      <div className="max-w-fit mx-auto">
        <CarListingsViewSelector
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>

      <CarListingsFilterBar
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <CarListingsGrid cars={filteredByView} />
    </section>
  );
}
