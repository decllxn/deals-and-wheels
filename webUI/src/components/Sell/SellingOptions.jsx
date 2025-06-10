import React from "react";
import { motion } from "framer-motion";
import { FaTag, FaGavel, FaBolt } from "react-icons/fa";

const SellingOptions = () => {
  const options = [
    {
      icon: <FaTag className="text-3xl text-blue-500" />,
      title: "Fixed Price Sale",
      description: "List your car at your desired price. Ideal for sellers who know their car's value and prefer a straightforward sale.",
      features: [
        "Set your own price.",
        "Direct negotiation with buyers.",
        "Reach a wide range of potential buyers.",
      ],
    },
    {
      icon: <FaGavel className="text-3xl text-green-500" />,
      title: "Auction Mode",
      description: "Let buyers compete for your car. Perfect for maximizing your return through competitive bidding.",
      features: [
        "Competitive bidding for best price.",
        "Set a reserve price if needed.",
        "Generate excitement and urgency.",
      ],
    },
    {
      icon: <FaBolt className="text-3xl text-yellow-500" />,
      title: "Instant Offer Program",
      description: "Sell your car instantly to verified dealers. Get a fair offer and complete the sale quickly and hassle-free.",
      features: [
        "Sell to verified dealers.",
        "Fast and secure transaction.",
        "Ideal for quick sales.",
      ],
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
        Choose Your Selling Style 🛒
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {options.map((option, index) => (
          <motion.div
            variants={itemVariants}
            key={index}
            className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">{option.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
            <p className="text-gray-700 mb-4">{option.description}</p>
            <ul className="list-disc list-inside text-gray-600">
              {option.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SellingOptions;