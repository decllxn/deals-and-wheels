import { useEffect, useState } from "react";
import { FaCar, FaTag, FaExchangeAlt, FaGlobe, FaHandshake, FaCheckCircle } from "react-icons/fa";

const WhatWeDo = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 500); // Trigger animation after mount
  }, []);

  return (
    <section className="relative bg-[#1f1f1f] py-24 px-8 md:px-16 flex flex-col md:flex-row-reverse items-center justify-center gap-20 min-h-screen text-white">
      {/* Image Container */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center flex-shrink-0 mb-12 md:mb-0">
        {/* Floating Icons Animation */}
        {[
          { icon: <FaCar />, delay: "0s", position: "top-6 left-12" },
          { icon: <FaTag />, delay: "1s", position: "top-16 right-8" },
          { icon: <FaExchangeAlt />, delay: "2s", position: "bottom-6 left-16" },
          { icon: <FaGlobe />, delay: "3s", position: "bottom-12 right-12" },
          { icon: <FaHandshake />, delay: "4s", position: "top-20 left-20" },
          { icon: <FaCheckCircle />, delay: "5s", position: "top-12 right-18" },
        ].map((item, index) => (
          <span
            key={index}
            className={`absolute text-red-500 text-3xl md:text-4xl opacity-0 animate-floating-icons transition-opacity duration-1000 ${item.position}`}
            style={{ animationDelay: item.delay }}
          >
            {item.icon}
          </span>
        ))}

        <img
          src="/testcar.jpg" // Replace with your image path
          alt="What We Do"
          className="relative w-full h-full rounded-full object-cover shadow-xl"
        />
      </div>

      {/* Text Container */}
      <div className="text-center md:text-left max-w-xl md:max-w-2xl lg:max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 md:mb-8">What Do We Do?</h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
          We provide an <span className="text-red-500 font-semibold">advanced platform</span> where users can buy, sell, and auction cars effortlessly, ensuring fair pricing and smooth transactions.
        </p>

        {/* Animated Words */}
        <div className="space-y-8">
          {[
            { text: "Wide Selection", icon: <FaCar /> },
            { text: "Best Deals", icon: <FaTag /> },
            { text: "Seamless Process", icon: <FaExchangeAlt /> },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-6 text-xl md:text-2xl font-semibold text-gray-200 opacity-0 transform translate-y-4 transition-all duration-700 ${
                animate ? "opacity-100 translate-y-0 scale-105" : ""
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <span className="text-red-500 text-4xl md:text-5xl">{item.icon}</span>
              <p className="text-left">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;