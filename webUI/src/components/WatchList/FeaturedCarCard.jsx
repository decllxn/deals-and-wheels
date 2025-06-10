import { FaFire, FaStar } from "react-icons/fa";

const FeaturedCarCard = ({ car }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      {/* Car Image */}
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />

      {/* Featured & Hot Deal Badges */}
      <div className="absolute top-2 left-2 flex space-x-2">
        {car.isFeatured && (
          <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded-md flex items-center">
            <FaStar className="mr-1" /> Featured
          </span>
        )}
        {car.isHotDeal && (
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-md flex items-center">
            <FaFire className="mr-1" /> Hot Deal
          </span>
        )}
      </div>

      {/* Car Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
        <p className="text-blue-600 font-bold text-xl">Ksh {car.price.toLocaleString()}</p>
        <button className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default FeaturedCarCard;