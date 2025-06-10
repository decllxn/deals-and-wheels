import React from 'react';
 import { FaClock, FaChartLine, FaGavel, FaUser, FaEye, FaMapMarkerAlt } from 'react-icons/fa'; // More relevant icons

 const VehicleAuctionInfo = ({
   auction, // Expecting the full auction object from the API
   placeBidLink = '#',
   watchAuctionLink = '#',
   notifyLink = '#',
 }) => {
   if (!auction) {
     return <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-6 text-gray-500">Auction information not available.</div>;
   }

   const {
     title,
     current_price,
     number_of_bids,
     views_count,
     seller,
     seller_location,
     auction_deadline,
   } = auction;

   // Calculate time remaining
   const deadline = new Date(auction_deadline);
   const now = new Date();
   const difference = deadline.getTime() - now.getTime();

   const formatTimeRemaining = (ms) => {
     if (ms < 0) {
       return 'Auction Ended';
     }
     const days = Math.floor(ms / (1000 * 60 * 60 * 24));
     const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
     return `${days}d ${hours}h ${minutes}m`;
   };

   const timeRemaining = formatTimeRemaining(difference);
   const formattedDeadline = deadline.toLocaleTimeString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

   return (
     <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
       <div className="grid grid-cols-1 md:grid-cols-2">
         {/* Left Side (Auction Details) */}
         <div className="p-6">
           <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>

           <div className="flex items-center mb-3">
             <FaGavel className="text-blue-500 mr-2" />
             <p className="text-sm text-gray-600">Current Highest Bid:</p>
             <div className="ml-2">
               <span className="text-xl font-bold text-blue-600">KES {parseFloat(current_price).toLocaleString()}</span>
               {/* Assuming bidder info might be in a related field or fetched separately */}
               {auction.top_bidder && <span className="ml-1 text-sm text-gray-700">({auction.top_bidder.username || 'Top Bidder'})</span>}
             </div>
           </div>

           <div className="flex items-center mb-3">
             <FaClock className="text-gray-500 mr-2" />
             <p className="text-sm text-gray-600">Ending In:</p>
             <span className="ml-2 font-medium text-gray-800">{timeRemaining} ({formattedDeadline})</span>
           </div>

           <div className="flex items-center mb-3">
             <FaChartLine className="text-green-500 mr-2" />
             <p className="text-sm text-gray-600">Bids:</p>
             <span className="ml-2 font-medium text-gray-800">{number_of_bids !== undefined ? number_of_bids : 'N/A'}</span>
             <p className="ml-4 text-sm text-gray-600">
               <FaEye className="text-gray-500 inline-block mr-1" /> Views:
             </p>
             <span className="ml-2 font-medium text-gray-800">{views_count !== undefined ? views_count.toLocaleString() : 'N/A'}</span>
           </div>

           <div className="flex items-center mb-3">
             <FaUser className="text-gray-500 mr-2" />
             <p className="text-sm text-gray-600">Seller:</p>
             <span className="ml-2 font-medium text-gray-800">{seller || 'N/A'}</span>
             {seller_location && (
               <span className="ml-4 text-sm text-gray-600">
                 <FaMapMarkerAlt className="text-gray-500 inline-block mr-1" /> {seller_location}
               </span>
             )}
           </div>

           <a
             href={placeBidLink}
             className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-center transition-colors duration-300"
           >
             Place Bid
           </a>
         </div>

         {/* Right Side (Links and Information) */}
         <div className="p-6 border-l border-gray-200 flex flex-col justify-between">
           <div>
             <div className="mb-4">
               <p className="text-sm text-gray-600 mb-2">Learn More</p>
               <a href={watchAuctionLink} className="text-blue-600 text-sm hover:underline block mb-1">
                 Watch Auction
               </a>
               {/* Add more "Learn More" links if needed */}
             </div>

             <div>
               <p className="text-sm text-gray-600 mb-2">Stay Updated</p>
               <a href={notifyLink} className="text-blue-600 text-sm hover:underline block mb-1">
                 Get Notified
               </a>
               {/* Add other notification options if available */}
             </div>
           </div>

           {/* Optional: Add a small call to action or extra info here */}
           <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
             Secure bidding platform.
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default VehicleAuctionInfo;