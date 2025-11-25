import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, ChevronUp, ChevronDown } from "lucide-react";

// Payment methods logos
const paymentMethods = [
  { name: "M-Pesa", icon: <img src="/Brand_logos/M-PESA-logo.png" alt="M-Pesa" className="w-6 h-6 object-contain" /> },
  { name: "PayPal", icon: <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg" alt="PayPal" className="w-6 h-6 object-contain" /> },
  { name: "Mastercard", icon: <img src="/Brand_logos/Mastercard-logo.png" alt="Mastercard" className="w-6 h-6 object-contain" /> },
  { name: "Pesapal", icon: <img src="/Brand_logos/Pesapal-logo.png" alt="Pesapal" className="w-6 h-6 object-contain" /> },
];

export default function CheckoutCTA({ selectedPlan, onCheckout }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.section
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-4xl bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl shadow-md z-50 overflow-hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      {/* Header Toggle */}
      <div
        className="flex justify-between items-center px-4 py-2 border-b border-[var(--border-color)] cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-sm text-[var(--text-color)]">
          {selectedPlan ? `${selectedPlan.name} Selected` : "No plan selected"}
        </span>
        <motion.div animate={{ rotate: isOpen ? 0 : 180 }}>
          {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </motion.div>
      </div>

      {isOpen && (
        <div className="px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Plan Info */}
          <div className="flex-1 text-sm md:text-base">
            {selectedPlan ? (
              <span className="font-semibold text-[var(--text-color)]">
                {selectedPlan.name} -{" "}
                {selectedPlan.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "KES",
                })}
              </span>
            ) : (
              <span className="text-[var(--muted-text)] font-medium">No plan selected</span>
            )}
          </div>

          {/* Payment Methods */}
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.name}
                className="flex items-center gap-1 px-2 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--accent-color)]/10 transition text-[0.75rem] font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {method.icon}
                <span>{method.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Checkout Button */}
          <motion.button
            onClick={() => onCheckout(selectedPlan)}
            className="bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-sm transition"
            whileHover={{ scale: 1.05 }}
          >
            {selectedPlan ? "Checkout" : "Select Plan"}
          </motion.button>
        </div>
      )}

      {/* Trust / Security */}
      {isOpen && (
        <div className="flex flex-wrap justify-center gap-4 px-4 py-2 border-t border-[var(--border-color)] text-[0.7rem] text-[var(--muted-text)]">
          <div className="flex items-center gap-1">
            <ShieldCheck size={14} strokeWidth={1.5} />
            <span>SSL Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle size={14} strokeWidth={1.5} />
            <span>Verified Payments</span>
          </div>
        </div>
      )}
    </motion.section>
  );
}