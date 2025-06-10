import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaShieldAlt, FaTags, FaClock } from "react-icons/fa";

const WhySellWithUs = () => {
  const comparisonData = [
    {
      feature: "Speed of Sale",
      ourPlatform: "7 days average",
      competitorA: "14+ days",
      competitorB: "Variable",
    },
    {
      feature: "Pricing Transparency",
      ourPlatform: "No hidden fees",
      competitorA: "Various fees",
      competitorB: "Commission-based",
    },
    {
      feature: "Convenience",
      ourPlatform: "AI-powered listing, secure chat",
      competitorA: "Manual listing, limited support",
      competitorB: "In-person appointments",
    },
    {
      feature: "Buyer Verification",
      ourPlatform: "Verified buyers only",
      competitorA: "Open to all",
      competitorB: "Partial verification",
    },
    {
      feature: "AI Valuation",
      ourPlatform: "Real time data",
      competitorA: "No Valuation",
      competitorB: "Limited Valuation",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold text-gray-900 mb-8 text-center"
      >
        Why Choose Us to Sell Your Car? 🏆
      </motion.h2>

      <div className="mb-8">
        <motion.p variants={itemVariants} className="text-gray-700 text-center">
          Experience the difference with our platform. We offer a faster, more transparent, and convenient way to sell your car.
        </motion.p>
      </div>

      {/* Comparison Table */}
      <motion.div variants={itemVariants} className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Our Platform
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Competitor A
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Competitor B
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {item.feature}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>{item.ourPlatform}</span>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span>{item.competitorA}</span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span>{item.competitorB}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Key Benefits Section */}
      <motion.div variants={itemVariants} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <FaTags className="text-blue-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">No Hidden Fees</h3>
            <p className="text-gray-700">Transparent pricing with no surprises.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaShieldAlt className="text-green-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Buyer Verification</h3>
            <p className="text-gray-700">Safe transactions with verified buyers.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaClock className="text-yellow-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Fast Sales</h3>
            <p className="text-gray-700">Sell your car quickly and efficiently.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WhySellWithUs;