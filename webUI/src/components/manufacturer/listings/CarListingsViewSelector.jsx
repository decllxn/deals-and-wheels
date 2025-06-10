import React from 'react';
import { motion } from 'framer-motion';
import { CarFront, Clock3 } from 'lucide-react'; // Cleaner, more subtle icons

export function CarListingsViewSelector({ activeView, setActiveView }) {
  const views = [
    { label: 'New', icon: <CarFront size={18} /> },
    { label: 'Used', icon: <Clock3 size={18} /> },
  ];

  return (
    <div className="relative inline-flex space-x-6 sm:space-x-8">
      {views.map((view) => (
        <div key={view.label} className="relative">
          <button
            onClick={() => setActiveView(view.label)}
            className={`
              flex items-center gap-1 text-sm md:text-base font-medium pb-1 
              transition-colors duration-200 focus:outline-none 
              focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] rounded-sm
              ${activeView === view.label
                ? 'text-[var(--accent-color)]'
                : 'text-[var(--muted-text)] hover:text-[var(--text-color)]'}
            `}
          >
            {view.icon}
            {view.label}
          </button>

          {activeView === view.label && (
            <motion.span
              layoutId="carListingsViewUnderline"
              className="absolute bottom-0 left-0 h-0.5 w-full bg-[var(--accent-color)] rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
