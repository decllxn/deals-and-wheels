import React from 'react';
import { motion } from 'framer-motion';
import { FaCarSide, FaCar } from 'react-icons/fa';

const carTypes = ['New', 'Used'];
const icons = {
  
};

const CarTypeTabs = ({ activeType, onChange }) => {
  return (
    <div className="relative inline-flex space-x-6 sm:space-x-8">
      {carTypes.map((type) => (
        <div key={type} className="relative">
          <button
            onClick={() => onChange(type)}
            className={`
              flex items-center text-sm sm:text-base font-medium pb-0.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm
              ${activeType === type
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-white-600 dark:text-white-300 hover:text-blue-500 dark:hover:text-blue-300'}
            `}
          >
            {icons[type]}
            {type}
          </button>
          {activeType === type && (
            <motion.span
              layoutId="carTypeUnderline"
              className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400 rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CarTypeTabs;