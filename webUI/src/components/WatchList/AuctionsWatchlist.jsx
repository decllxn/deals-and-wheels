import { useState } from "react";
import { FaClock, FaGavel, FaTrash, FaTag, FaUser, FaCalendarAlt } from "react-icons/fa";

const AuctionsWatchlist = () => {
  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      image: "/car1.jpg",
      title: "2021 BMW M4 Competition",
      highestBid: "Ksh 3,500,000",
      bidCount: 12,
      seller: "James Auto Ltd",
      auctionEnds: "April 10, 2025",
      timeLeft: "2h 15m",
      status: "Active",
    },
    {
      id: 2,
      image: "/car2.jpg",
      title: "2020 Mercedes-Benz G63 AMG",
      highestBid: "Ksh 10,200,000",
      bidCount: 25,
      seller: "Luxury Cars KE",
      auctionEnds: "April 8, 2025",
      timeLeft: "Ending Soon",
      status: "Ending Soon",
    },
    {
      id: 3,
      image: "/car3.jpg",
      title: "2019 Porsche 911 Turbo S",
      highestBid: "Ksh 14,800,000",
      bidCount: 18,
      seller: "Porsche Nairobi",
      auctionEnds: "April 6, 2025",
      timeLeft: "Auction Ended",
      status: "Ended",
    },
  ]);

  // Function to remove an auction from the watchlist
  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  return (
    <section className="px-6 py-8 bg-white rounded-lg shadow-lg">
      {/* Sidebar Title */}
      <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-4">
        Auctions
      </h2>
      <hr className="border-gray-300 mb-6" />

      {/* Watchlist Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {watchlist.map((car) => (
          <div key={car.id} className="bg-gray-100 rounded-lg p-4 flex items-center space-x-4 shadow hover:shadow-lg transition">
            {/* Car Image */}
            <img src={car.image} alt={car.title} className="w-36 h-24 object-cover rounded-lg" />

            {/* Auction Details */}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800">{car.title}</h4>
              <p className="text-gray-600 flex items-center">
                <FaTag className="mr-2 text-green-500" /> {car.highestBid}
              </p>
              <p className="text-gray-500 flex items-center">
                <FaUser className="mr-2 text-blue-500" /> {car.seller}
              </p>
              <p className="text-gray-500 flex items-center">
                <FaCalendarAlt className="mr-2 text-yellow-500" /> Ends: {car.auctionEnds}
              </p>
              <p className={`text-sm flex items-center ${car.status === "Ending Soon" ? "text-red-500 font-semibold" : "text-gray-600"}`}>
                <FaClock className="mr-1" /> {car.timeLeft} | {car.bidCount} Bids
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center">
              {car.status !== "Ended" && (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                  Place Bid
                </button>
              )}
              <button
                onClick={() => removeFromWatchlist(car.id)}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AuctionsWatchlist;