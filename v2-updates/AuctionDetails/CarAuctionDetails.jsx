import { useState, useEffect } from "react";
import { FaClock, FaGavel, FaComment } from "react-icons/fa";

const CarAuctionDetails = ({ auction }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const auctionEndTimeMs = new Date(auction?.auction_deadline).getTime();

      if (isNaN(auctionEndTimeMs)) {
        setTimeLeft("N/A");
        return;
      }

      const remaining = auctionEndTimeMs - now;

      if (remaining < 0) {
        setTimeLeft("Auction Ended");
        return;
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      let formattedTime = "";
      if (days > 0) {
        formattedTime += `${days}d `;
      }
      formattedTime += `${hours}h ${minutes}m ${seconds}s`;

      setTimeLeft(formattedTime);
    };

    if (auction?.auction_deadline) {
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    } else {
      setTimeLeft("N/A");
    }
  }, [auction?.auction_deadline]);

  return (
    <div className="py-6">
      {/* Section Divider */}
      <hr className="border-gray-200 dark:border-[#1f1f1f] mb-6" />

      {/* Time Left */}
      <div className="flex justify-between items-center text-lg font-medium mb-3">
        <div className="flex items-center gap-3 text-[#1f1f1f]">
          <FaClock className="text-red-500 text-xl" />
          <span>Time Left:</span>
        </div>
        <span className="text-gray-900 dark:text-[#1f1f1f] text-lg font-semibold">{timeLeft}</span>
      </div>

      {/* Highest Bid */}
      <div className="flex justify-between items-center text-lg font-medium mb-3">
        <div className="flex items-center gap-3 text-[#1f1f1f]">
          <FaGavel className="text-green-400 text-xl" />
          <span>Current Bid:</span>
        </div>
        <span className="text-gray-900 dark:text-[#1f1f1f] text-lg font-semibold">
          Ksh {auction?.price ? parseFloat(auction.price).toLocaleString() : "N/A"}
        </span>
      </div>

      {/* Bid Count */}
      <div className="flex justify-between items-center text-lg font-medium mb-6">
        <div className="flex items-center gap-3 text-[#1f1f1f]">
          <FaComment className="text-blue-400 text-xl" />
          <span>Total Bids:</span>
        </div>
        <span className="text-gray-900 dark:text-[#1f1f1f] text-lg font-semibold">{auction?.num_bids !== undefined ? auction.num_bids : "N/A"}</span>
      </div>

      {/* Call-to-Action Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl">
        Place a Bid
      </button>

      {/* Section Divider */}
      <hr className="border-gray-200 dark:border-gray-700 mt-6" />
    </div>
  );
};

export default CarAuctionDetails;