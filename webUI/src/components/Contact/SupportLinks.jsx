import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom"; // optional if you're using React Router

const SupportLinks = () => {
  return (
    <section
      className="relative py-16 px-6 md:px-12 text-center"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-color) 0%, var(--surface-color) 100%)",
        color: "var(--text-color)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <motion.div
          className="flex justify-center gap-3 mb-4 text-[var(--accent-color)]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HelpCircle size={28} />
          <BookOpen size={28} />
        </motion.div>

        <h3 className="text-xl md:text-2xl font-semibold mb-3">
          Need quick answers?
        </h3>

        <p
          className="text-base md:text-lg leading-relaxed"
          style={{ color: "var(--muted-text)" }}
        >
          Visit our{" "}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/help-center"
            className="relative font-medium text-[var(--accent-color)] transition-colors"
          >
            Help Center
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[var(--accent-color)] opacity-50 rounded-full"></span>
          </motion.a>{" "}
          or{" "}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/dealer-faq"
            className="relative font-medium text-[var(--accent-color)] transition-colors"
          >
            Dealer FAQ
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[var(--accent-color)] opacity-50 rounded-full"></span>
          </motion.a>{" "}
          for instant guidance.
        </p>
      </motion.div>

      {/* Decorative accent line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-color), transparent)",
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default SupportLinks;