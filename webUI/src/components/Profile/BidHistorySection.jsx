import { FaCar, FaTrophy, FaClock, FaDollarSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const BidHistorySection = () => {
  const bidHistoryData = [
    {
      carImage: "/car1.jpg", // Replace with car image URL
      carName: "Toyota Corolla 2020",
      auctionEndDate: "2025-04-15",
      totalBids: 150,
      bidWon: true,
      winningBid: "$25,000",
      bidStatus: "Won",
      carDetails: "4-door sedan, 30,000 miles, excellent condition, one previous owner.",
      auctionID: "AUC12345"
    },
    {
      carImage: "/car2.jpg", // Replace with car image URL
      carName: "Honda Civic 2019",
      auctionEndDate: "2025-04-17",
      totalBids: 120,
      bidWon: false,
      winningBid: "$22,500",
      bidStatus: "Lost",
      carDetails: "2-door coupe, 40,000 miles, good condition, multiple previous owners.",
      auctionID: "AUC12346"
    },
    {
      carImage: "/car3.jpg", // Replace with car image URL
      carName: "Ford Mustang 2021",
      auctionEndDate: "2025-04-20",
      totalBids: 200,
      bidWon: true,
      winningBid: "$32,000",
      bidStatus: "Won",
      carDetails: "2-door coupe, 10,000 miles, excellent condition, first owner.",
      auctionID: "AUC12347"
    },
  ];

  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Bid History</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bidHistoryData.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <img
                src={item.carImage}
                alt={item.carName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">{item.carName}</h3>
                <p className="text-gray-600 text-sm">
                  <FaClock className="inline-block mr-2 text-gray-500" />
                  Auction ends on {new Date(item.auctionEndDate).toLocaleDateString()}
                </p>

                {/* Bidding Details */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaDollarSign className="text-green-500" />
                    <span className="font-semibold text-gray-700">Winning Bid:</span>
                    <span className="text-green-600">{item.winningBid}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaTrophy className="text-yellow-500" />
                    <span className="font-semibold text-gray-700">Total Bids:</span>
                    <span className="text-gray-800">{item.totalBids}</span>
                  </div>
                </div>

                {/* Car Details */}
                <p className="text-gray-700 text-sm">{item.carDetails}</p>

                {/* Bid Status */}
                <div className="flex items-center space-x-2 pt-4">
                  <div
                    className={`px-4 py-2 rounded-full text-white ${
                      item.bidWon ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {item.bidWon ? (
                      <>
                        <FaCheckCircle className="inline-block mr-2" />
                        <span>Bid Won</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="inline-block mr-2" />
                        <span>Bid Lost</span>
                      </>
                    )}
                  </div>
                </div>

                {/* View Auction Details */}
                <div className="mt-4">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 w-full">
                    View Auction Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BidHistorySection;
