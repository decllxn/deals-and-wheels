import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I get verified?",
    answer:
      "Simply register your dealership, upload your business documents for verification, and our team will review and approve your account within 24 hours. Verified dealers earn a trust badge and higher visibility across the platform.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept M-Pesa, Visa, Mastercard, and direct bank transfers. Your subscription can also renew automatically for uninterrupted access.",
  },
  {
    question: "Can individuals list cars?",
    answer:
      "Currently, only verified dealerships can list vehicles. However, a special tier for individual sellers is coming soon — stay tuned!",
  },
  {
    question: "Can I cancel or upgrade my subscription?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan anytime from your dealer dashboard. Changes take effect instantly with no hidden fees.",
  },
  {
    question: "Is support available 24/7?",
    answer:
      "Absolutely. Our dedicated support team is available 24/7 via live chat, email, and WhatsApp to ensure smooth operations for every dealer.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--bg-color), var(--surface-color))",
        color: "var(--text-color)",
      }}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Frequently <span style={{ color: "var(--accent-color)" }}>Asked</span>{" "}
          Questions
        </motion.h2>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: "var(--muted-text)" }}
        >
          Everything you need to know about{" "}
          <span style={{ color: "var(--accent-color)" }}>Deals & Wheels</span> — 
          from verification to support and beyond.
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)]/70 
                          backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
                          transition-all duration-300 overflow-hidden`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ color: isOpen ? "var(--accent-color)" : "var(--text-color)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <HelpCircle size={20} />
                  </motion.div>
                  <span className="font-semibold text-[17px] leading-snug">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    size={20}
                    className={`transition-colors ${
                      isOpen ? "text-[var(--accent-color)]" : "text-[var(--muted-text)]"
                    }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="px-6 pb-5 text-[15px] leading-relaxed text-[var(--muted-text)]"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Support Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-14"
      >
        <p className="text-sm text-[var(--muted-text)] mb-3">
          Didn’t find what you’re looking for?
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-2 rounded-full font-medium text-white shadow-md"
          style={{
            backgroundColor: "var(--accent-color)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          Contact Support
        </motion.button>
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-16 left-10 opacity-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <HelpCircle size={110} />
      </motion.div>
      <motion.div
        className="absolute bottom-24 right-12 opacity-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <HelpCircle size={95} />
      </motion.div>
    </section>
  );
};

export default FaqSection;