import React, { useState, useEffect, useRef } from "react";
import { Clock, DollarSign, List, MessageCircle } from "lucide-react";

const StickyBidBar = ({ auction, commentsCount }) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Adjust breakpoint as needed

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      if (days > 0) formattedTime += `${days}d `;
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

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollPosition = window.scrollY;
        const triggerPoint = scrollRef.current.offsetTop + 200;

        if (scrollPosition > triggerPoint) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isSmallScreen) {
    return (
      <div className="sticky bottom-0 left-0 w-full bg-[#1f1f1f] p-3 text-white z-30 shadow-lg">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <Clock className="w-4 h-4 text-gray-400 mx-auto" />
            <p className="text-xs text-gray-400">Time Left</p>
            <p className="font-semibold text-sm">{timeLeft}</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold text-sm transition-colors duration-300">
            Place Bid
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef}>
      <div style={{ height: "1px", opacity: 0, position: "absolute", top: "0" }} />

      {isVisible && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-[#1f1f1f] p-4 text-white z-50 shadow-lg rounded-lg mt-3">
          <div className="flex items-center justify-center flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Time Left</p>
                <p className="font-semibold">{timeLeft}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">High Bid</p>
                <p className="font-semibold">${auction?.price?.toLocaleString() || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <List className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Bids</p>
                <p className="font-semibold">{auction?.num_bids !== undefined ? auction.num_bids : 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Comments</p>
                <p className="font-semibold">{commentsCount}</p>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold transition-colors duration-300">
              Place a Bid
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyBidBar;