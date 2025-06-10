import { useState } from "react";
import { FaMapMarkerAlt, FaMoneyBillWave, FaTrash, FaCarSide, FaPhone } from "react-icons/fa";

const CarsForSaleWatchlist = () => {
  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      image: "/car4.jpg",
      title: "2022 Toyota Land Cruiser VX",
      price: "Ksh 15,800,000",
      seller: "Auto Empire Ltd",
      location: "Nairobi, Kenya",
      status: "Available",
    },
    {
      id: 2,
      image: "/car5.jpg",
      title: "2021 Range Rover Sport HSE",
      price: "Ksh 12,500,000",
      seller: "Elite Motors KE",
      location: "Mombasa, Kenya",
      status: "Available",
    },
    {
      id: 3,
      image: "/car6.jpg",
      title: "2023 Ford Raptor F150",
      price: "Ksh 9,200,000",
      seller: "Ford Kenya",
      location: "Nakuru, Kenya",
      status: "Available",
    },
  ]);

  // Function to remove a car from the watchlist
  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  return (
    <section className="px-6 py-8 bg-white rounded-lg shadow-lg">
      {/* Sidebar Title */}
      <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-4">
        Cars for Sale
      </h2>
      <hr className="border-gray-300 mb-6" />

      {/* Watchlist Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {watchlist.map((car) => (
          <div key={car.id} className="bg-gray-100 rounded-lg p-4 flex items-center space-x-4 shadow hover:shadow-lg transition">
            {/* Car Image */}
            <img src={car.image} alt={car.title} className="w-36 h-24 object-cover rounded-lg" />

            {/* Car Details */}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800">{car.title}</h4>
              <p className="text-gray-600 flex items-center">
                <FaMoneyBillWave className="mr-2 text-green-500" /> {car.price}
              </p>
              <p className="text-gray-500 flex items-center">
                <FaCarSide className="mr-2 text-blue-500" /> {car.seller}
              </p>
              <p className="text-gray-500 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-yellow-500" /> {car.location}
              </p>
              <p className={`text-sm ${car.status === "Available" ? "text-green-600 font-semibold" : "text-red-500"}`}>
                {car.status}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm flex items-center space-x-2">
                <FaPhone /> <span>Contact Seller</span>
              </button>
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

export default CarsForSaleWatchlist;