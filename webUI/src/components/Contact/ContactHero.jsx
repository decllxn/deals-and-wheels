import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin } from "lucide-react";

const ContactHero = () => {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-24 px-6 md:px-12"
      style={{
        background:
          "linear-gradient(135deg, var(--surface-color) 0%, var(--bg-color) 100%)",
        color: "var(--text-color)",
      }}
    >
      {/* Floating background icons – moved to corners */}
      <motion.div
        className="absolute top-10 left-10 opacity-10"
        animate={{ y: [0, 10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mail size={90} />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 opacity-10"
        animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageSquare size={110} />
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-12 opacity-5"
        animate={{ y: [-8, 8, -8], rotate: [0, 6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <MapPin size={130} />
      </motion.div>

      {/* Subtle glowing orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: "var(--accent-color)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Two-column layout (tighter spacing) */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
        {/* Left - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center md:text-left max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            We’re Here to{" "}
            <span style={{ color: "var(--accent-color)" }}>Help</span>
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--muted-text)" }}
          >
            Whether you’re a{" "}
            <span style={{ color: "var(--accent-color)" }}>dealer</span>,{" "}
            <span style={{ color: "var(--accent-color)" }}>buyer</span>, or{" "}
            <span style={{ color: "var(--accent-color)" }}>partner</span> — we’d love
            to hear from you. Reach out and let’s drive your success forward.
          </p>
        </motion.div>

        {/* Right - Animated 3D Image */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 30, rotate: -8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/contact-us.png"
            alt="Contact Us"
            className="w-52 md:w-72 drop-shadow-2xl"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

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

export default ContactHero;