import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export function FAQ({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(idx === openIndex ? null : idx);
  };

  return (
    <section
      className="px-6 py-20 md:py-28 max-w-5xl mx-auto space-y-14"
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
      }}
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-lg md:text-xl text-[var(--muted-text)] max-w-2xl mx-auto">
          Get detailed answers about Ferrari ownership, engineering, customization, and more.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`transition-all duration-300 border rounded-2xl overflow-hidden shadow-sm hover:shadow-md bg-[var(--surface-color)] ${
                isOpen ? 'border-[var(--accent-color)]' : 'border-[var(--border-color)]'
              }`}
            >
              {/* Toggle Header */}
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left px-6 py-5 group focus:outline-none"
              >
                <h3 className="text-lg md:text-xl font-semibold text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors duration-200">
                  {faq.question}
                </h3>
                <span className="text-[var(--accent-color)] transform transition-transform duration-300">
                  {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                </span>
              </button>

              {/* Expandable Answer */}
              <div
                className={`px-6 pb-6 text-[var(--muted-text)] text-base md:text-lg leading-relaxed transition-all ease-in-out duration-300 ${
                  isOpen
                    ? 'max-h-[500px] opacity-100 scale-100'
                    : 'max-h-0 opacity-0 scale-[0.98] overflow-hidden'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Divider */}
      {faqs.length > 0 && (
        <div className="pt-16">
          <hr className="border-t border-[var(--border-color)] opacity-50" />
        </div>
      )}
    </section>
  );
}
