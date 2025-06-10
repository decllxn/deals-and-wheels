import React from 'react';
import AccordionSection from './AccordionSection';

const makes = ['audi', 'bmw', 'ford', 'honda', 'mercedes', 'toyota', 'volkswagen'].sort();

const MakeFilter = ({ selectedMake, setSelectedMake, resetModel }) => {
  return (
    <AccordionSection title="Make">
      <div className="h-64 overflow-y-auto flex flex-col space-y-3">
        {makes.map((make) => (
          <div
            key={make}
            onClick={() => {
              setSelectedMake(make);
              resetModel();
            }}
            className={`flex items-center p-2 rounded cursor-pointer transition ${
              selectedMake === make ? 'bg-[var(--border-color)]' : ''
            }`}
          >
            <img src={`/Brand_logos/${make}.png`} alt={make} className="w-6 h-6 mr-3 object-contain" />
            <span className="capitalize">{make}</span>
          </div>
        ))}
      </div>
    </AccordionSection>
  );
};

export default MakeFilter;