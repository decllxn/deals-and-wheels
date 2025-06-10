import React from 'react';

const SearchResultsCard = ({ title, description }) => {
  return (
    <div className="group bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-40 bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
        <span className="text-sm text-gray-400 dark:text-gray-500">Image</span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {description}
        </p>

        <div className="pt-2">
          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;