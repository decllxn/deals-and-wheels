// components/ExploreCars/SectionHeader.jsx

import React from "react";

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16 md:mb-20">
    <h2
      className="text-3xl md:text-4xl font-bold mb-6"
      style={{ color: "var(--text-color)" }}
    >
      {title}
    </h2>
    <p
      className="text-lg md:text-xl"
      style={{ color: "var(--muted-text)" }}
    >
      {subtitle}
    </p>
  </div>
);

export default SectionHeader;