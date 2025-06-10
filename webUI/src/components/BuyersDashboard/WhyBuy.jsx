import React from "react";
import { FaCar, FaCheckCircle, FaSearchDollar, FaHandHoldingUsd } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyBuy = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-8 mt-6 border border-gray-200">
      {/* Header */}
      <motion.h2 
        className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-6"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
      >
        Why Buy on Deals<span className="text-blue-600">&</span>Wheels?
      </motion.h2>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FeatureCard 
          icon={<FaCar className="text-blue-500 text-2xl" />}
          title="Wide Selection of Cars"
          description="Find your dream car from a vast inventory of verified listings."
        />
        <FeatureCard 
          icon={<FaCheckCircle className="text-green-500 text-2xl" />}
          title="Verified Listings"
          description="Only genuine and thoroughly checked vehicles are listed."
        />
        <FeatureCard 
          icon={<FaSearchDollar className="text-yellow-500 text-2xl" />}
          title="Competitive Prices"
          description="Get the best deals with transparent and fair pricing."
        />
        <FeatureCard 
          icon={<FaHandHoldingUsd className="text-purple-500 text-2xl" />}
          title="Secure Transactions"
          description="Our escrow system ensures safe and secure purchases."
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
          ⭐ What Our Buyers Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Testimonial 
            name="Sarah L."
            text="Found my perfect car quickly and at a great price!"
          />
          <Testimonial 
            name="David P."
            text="The verified listings gave me confidence in my purchase."
          />
          <Testimonial 
            name="Emily R."
            text="Secure transactions made the buying process stress-free."
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
          Browse Cars Now 🚗
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

export default WhyBuy;