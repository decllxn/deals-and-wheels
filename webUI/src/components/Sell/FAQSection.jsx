import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle, FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "How do I list my car for sale?",
      answer: "To list your car, simply click the 'Sell Your Car' button and follow the step-by-step instructions. You'll need to provide details about your car and upload photos.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including mobile money, bank transfers, and credit/debit cards. Escrow services are also available for secure transactions.",
    },
    {
      question: "How does the AI-powered pricing tool work?",
      answer: "Our tool analyzes real-time market data, similar listings, and your car's details to provide an accurate and competitive price recommendation.",
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

  const answerVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
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
        className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-2"
      >
        <FaQuestionCircle className="text-blue-500" />
        <span>Frequently Asked Questions</span>
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border rounded-lg p-4 cursor-pointer"
            onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              <FaChevronDown
                className={`transition-transform duration-300 ${openQuestion === index ? "transform rotate-180" : ""}`}
              />
            </div>
            <AnimatePresence>
              {openQuestion === index && (
                <motion.p
                  variants={answerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="mt-2 text-gray-600 overflow-hidden"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <Link to="/faq" className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center">
            View All FAQs <FaArrowRight className="ml-2" />
        </button>
      </Link>
    </motion.div>
  );
};

export default FAQSection;