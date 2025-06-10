// RefundsReturnsSection.jsx
import React from 'react';

const refundStats = [
  { reason: 'Vehicle Issue', count: 12, color: '#E57373' },
  { reason: 'Delivery Delay', count: 7, color: '#FFB74D' },
  { reason: 'Wrong Description', count: 5, color: '#81C784' },
  { reason: 'Customer Change of Mind', count: 3, color: '#64B5F6' },
  { reason: 'Damaged During Transit', count: 2, color: '#9575CD' },
  { reason: 'Other', count: 4, color: '#A1887F' },
];

export default function RefundsReturnsSection() {
  const total = refundStats.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="bg-[var(--bg)] rounded-2xl p-6 shadow-md">
      <h2 className="text-lg font-bold text-[var(--text)] mb-6">📉 Refunds & Returns</h2>
      <p className="text-sm mb-4 text-[var(--text-muted)]">Total Refunds: <strong className="text-[var(--accent)]">{total}</strong></p>
      <ul className="space-y-3">
        {refundStats.map((item, i) => (
          <li key={i} className="flex justify-between items-center py-2 border-b border-[var(--border)]">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
              <span className="text-[var(--text)]">{item.reason}</span>
            </div>
            <span className="text-[var(--text-muted)]">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}