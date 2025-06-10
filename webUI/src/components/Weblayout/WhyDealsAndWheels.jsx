import { FaShieldAlt, FaBolt, FaMoneyBillWave, FaUsers, FaRobot, FaLock } from "react-icons/fa";

const WhyDealsAndWheels = () => {
  return (
    <section className="py-16" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 z-60">
        
        {/* Left: Content */}
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold" style={{ color: "var(--text-color)" }}>
            Why Deals<span className="text-[#D72638]">&</span>Wheels?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            We’re revolutionizing car auctions with cutting-edge technology, unmatched security, and an effortless buying and selling experience. Join us as we set the gold standard in East Africa and beyond! 🚀
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="flex items-start space-x-4">
              <FaShieldAlt className="text-[#D72638] text-3xl" />
              <div>
                <h4 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>Trusted & Secure</h4>
                <p className="text-gray-400 text-sm">
                  Verified sellers, escrow payments, and blockchain-backed ownership transfer ensure complete security.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaBolt className="text-[#0056D2] text-3xl" />
              <div>
                <h4 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>Lightning-Fast Auctions</h4>
                <p className="text-gray-400 text-sm">
                  Real-time bidding with seamless transactions, ensuring every deal is smooth and transparent.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaMoneyBillWave className="text-green-400 text-3xl" />
              <div>
                <h4 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>Best Deals, Best Prices</h4>
                <p className="text-gray-400 text-sm">
                  AI-powered pricing ensures fair market value, helping buyers and sellers maximize their benefits.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaUsers className="text-yellow-400 text-3xl" />
              <div>
                <h4 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>Massive Buyer & Seller Network</h4>
                <p className="text-gray-400 text-sm">
                  Connect with thousands of trusted buyers and sellers across East Africa and beyond.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaRobot className="text-purple-400 text-3xl" />
              <div>
                <h4 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>AI-Driven Insights</h4>
                <p className="text-gray-400 text-sm">
                  Smart recommendations, fraud detection, and automated bidding powered by AI.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaLock className="text-red-400 text-3xl" />
              <div>
                <h4 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>Safe Payments & Ownership</h4>
                <p className="text-gray-400 text-sm">
                  Secure escrow payments and instant digital ownership transfer using blockchain technology.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Newsletter Signup */}
        <div className="p-8 rounded-xl shadow-lg max-w-md text-center" style={{ backgroundColor: "var(--surface-color)" }}>
          <h3 className="text-2xl font-bold text-white mb-4">📩 Get the Daily Mail</h3>
          <p className="text-gray-400 text-sm mb-6">
            Stay updated with the latest listings, price trends, and exclusive deals in the auction world.
          </p>
          
          <form className="flex flex-col space-y-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 bg-white text-[#1f1f1f] rounded-lg focus:ring-2 focus:ring-[#0056D2] focus:outline-none"
            />
            <button className="bg-[#0056D2] hover:bg-[#0040A8] transition-all py-3 rounded-lg font-bold text-white">
              Subscribe Now
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            *We respect your privacy. No spam, ever.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyDealsAndWheels;