import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/testcar.jpg",
    heading: "It All Started with a Passion for Cars",
    subheading: "From enthusiasts to innovators — Deals & Wheels was born.",
  },
  {
    image: "/images/slider2.jpg",
    heading: "Transforming the Car Marketplace",
    subheading: "Revolutionizing how people buy and sell vehicles in Kenya.",
  },
  {
    image: "/images/slider3.jpg",
    heading: "Driven by Trust, Powered by Innovation",
    subheading: "We bring transparency, technology, and a touch of class.",
  },
];

const transition = {
  duration: 1,
  ease: "easeInOut",
};

const StorySlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="absolute top-0 left-0 w-full h-full"
        >
          <img
            src={slides[index].image}
            alt="Slide background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-center text-white max-w-4xl"
            >
              <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-xl">
                {slides[index].heading}
              </h1>
              <p className="mt-4 text-lg md:text-2xl text-gray-200 font-light">
                {slides[index].subheading}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default StorySlider;
