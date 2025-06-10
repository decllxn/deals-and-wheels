import React, { useState } from 'react';
import MakeFilter from './MakeFilter';
import ModelFilter from './ModelFilter';
import OtherFilters from './OtherFilters';

const FiltersContainer = () => {
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <div
      className="p-4 rounded shadow-md sticky top-30"
      style={{ backgroundColor: 'var(--surface-color)', color: 'var(--text-color)' }}
    >
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <MakeFilter selectedMake={selectedMake} setSelectedMake={setSelectedMake} resetModel={() => setSelectedModel(null)} />
      <ModelFilter selectedMake={selectedMake} selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      <OtherFilters />

      <button className="mt-4 px-4 py-2 rounded w-full font-semibold" style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}>
        Apply Filters
      </button>
    </div>
  );
};

export default FiltersContainer;