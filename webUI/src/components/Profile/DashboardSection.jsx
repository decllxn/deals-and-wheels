import { FaStore, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardSection = () => {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Dashboard Access</h2>
        <p className="text-lg text-gray-700 mb-12">
          Choose your dashboard to manage your activities. Whether you're a seller or buyer, you can easily access the relevant tools and features for a seamless experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Seller Dashboard Card */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
            <Link to="/sellers-dashboard">
              <div className="flex flex-col items-center text-center">
                <FaStore className="text-6xl text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Seller's Dashboard</h3>
                <p className="text-lg text-gray-600 mb-4">Manage your listings, track sales, and monitor auctions with ease.</p>
                <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 ease-in-out">
                  Go to Dashboard
                </span>
              </div>
            </Link>

            {/* Hover Effect Overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-25 rounded-lg hidden group-hover:block"></div>
          </div>

          {/* Buyer Dashboard Card */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
            <Link to="/buyers-dashboard">
              <div className="flex flex-col items-center text-center">
                <FaShoppingCart className="text-6xl text-green-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Buyer's Dashboard</h3>
                <p className="text-lg text-gray-600 mb-4">Browse auctions, place bids, and manage your purchases in one place.</p>
                <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 ease-in-out">
                  Go to Dashboard
                </span>
              </div>
            </Link>

            {/* Hover Effect Overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-25 rounded-lg hidden group-hover:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;