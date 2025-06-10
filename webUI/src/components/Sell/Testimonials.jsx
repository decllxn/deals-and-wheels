import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaVideo } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "I sold my car in just 3 days! The platform was incredibly easy to use and I got a great price.",
      name: "Sarah M.",
      rating: 5,
      video: "/videos/testimonial1.mp4",
    },
    {
      id: 2,
      quote: "The instant offer feature was a lifesaver. I needed to sell my car quickly and got a fair price instantly.",
      name: "John D.",
      rating: 4,
      video: "/videos/testimonial2.mp4",
    },
    {
      id: 3,
      quote: "I was skeptical at first, but the platform exceeded my expectations. Sold my car for more than I expected!",
      name: "Emily R.",
      rating: 5,
      video: "/videos/testimonial3.mp4",
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
        What Our Sellers Are Saying 🌟
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <motion.div
            variants={itemVariants}
            key={testimonial.id}
            className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              <FaQuoteLeft className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <div className="flex items-center text-yellow-400">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <FaStar key={index} className="mr-1" />
                  ))}
                </div>
              </div>
              {testimonial.video && (
                <a href={testimonial.video} target="_blank" rel="noopener noreferrer">
                  <FaVideo className="text-blue-500 text-2xl" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-8 text-center"
      >
        <p className="text-xl font-semibold text-green-600">
          98% of cars sell within 7 days! 🚀
        </p>
        <p className="text-gray-600 mt-2">
          Join thousands of happy sellers and experience a fast and hassle-free selling process.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Testimonials;