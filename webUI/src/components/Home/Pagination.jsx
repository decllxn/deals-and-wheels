import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-center mt-6">
      <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg">← Previous</button>
      <span className="px-4">Page 1 of 10</span>
      <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg">Next →</button>
    </div>
  );
};

export default Pagination;