import React from "react";
import { FaClock, FaFire } from "react-icons/fa";

const SidebarListings = ({ featuredListings, endingSoonListings, newListings }) => {
  const renderListing = (car) => (
    <div
      key={car.id}
      className="bg-gray-800 rounded-md shadow-md overflow-hidden transition transform hover:scale-102 hover:shadow-lg"
    >
      <div className="relative">
        <img
          src={car.images && car.images.length > 0 ? car.images[0].image : "/placeholder-car.png"}
          alt={`${car.make} ${car.model}`}
          className="w-full h-24 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-car.png";
          }}
        />
        {car.featured && (
           <span className="px-2 pb-1 rounded absolute bottom-2 left-2 text-[0.7rem] font-semibold bg-red-600 text-white">
              <FaFire className="inline-block mr-0.5 text-xs" /> Featured
           </span>
          )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-100 truncate">{car.make} {car.model}</h3>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
          <div className="flex items-center gap-1">
            <FaClock className="text-yellow-500" />
            <span>Ends in: {car.auction_deadline ? calculateTimeLeft(car.auction_deadline) : "N/A"}</span>
          </div>
          
        </div>
      </div>
    </div>
  );

  const calculateTimeLeft = (deadline) => {
    const now = new Date().getTime();
    const endTime = new Date(deadline).getTime();
    const difference = endTime - now;

    if (difference < 0) {
      return "Ended";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    let timeLeftString = "";
    if (days > 0) timeLeftString += `${days}d `;
    timeLeftString += `${hours}h ${minutes}m ${seconds}s`;

    return timeLeftString;
  };

  return (
    <div className="lg:col-span-2 bg-[#1f1f1f] text-white p-5 rounded-xl mb-5 mt-10 shadow-lg border border-gray-800">
      {/* Featured Auctions */}
      {featuredListings && featuredListings.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-100 border-b border-gray-700 pb-2">
            Featured Auctions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {featuredListings.map(renderListing)}
          </div>
        </div>
      )}

      {/* Auctions Ending Soon */}
      {endingSoonListings && endingSoonListings.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-100 border-b border-gray-700 pb-2">
            Auctions Ending Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {endingSoonListings.map(renderListing)}
          </div>
        </div>
      )}

      {/* New Listings */}
      {newListings && newListings.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-100 border-b border-gray-700 pb-2">
            New Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {newListings.map(renderListing)}
          </div>
        </div>
      )}

      {/* View More Button */}
      <button className="w-full mt-4 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all">
        View More Listings
      </button>
    </div>
  );
};

export default SidebarListings;