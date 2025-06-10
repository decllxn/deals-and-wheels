import React from "react";
import { FaStar, FaStarHalfAlt, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

// 🌟 Partner & Media Logos
const partnerLogos = [
  { name: "CarGurus", logo: "/logos/cargurus.png" },
  { name: "TopGear", logo: "/logos/topgear.png" },
  { name: "MotorTrend", logo: "/logos/motortrend.png" },
  { name: "AutoTrader", logo: "/logos/autotrader.png" },
  { name: "Jalopnik", logo: "/logos/jalopnik.png" },
];

// ⭐ Customer Testimonials
const testimonials = [
  {
    name: "James M.",
    review: "Selling my car here was the easiest experience ever. Listed in minutes, sold in days! Highly recommended.",
    rating: 5,
    image: "/testimonials/james.jpg",
  },
  {
    name: "Sarah W.",
    review: "Super smooth process. The buyers were verified, and I got the best price for my car!",
    rating: 4.5,
    image: "/testimonials/sarah.jpg",
  },
  {
    name: "Michael K.",
    review: "Absolutely seamless! The platform ensures trust and fast sales. Best decision ever!",
    rating: 5,
    image: "/testimonials/michael.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="w-full mx-auto px-6 py-16 bg-[#1f1f1f] text-white shadow-lg">
      {/* 🏆 Trusted By Section */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-center mb-8"
      >
        🏅 Trusted By Leading Brands & Experts
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {partnerLogos.map((partner, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="bg-gray-800 rounded-lg p-4 shadow-lg"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 md:h-16 object-contain"
            />
          </motion.div>
        ))}
      </div>

      {/* 🗣️ Testimonials Section */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold text-center mb-8"
      >
        💬 What Our Customers Say
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-6 rounded-lg shadow-lg text-center"
          >
            <FaQuoteLeft className="text-blue-400 text-3xl mb-4" />
            <p className="text-gray-300 italic">"{testimonial.review}"</p>

            <div className="flex justify-center mt-4">
              {[...Array(5)].map((_, starIndex) => (
                <span key={starIndex} className="text-yellow-400">
                  {starIndex + 1 <= testimonial.rating ? (
                    <FaStar />
                  ) : (
                    <FaStarHalfAlt />
                  )}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full border-2 border-blue-400"
              />
              <span className="ml-3 font-semibold">{testimonial.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
