import React from 'react';
import AccordionSection from './AccordionSection';

const modelsByMake = {
  audi: ['A3', 'A4', 'A6', 'Q5', 'Q7'],
  bmw: ['1 Series', '3 Series', '5 Series', 'X3', 'X5'],
  ford: ['Fiesta', 'Focus', 'Mustang', 'Explorer'],
  honda: ['Civic', 'Accord', 'CR-V', 'Fit'],
  mercedes: ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC'],
  toyota: ['Corolla', 'Camry', 'RAV4', 'Hilux'],
  volkswagen: ['Golf', 'Passat', 'Tiguan', 'Polo']
};

const ModelFilter = ({ selectedMake, selectedModel, setSelectedModel }) => {
  return (
    <AccordionSection title="Model">
      {selectedMake ? (
        <div className="h-48 overflow-y-auto flex flex-col space-y-2">
          {modelsByMake[selectedMake].map((model) => (
            <div
              key={model}
              onClick={() => setSelectedModel(model)}
              className={`p-2 rounded cursor-pointer transition ${
                selectedModel === model ? 'bg-[var(--border-color)]' : ''
              }`}
            >
              {model}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted-text)]">Select a make first</p>
      )}
    </AccordionSection>
  );
};

export default ModelFilter;