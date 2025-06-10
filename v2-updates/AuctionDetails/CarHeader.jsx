import React, { useState, useEffect } from "react";
import { Bookmark, Share2, Star } from "lucide-react";

const CarHeader = ({ auction }) => {
  const [rating, setRating] = useState(0);

  // Extract relevant information from the auction object
  const { year, make, model, description } = auction;

  // Placeholder functions for watchlist, share, and rate actions
  const handleAddToWatchlist = () => {
    console.log("Added to watchlist");
    // Implement your watchlist logic here
  };

  const handleShare = () => {
    console.log("Shared");
    // Implement your sharing logic here
  };

  const handleRate = (value) => {
    setRating(value);
    console.log(`Rated: ${value} stars`);
    // Implement your rating submission logic here
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-[#1f1f1f] py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left Side: Car Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
            {year} {make} {model}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
            {description}
          </p>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center space-x-3 ml-4">
          <button
            onClick={handleAddToWatchlist}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-150 ease-in-out"
            aria-label="Add to Watchlist"
          >
            <Bookmark className="w-5 h-5" />
          </button>

          <button
            onClick={handleShare}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-150 ease-in-out"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Rating Stars */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRate(value)}
                className={`text-gray-400 hover:text-yellow-400 dark:hover:text-yellow-300 transition duration-150 ease-in-out ${
                  value <= rating ? "text-yellow-400 dark:text-yellow-300" : ""
                }`}
                aria-label={`Rate ${value} stars`}
              >
                <Star className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarHeader;