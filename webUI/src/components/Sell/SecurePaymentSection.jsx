import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaCreditCard, FaMobileAlt, FaUniversity } from "react-icons/fa";

const SecurePaymentSection = () => {
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
        Safe and Secure Transactions 🔒
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-gray-700 text-center mb-6"
      >
        We prioritize the safety and security of your transactions. Enjoy peace of mind with our verified payment and escrow system.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Safe & Verified Transactions */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center mb-4">
            <FaShieldAlt className="text-blue-500 text-2xl mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">
              Safe & Verified Transactions
            </h3>
          </div>
          <p className="text-gray-700 mb-4">
            Our platform offers escrow service options to ensure secure transactions between buyers and sellers.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Verified buyer and seller accounts.</li>
            <li>Escrow service for secure fund transfer.</li>
            <li>Fraud prevention and dispute resolution.</li>
          </ul>
        </motion.div>

        {/* Multiple Payment Methods */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center mb-4">
            <FaCreditCard className="text-green-500 text-2xl mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">
              Multiple Payment Methods
            </h3>
          </div>
          <p className="text-gray-700 mb-4">
            We support a wide range of payment methods to provide convenience for both buyers and sellers.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <FaMobileAlt className="text-yellow-500 mr-2" />
              <span className="text-gray-600">Mobile Money</span>
            </div>
            <div className="flex items-center">
              <FaUniversity className="text-purple-500 mr-2" />
              <span className="text-gray-600">Bank Transfer</span>
            </div>
            <div className="flex items-center">
              <FaCreditCard className="text-red-500 mr-2" />
              <span className="text-gray-600">Credit/Debit Cards</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SecurePaymentSection;