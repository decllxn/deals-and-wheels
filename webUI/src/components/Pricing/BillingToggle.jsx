import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BillingToggle({ billingCycle, onChange }) {
  const isYearly = billingCycle === "yearly";

  return (
    <div className="flex justify-center items-center mb-12 gap-3">
      <div
        className="relative flex items-center bg-[var(--card-bg)] border border-[var(--border-color)]
        rounded-full p-1 cursor-pointer select-none shadow-sm hover:shadow-md transition-all duration-300"
        onClick={() => onChange(isYearly ? "monthly" : "yearly")}
      >
        {/* Animated highlight pill */}
        <motion.div
          className="absolute top-[4px] bottom-[4px] left-[4px] w-[calc(50%-0.5rem)] rounded-full bg-[var(--accent-color)]"
          initial={false}
          animate={{
            x: isYearly ? "100%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
        />

        {/* Labels */}
        <div className="relative flex w-[200px] justify-between text-sm font-medium z-10">
          <span
            className={`flex-1 text-center py-2 transition-colors duration-200 ${
              !isYearly ? "text-white" : "text-[var(--muted-text)]"
            }`}
          >
            Monthly
          </span>
          <span
            className={`flex-1 text-center py-2 transition-colors duration-200 ${
              isYearly ? "text-white" : "text-[var(--muted-text)]"
            }`}
          >
            Yearly
          </span>
        </div>
      </div>

      {/* Elegant, minimal badge */}
      <AnimatePresence>
        {isYearly && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-xs font-medium text-green-600 bg-green-50 border border-green-100
              rounded-full px-3 py-1 shadow-sm"
          >
            <span className="opacity-80">Save up to</span>{" "}
            <span className="font-semibold">20%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}