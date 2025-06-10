import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaComments, FaLightbulb, FaEdit, FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SellerDashboardPreview = () => {
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
        Your Seller Dashboard at a Glance 📊
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Analytics & Engagement */}
        <motion.div variants={itemVariants} className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-blue-500 text-2xl mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Analytics & Engagement</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Track your listing's performance with detailed analytics. See views, offers, and inquiries in real-time.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Total Views: <span className="font-semibold">1,234</span></p>
            <p className="text-sm text-gray-600">Total Offers: <span className="font-semibold">25</span></p>
            <p className="text-sm text-gray-600">Total Inquiries: <span className="font-semibold">50</span></p>
          </div>
        </motion.div>

        {/* In-App Messaging */}
        <motion.div variants={itemVariants} className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaComments className="text-green-500 text-2xl mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Secure Buyer Chat</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Communicate with potential buyers securely through our in-app messaging. Manage inquiries and schedule viewings easily.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Unread Messages: <span className="font-semibold">5</span></p>
            <p className="text-sm text-gray-600">Last Message: <span className="font-semibold">"Interested in your car."</span></p>
          </div>
        </motion.div>

        {/* Listing Management */}
        <motion.div variants={itemVariants} className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaEdit className="text-yellow-500 text-2xl mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Manage Listings</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Easily edit, boost, and promote your listings to increase visibility and attract more buyers.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Active Listings: <span className="font-semibold">3</span></p>
            <p className="text-sm text-gray-600">Boosted Listings: <span className="font-semibold">1</span></p>
          </div>
        </motion.div>

        {/* AI-Powered Suggestions */}
        <motion.div variants={itemVariants} className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaLightbulb className="text-purple-500 text-2xl mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">AI Suggestions</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Receive AI-powered tips to improve your listing visibility and attract more potential buyers.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Tip: <span className="font-semibold">"Add more high-quality images."</span></p>
            <p className="text-sm text-gray-600">Tip: <span className="font-semibold">"Lower your price for faster sale."</span></p>
          </div>
        </motion.div>
      </div>
      <Link to="/dashboard" className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center">
            Go to Dashboard <FaArrowRight className="ml-2" />
        </button>
      </Link>
    </motion.div>
  );
};

export default SellerDashboardPreview;