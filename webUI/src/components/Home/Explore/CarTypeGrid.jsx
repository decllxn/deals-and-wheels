import React from "react";
import { motion } from "framer-motion";

const CarTypeGrid = ({ carTypes }) => (
  <div>
    <h3 className="text-2xl font-semibold mb-6" style={{ color: "var(--text-color)" }}>
      Explore by Car Type
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {carTypes.map((type, idx) => (
        <motion.div
          key={type.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
        >
          <img src={type.iconSrc} alt={type.name} className="w-12 h-12 object-contain" />
          <span className="text-sm md:text-base font-medium">{type.name}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

export default CarTypeGrid;