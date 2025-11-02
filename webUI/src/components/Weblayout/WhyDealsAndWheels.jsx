import {
  FaShieldAlt,
  FaBolt,
  FaMoneyBillWave,
  FaUsers,
  FaRobot,
  FaLock,
} from "react-icons/fa";

const WhyDealsAndWheels = () => {
  return (
    <section
      className="py-16"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 z-60">
        {/* Left: Content */}
        <div className="max-w-2xl">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--text-color)" }}
          >
            Why Choose{" "}
            Deals<span className="text-[var(--accent-color)]">&</span>Wheels?
          </h2>
          <p className="text-[var(--muted-text)] text-lg mb-10">
            We’re more than just a marketplace — we’re redefining how cars are
            bought and sold. With smart technology, trusted transactions, and a
            growing community, Deals & Wheels makes your car journey simple,
            safe, and rewarding.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <FaShieldAlt className="text-[var(--accent-color)] text-3xl" />
              <div>
                <h4
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-color)" }}
                >
                  Trusted & Secure
                </h4>
                <p className="text-[var(--muted-text)] text-sm">
                  Verified sellers and safe payments protect your peace of mind.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaBolt className="text-blue-500 text-3xl" />
              <div>
                <h4
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-color)" }}
                >
                  Fast & Effortless
                </h4>
                <p className="text-[var(--muted-text)] text-sm">
                  List or find cars in minutes — no complicated steps, just
                  results.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaMoneyBillWave className="text-green-500 text-3xl" />
              <div>
                <h4
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-color)" }}
                >
                  Fair Pricing
                </h4>
                <p className="text-[var(--muted-text)] text-sm">
                  AI-powered insights give buyers great deals and sellers fair
                  value.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaUsers className="text-yellow-500 text-3xl" />
              <div>
                <h4
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-color)" }}
                >
                  Large Marketplace
                </h4>
                <p className="text-[var(--muted-text)] text-sm">
                  Connect with thousands of trusted buyers and sellers across
                  East Africa.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaRobot className="text-purple-500 text-3xl" />
              <div>
                <h4
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-color)" }}
                >
                  Smart Technology
                </h4>
                <p className="text-[var(--muted-text)] text-sm">
                  AI tools suggest the right matches and detect fraud before it
                  happens.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaLock className="text-red-500 text-3xl" />
              <div>
                <h4
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-color)" }}
                >
                  Safe Transactions
                </h4>
                <p className="text-[var(--muted-text)] text-sm">
                  Escrow-backed payments and digital contracts ensure
                  transparency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Newsletter Signup */}
        <div
          className="p-8 rounded-xl shadow-lg max-w-md text-center"
          style={{ backgroundColor: "var(--surface-color)" }}
        >
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-color)" }}
          >
            📩 Stay in the Driver’s Seat
          </h3>
          <p className="text-[var(--muted-text)] text-sm mb-6">
            Get the latest listings, market insights, and exclusive Deals &
            Wheels updates straight to your inbox.
          </p>

          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 bg-white text-[#1f1f1f] rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:outline-none"
            />
            <button className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] transition-all py-3 rounded-lg font-bold text-white">
              Subscribe Now
            </button>
          </form>

          <p className="text-xs text-[var(--muted-text)] mt-4">
            *We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyDealsAndWheels;