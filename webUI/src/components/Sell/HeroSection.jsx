import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaArrowRight } from "react-icons/fa";

// 🎥 Video Data
const videoSlides = [
  {
    id: 1,
    video: "/videos/seller-listing.mp4",
    title: "List Your Car in Minutes",
    description: "Effortless car listing with AI-powered pricing & instant buyer reach.",
  },
  {
    id: 2,
    video: "/videos/secure-payment.mp4",
    title: "Fast & Secure Payments",
    description: "Get paid instantly and securely with our trusted payment system.",
  },
  {
    id: 3,
    video: "/videos/happy-seller.mp4",
    title: "Join Thousands of Happy Sellers",
    description: "Sellers love our platform for its simplicity and high selling success rate.",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ⏳ Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videoSlides.length);
    }, 7000); // Change every 7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center px-6">
      {/* ✨ Headline & CTA */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Sell Your Car Fast & <span className="text-yellow-400">Hassle-Free 🚀</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          List your car in minutes and reach thousands of buyers instantly.
        </p>
      </motion.div>

      {/* 🚀 Call-to-Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="mt-6 flex space-x-4"
      >
        <button className="px-6 py-3 bg-yellow-500 text-gray-900 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 flex items-center">
          Get Started <FaArrowRight className="ml-2" />
        </button>
        <button className="px-6 py-3 border-2 border-white text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-white hover:text-gray-900 transition duration-300">
          How It Works
        </button>
      </motion.div>

      {/* 🎥 Video Showcase Slider */}
      <div className="relative w-full max-w-5xl mt-12 overflow-hidden">
        {videoSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: index === 0 ? 50 : -50 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              x: index === currentSlide ? 0 : index < currentSlide ? -50 : 50,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute w-full flex flex-col items-center p-6 bg-gray-900/80 backdrop-blur-lg rounded-lg shadow-lg ${
              index === currentSlide ? "block" : "hidden"
            }`}
          >
            <video
              src={slide.video}
              autoPlay
              loop
              muted
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-semibold">{slide.title}</h3>
              <p className="text-gray-300 mt-2">{slide.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔄 Slider Navigation Dots */}
      <div className="absolute bottom-6 flex space-x-2">
        {videoSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              currentSlide === index ? "bg-yellow-400 scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;