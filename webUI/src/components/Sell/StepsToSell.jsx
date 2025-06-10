import React from "react";
import { motion } from "framer-motion";
import {
  FaCar,
  FaImages,
  FaTags,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

const StepsToSell = () => {
  const steps = [
    {
      icon: <FaCar className="text-3xl text-yellow-400" />,
      title: "Enter Car Details",
      description: "Provide your car's make, model, year, and condition.",
    },
    {
      icon: <FaImages className="text-3xl text-yellow-400" />,
      title: "Upload Photos & Videos",
      description: "Showcase your car with high-quality images and videos.",
    },
    {
      icon: <FaTags className="text-3xl text-yellow-400" />,
      title: "Set Your Price or Auction",
      description: "Use our smart tool to set a competitive price or start an auction.",
    },
    {
      icon: <FaHandshake className="text-3xl text-yellow-400" />,
      title: "Publish & Get Offers",
      description: "Reach thousands of buyers and receive real-time offers.",
    },
    {
      icon: <FaCheckCircle className="text-3xl text-yellow-400" />,
      title: "Complete the Sale",
      description: "Finalize the sale with our secure payment and escrow system.",
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
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold mb-8 text-gray-900"
      >
        Simple Steps to Sell Your Car 🚀
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
      >
        {steps.map((step, index) => (
          <motion.div
            variants={itemVariants}
            key={index}
            className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StepsToSell;