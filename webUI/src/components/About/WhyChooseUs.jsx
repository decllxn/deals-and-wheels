import { useEffect, useState } from "react";
import { FaShieldAlt, FaChartLine, FaHandsHelping, FaCar, FaEye, FaCheckCircle } from "react-icons/fa";

const WhyChooseUs = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 500); // Trigger animation after mount
  }, []);

  return (
    <section className="relative bg-white py-24 px-8 md:px-16 flex flex-col md:flex-row items-center justify-center gap-20 min-h-screen">
      {/* Image Container */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center flex-shrink-0 mb-12 md:mb-0">
        {/* Floating Icons Animation */}
        {[
          { icon: <FaShieldAlt />, delay: "0s", position: "top-6 left-12" },
          { icon: <FaChartLine />, delay: "1s", position: "top-16 right-8" },
          { icon: <FaHandsHelping />, delay: "2s", position: "bottom-6 left-16" },
          { icon: <FaCar />, delay: "3s", position: "bottom-12 right-10" },
          { icon: <FaEye />, delay: "4s", position: "top-20 left-24" },
          { icon: <FaCheckCircle />, delay: "5s", position: "top-12 right-20" },
        ].map((item, index) => (
          <span
            key={index}
            className={`absolute text-blue-500 text-3xl md:text-4xl opacity-0 animate-floating-icons transition-opacity duration-1000 ${item.position}`}
            style={{ animationDelay: item.delay }}
          >
            {item.icon}
          </span>
        ))}

        <img
          src="/testcar.jpg" // Replace with your image path
          alt="Why Choose Us"
          className="relative w-full h-full rounded-full object-cover border-8 border-white shadow-xl"
        />
      </div>

      {/* Text Container */}
      <div className="text-center md:text-left max-w-xl md:max-w-2xl lg:max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 md:mb-8">Why Choose Us?</h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
          Our platform offers <span className="text-blue-500 font-semibold">security</span>, <span className="text-blue-500 font-semibold">transparency</span>, and the <span className="text-blue-500 font-semibold">best deals</span>, making car trading a breeze.
        </p>

        {/* Animated Words */}
        <div className="space-y-8">
          {[
            { text: "Verified Listings", icon: <FaShieldAlt /> },
            { text: "Market Insights", icon: <FaChartLine /> },
            { text: "Support & Trust", icon: <FaHandsHelping /> },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-6 text-xl md:text-2xl font-semibold text-gray-800 opacity-0 transform translate-y-4 transition-all duration-700 ${
                animate ? "opacity-100 translate-y-0 scale-105" : ""
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <span className="text-blue-500 text-4xl md:text-5xl">{item.icon}</span>
              <p className="text-left">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;