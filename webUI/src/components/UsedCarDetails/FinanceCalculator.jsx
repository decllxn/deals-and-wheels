import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinanceCalculator({ isOpen, onClose, price }) {
  const [downPayment, setDownPayment] = useState(price * 0.1);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTerm, setLoanTerm] = useState(48); // in months

  const monthlyPayment = () => {
    const principal = price - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    if (monthlyInterest === 0) return principal / loanTerm;
    const payment = (principal * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -loanTerm));
    return payment;
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Soft overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[90%] md:w-[500px] max-h-[90vh] bg-[var(--surface-color)] p-8 rounded-2xl shadow-2xl overflow-y-auto no-scrollbar"
            initial={{ opacity: 0, y: "-50%", x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[var(--text-color)]">Finance Calculator</h3>
              <button onClick={onClose} className="p-2 bg-[var(--highlight-color)] rounded-full">
                <X className="w-5 h-5 text-[var(--text-color)]" />
              </button>
            </div>

            {/* Calculator Inputs */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm mb-1 text-[var(--muted-text)]">Car Price</label>
                <input value={price.toLocaleString()} disabled className="w-full bg-[var(--highlight-color)] rounded p-3 text-[var(--text-color)]" />
              </div>

              <div>
                <label className="block text-sm mb-1 text-[var(--muted-text)]">Down Payment</label>
                <input
                  type="number"
                  className="w-full border border-[var(--border-color)] p-3 rounded"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1 text-[var(--muted-text)]">Interest Rate (%)</label>
                  <input
                    type="number"
                    className="w-full border border-[var(--border-color)] p-3 rounded"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm mb-1 text-[var(--muted-text)]">Loan Term (months)</label>
                  <input
                    type="number"
                    className="w-full border border-[var(--border-color)] p-3 rounded"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-[var(--muted-text)] text-sm mb-1">Estimated Monthly Payment</p>
                <p className="text-3xl font-bold text-[var(--accent-color)]">KES {monthlyPayment().toFixed(0).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
