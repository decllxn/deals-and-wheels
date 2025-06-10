import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, BarChart, Settings, List, Circle } from "lucide-react";

const CarSpecifications = ({ details }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [highlighted, setHighlighted] = useState(null);

  // Memoized grouping logic for efficiency
  const groupedSpecs = useMemo(() => {
    return Object.entries(details).reduce((acc, [key, value]) => {
      const formattedKey = key.replace(/_/g, " "); // Replace underscores with spaces
      const group = key.includes("engine")
        ? "Performance"
        : key.includes("dimensions")
        ? "Dimensions"
        : key.includes("fuel")
        ? "Fuel & Economy"
        : "General"; // Default group

      if (!acc[group]) acc[group] = [];
      acc[group].push({ key: formattedKey, value });

      return acc;
    }, {});
  }, [details]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Icons mapping
  const getIcon = (groupName) => {
    const icons = {
      Performance: <BarChart className="w-5 h-5 mr-2 text-red-500" />,
      Dimensions: <List className="w-5 h-5 mr-2 text-blue-500" />,
      "Fuel & Economy": <Circle className="w-5 h-5 mr-2 text-green-500" />,
      General: <Settings className="w-5 h-5 mr-2 text-gray-500" />,
    };
    return icons[groupName] || <Info className="w-5 h-5 mr-2" />;
  };

  return (
    <div className="max-w-3xl mx-auto my-16 p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
          <Info className="w-6 h-6 mr-2 text-blue-600" />
          Specifications
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-gray-500 hover:text-gray-800 transition-colors duration-300 rounded-full p-2 ${
            isOpen ? "bg-gray-100" : "hover:bg-gray-100"
          }`}
          aria-label={isOpen ? "Collapse Specifications" : "Expand Specifications"}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Specifications */}
      <AnimatePresence>
        {isOpen && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-6">
            {Object.entries(groupedSpecs).map(([groupName, specs]) => (
              <div key={groupName}>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                  {getIcon(groupName)}
                  {groupName}
                </h3>
                <div className="space-y-3">
                  {specs.map((spec, index) => (
                    <motion.div
                      key={spec.key}
                      variants={itemVariants}
                      className={`flex justify-between items-start p-3 rounded-lg transition-colors duration-300 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                      } ${highlighted === spec.key ? "bg-blue-500/20" : ""}`}
                      onMouseEnter={() => setHighlighted(spec.key)}
                      onMouseLeave={() => setHighlighted(null)}
                    >
                      <span className="text-gray-700 font-medium">{spec.key}:</span>
                      <span className="text-gray-900 font-mono break-words">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
                {groupName !== Object.keys(groupedSpecs)[Object.keys(groupedSpecs).length -1] && <hr className="my-6 border-gray-200" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarSpecifications;