import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

const DataShowcase = ({ title, sections }) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="max-w-3xl mx-auto my-16 p-8 rounded-2xl shadow-lg border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-gray-200">
        <Info className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index}>
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <span className="text-lg font-medium text-gray-800">{section.title}</span>
              {openSections[index] ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {openSections[index] && (
                <motion.div
                  initial={{ opacity: 0, height: 0, paddingTop: 0 }}
                  animate={{ opacity: 1, height: "auto", paddingTop: 16 }}
                  exit={{ opacity: 0, height: 0, paddingTop: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="space-y-3">
                    {section.content.map((item, i) => (
                      <div
                        key={i}
                        className="py-2 px-4 rounded-lg bg-gray-50"
                      >
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {index < sections.length - 1 && <hr className="my-6 border-gray-200" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataShowcase;