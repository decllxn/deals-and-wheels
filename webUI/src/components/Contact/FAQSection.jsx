import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const faqs = [
  { question: "🚗 How do I sell my car on Deals & Wheels?", answer: "Simply sign up, list your car with details and images, and wait for offers from potential buyers." },
  { question: "📄 What documents do I need to sell my car?", answer: "You'll need a valid logbook, national ID, and a signed sales agreement once a deal is made." },
  { question: "⏳ How long does it take to sell a car?", answer: "It depends on demand, but most cars get offers within a few days of listing." },
  { question: "💳 Are there any listing fees?", answer: "Basic listings are free! However, premium listings for more visibility come at a small fee." },
  { question: "🔒 Is my personal information safe?", answer: "Yes! We use advanced encryption and data protection measures to keep your details secure." },
];

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full mx-auto mt-16 px-6 py-12 bg-[#1f1f1f] shadow-2xl">
      {/* 🌟 Title Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold text-white text-center mb-8 tracking-wide"
      >
        Frequently Asked Questions
      </motion.h2>

      {/* 🔍 Smart Search Bar */}
      <div className="relative max-w-lg mx-auto mb-10">
        <FaSearch className="absolute left-4 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search for an answer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-gray-200 py-3 pl-12 pr-4 rounded-full outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 shadow-md"
        />
      </div>

      {/* 📜 FAQ List */}
      <div className="space-y-6">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <button
                className="w-full flex justify-between items-center text-gray-100 p-6 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg max-w-[80%]" >{faq.question}</span>
                {expandedIndex === index ? <FaChevronUp className="text-blue-400" /> : <FaChevronDown className="text-gray-400" />}
              </button>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 border-t border-gray-700 text-gray-300"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-lg">No matching FAQs found.</p>
        )}
      </div>

      {/* ❓ Still Need Help? */}
      <div className="mt-12 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-gray-400 mb-4"
        >
          Can't find your answer?
        </motion.h3>
        <a
          href="/contact"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-colors duration-300 hover:shadow-lg"
        >
          <FaQuestionCircle className="mr-2" /> See Full FAQ page
        </a>
      </div>
    </div>
  );
};

export default FAQSection;