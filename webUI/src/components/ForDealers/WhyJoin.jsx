import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Rocket,
  BarChart3,
  Lock,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={36} />,
    title: "Verified Dealer Network",
    description:
      "Stand out as a trusted seller in Kenya’s most secure car marketplace.",
  },
  {
    icon: <Rocket size={36} />,
    title: "Wider Reach",
    description:
      "Get your listings in front of thousands of ready car buyers every day.",
  },
  {
    icon: <BarChart3 size={36} />,
    title: "Advanced Tools",
    description:
      "Manage inventory, analytics, and performance — all in one easy-to-use dashboard.",
  },
  {
    icon: <Lock size={36} />,
    title: "Secure Transactions",
    description:
      "Enjoy peace of mind with built-in verification and anti-fraud systems.",
  },
  {
    icon: <Headphones size={36} />,
    title: "Dedicated Support",
    description:
      "Our dealer success team is here to help you grow every step of the way.",
  },
];

const WhyJoin = () => {
  return (
    <section
      className="py-20 px-6 md:px-16"
      style={{
        backgroundColor: "var(--surface-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Join{" "}
          <span style={{ color: "var(--accent-color)" }}>Deals & Wheels</span>?
        </h2>
        <p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          style={{ color: "var(--muted-text)" }}
        >
          We empower verified dealers with tools, visibility, and trust — so you
          can focus on what matters: growing your dealership.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            style={{
              backgroundColor: "var(--bg-color)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div
              className="w-14 h-14 flex items-center justify-center rounded-full mb-5 transition-all duration-300"
              style={{
                backgroundColor: "var(--highlight-color)",
                color: "var(--text-color)",
              }}
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--muted-text)" }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyJoin;