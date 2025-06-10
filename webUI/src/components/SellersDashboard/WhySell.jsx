import React from "react";
import { FaMoneyBillWave, FaBolt, FaShieldAlt, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const WhySell = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-8 mt-6 border border-gray-200">
      {/* Header */}
      <motion.h2 
        className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-6"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
      >
        Why Sell on Deals<span className="text-blue-600">&</span>Wheels?
      </motion.h2>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FeatureCard 
          icon={<FaMoneyBillWave className="text-green-500 text-2xl" />}
          title="Best Market Prices"
          description="AI-powered pricing ensures you get the best deal."
        />
        <FeatureCard 
          icon={<FaBolt className="text-yellow-500 text-2xl" />}
          title="Fast & Secure Transactions"
          description="Escrow system guarantees safety and speed."
        />
        <FeatureCard 
          icon={<FaShieldAlt className="text-blue-500 text-2xl" />}
          title="Verified Buyers Only"
          description="No spam, no scams—only real, serious buyers."
        />
        <FeatureCard 
          icon={<FaUsers className="text-purple-500 text-2xl" />}
          title="Wider Buyer Network"
          description="Thousands of buyers are ready to bid on your car."
        />
      </div>

      {/* Testimonials Section */}
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="text-lg font-medium text-gray-800 text-center mb-4">
          ⭐ What Our Sellers Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Testimonial 
            name="James K."
            text="Sold my car in 3 days! Smooth and professional experience."
          />
          <Testimonial 
            name="Aisha M."
            text="Escrow system gave me peace of mind. Highly recommend!"
          />
          <Testimonial 
            name="Brian O."
            text="Secure, fast, and real buyers only. Way better than others!"
          />
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="text-center mt-6"
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md text-sm font-medium transition-all">
          List Your Car Now 🚀
        </button>
      </motion.div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200"
    whileHover={{ scale: 1.02 }}
  >
    <div>{icon}</div>
    <div>
      <h4 className="text-sm font-medium text-gray-900">{title}</h4>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </motion.div>
);

// Testimonial Component
const Testimonial = ({ name, text }) => (
  <motion.div 
    className="bg-gray-50 p-3 rounded-md border border-gray-200"
    whileHover={{ scale: 1.02 }}
  >
    <p className="text-xs text-gray-700 italic">"{text}"</p>
    <h5 className="text-gray-900 font-medium mt-1 text-sm">- {name}</h5>
  </motion.div>
);

export default WhySell;