import React, { useEffect, useRef, useState } from 'react';

const Preloader = () => {
  const [dotProgress, setDotProgress] = useState(0);
  const dotInterval = useRef(null);

  useEffect(() => {
    dotInterval.current = setInterval(() => {
      setDotProgress((prev) => (prev + 1) % 4);
    }, 300);

    return () => clearInterval(dotInterval.current);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center z-50 opacity-95 transition-opacity duration-300 ease-in-out">
      <div className="relative w-24 h-12">
        {/* Chassis */}
        <div className="absolute bottom-0 left-4 w-16 h-4 bg-blue-500 dark:bg-blue-400 rounded-md shadow-md"></div>

        {/* Cabin */}
        <div className="absolute top-2 left-6 w-12 h-4 bg-gray-300 dark:bg-gray-700 rounded-t-md">
          <div className="absolute inset-0 bg-blue-200 dark:bg-blue-600 opacity-20 rounded-t-md animate-shine"></div>
        </div>

        {/* Wheels */}
        <div className="absolute bottom-0 left-0 w-6 h-6 bg-gray-700 dark:bg-gray-800 rounded-full flex items-center justify-center animate-spin-slow">
          <div className="w-3 h-3 rounded-full bg-gray-50 dark:bg-gray-900 animate-pulse-wheel"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-700 dark:bg-gray-800 rounded-full flex items-center justify-center animate-spin-slow delay-150">
          <div className="w-3 h-3 rounded-full bg-gray-50 dark:bg-gray-900 animate-pulse-wheel delay-150"></div>
        </div>

        {/* Subtle Light Beam (Optional - adds a touch of dynamism) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-blue-300 dark:bg-blue-500 opacity-0 animate-fade-in-out-short rounded-full"></div>
      </div>

      {/* Loading Text with Subtle Animation */}
      <div className="absolute bottom-8 text-gray-600 dark:text-gray-400 text-sm font-medium tracking-wide animate-fade-in-up">
        Loading{'.'.repeat(dotProgress)}
      </div>
    </div>
  );
};

export default Preloader