import { useEffect, useState } from "react";
import { FaEye, FaUsers, FaChartLine, FaHandshake, FaLightbulb, FaRocket } from "react-icons/fa";

const OurMission = () => {
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
          { icon: <FaEye />, delay: "0s", position: "top-6 left-16" },
          { icon: <FaUsers />, delay: "1s", position: "top-16 right-6" },
          { icon: <FaChartLine />, delay: "2s", position: "bottom-6 left-18" },
          { icon: <FaHandshake />, delay: "3s", position: "bottom-12 right-16" },
          { icon: <FaLightbulb />, delay: "4s", position: "top-20 left-28" },
          { icon: <FaRocket />, delay: "5s", position: "top-12 right-24" },
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
          alt="Our Mission"
          className="relative w-full h-full rounded-full object-cover shadow-xl"
        />
      </div>

      {/* Text Container */}
      <div className="text-center md:text-left max-w-xl md:max-w-2xl lg:max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-6 md:mb-8">Our Mission</h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
          To simplify and revolutionize car transactions by providing a <span className="text-red-500 font-semibold">seamless</span>, <span className="text-red-500 font-semibold">trustworthy</span>, and <span className="text-red-500 font-semibold">user-centric</span> platform.
        </p>

        {/* Animated Words */}
        <div className="space-y-8">
          {[
            { text: "Transparency", icon: <FaEye /> },
            { text: "User-Centric", icon: <FaUsers /> },
            { text: "Continuous Growth", icon: <FaChartLine /> },
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

export default OurMission;