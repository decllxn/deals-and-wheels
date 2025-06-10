// components/ExploreCars/SectionHeader.jsx

import React from 'react';

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16 md:mb-20">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{title}</h2>
    <p className="text-gray-500 text-lg md:text-xl">{subtitle}</p>
  </div>
);

export default SectionHeader;