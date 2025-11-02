import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FinalCallToAction = () => {
  return (
    <section
      className="relative py-28 px-6 text-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, var(--surface-color) 0%, var(--bg-color) 80%)",
        color: "var(--text-color)",
      }}
    >
      {/* Ambient Glow Ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-10"
        style={{
          background: "radial-gradient(circle, var(--accent-color) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
        >
          Ready to{" "}
          <span style={{ color: "var(--accent-color)" }}>Get Started?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl max-w-xl mx-auto mb-10"
          style={{ color: "var(--muted-text)" }}
        >
          Join the most trusted platform for{" "}
          <span style={{ color: "var(--accent-color)" }}>verified car dealers</span>{" "}
          in Kenya — where visibility meets credibility.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="/dealer-signup"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-lg relative overflow-hidden"
          style={{
            backgroundColor: "var(--accent-color)",
            color: "#fff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          }}
        >
          <span>Become a Verified Dealer</span>
          <ArrowRight size={22} className="ml-1" />

          {/* Glowing Border Effect */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 0 25px rgba(255,255,255,0.15)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.a>
      </div>

      {/* Soft Divider Line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-color), transparent)",
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default FinalCallToAction;