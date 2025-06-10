import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function AuthBackground({ children }) {
  useEffect(() => {
    // Create the stars on component mount
    const starField = document.querySelector(".star-field");
    const numStars = 100;
    const numShootingStars = 5;

    // Create random stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDelay = `${Math.random() * 5}s`; // Randomize delay for different star animations
      starField.appendChild(star);
    }

    // Create shooting stars with random delay
    const createShootingStars = () => {
      for (let i = 0; i < numShootingStars; i++) {
        const shootingStar = document.createElement("div");
        shootingStar.classList.add("shooting-star");
        shootingStar.style.top = `${Math.random() * 100}vh`;
        shootingStar.style.left = `${Math.random() * 100}vw`;
        shootingStar.style.animationDelay = `${Math.random() * 5}s`;
        starField.appendChild(shootingStar);

        // Remove shooting star after animation ends
        setTimeout(() => {
          shootingStar.remove();
        }, 2000); // Match the animation duration
      }
    };

    // Create shooting stars every 2-3 seconds
    const shootingStarInterval = setInterval(createShootingStars, 2000);

    // Cleanup interval when the component unmounts
    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1A202C]">
      {/* Custom Starry Background */}
      <div className="star-field absolute top-0 left-0 w-full h-full pointer-events-none"></div>

      {/* Auth content with subtle fade-in animation */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}