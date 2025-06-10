import React from 'react';
import SearchResultsCard from './SearchResultsCard';

const SearchResultsGrid = ({ results = [] }) => {
  if (!results.length) return null;

  return (
    <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((item) => (
        <SearchResultsCard
          key={item.id}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default SearchResultsGrid;