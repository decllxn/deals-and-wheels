import React, { useState } from 'react';
import FinanceCalculator from './FinanceCalculator';

export default function FinanceOffer({ price }) {
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);

  const estimateMonthly = () => {
    const principal = price * 0.9;
    const interest = 0.12 / 12;
    const months = 48;
    const payment = (principal * interest) / (1 - Math.pow(1 + interest, -months));
    return payment;
  };

  return (
    <>
      <div className="mt-2">
        <h2 className="text-lg font-semibold text-[var(--text-color)] mb-2">Finance Estimate</h2>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-[var(--accent-color)]">KES {estimateMonthly().toFixed(0).toLocaleString()} /mo</p>
          <button
            className="py-2 px-4 rounded-lg bg-[var(--accent-color)] text-white font-semibold shadow-md hover:bg-[var(--accent-hover)] transition"
            onClick={() => setIsFinanceOpen(true)}
          >
            Estimate Payment
          </button>
        </div>
        <p className="text-xs text-[var(--muted-text)] mt-2">Based on 10% deposit & 48 month term. Subject to approval.</p>
      </div>

      <FinanceCalculator isOpen={isFinanceOpen} onClose={() => setIsFinanceOpen(false)} price={price} />
    </>
  );
}