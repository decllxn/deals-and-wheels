import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Layers,
  Activity,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const benefits = [
  {
    icon: <Eye size={28} strokeWidth={1.5} />,
    title: "Boost Sales Visibility",
    description:
      "Show your vehicles to more buyers instantly. Track views and get discovered faster than ever.",
  },
  {
    icon: <Layers size={28} strokeWidth={1.5} />,
    title: "Manage Inventory Effortlessly",
    description:
      "All your listings, updates, and dealer pages in one clean, intuitive dashboard.",
  },
  {
    icon: <Activity size={28} strokeWidth={1.5} />,
    title: "Make Smarter Decisions",
    description:
      "Real-time analytics and actionable insights help you sell faster and optimize your dealership.",
  },
];

const steps = [
  {
    title: "Sign Up Instantly",
    description: "Create your dealer account in less than 60 seconds.",
  },
  {
    title: "List Your Vehicles",
    description: "Upload your cars with images and descriptions in a few clicks.",
  },
  {
    title: "Start Selling Today",
    description: "Reach buyers faster, track leads, and grow your sales seamlessly.",
  },
];

export default function ValueBenefits() {
  return (
    <section className="py-20 px-6 bg-[var(--card-bg)] text-[var(--text-color)]">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Why Dealers Love Our Platform
        </h2>
        <p className="text-[var(--muted-text)] text-base md:text-lg leading-relaxed">
          The all-in-one platform that helps you sell more, manage smarter, and grow your dealership effortlessly.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-10 mb-20">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl border border-[var(--border-color)] hover:shadow-lg transition-all bg-[var(--bg-color)]"
          >
            <div className="bg-[var(--accent-color)]/20 rounded-full p-5 mb-4 shadow-sm hover:scale-105 transition-transform">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
            <p className="text-[var(--muted-text)] text-sm leading-snug">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10">How It Works</h3>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex-1 flex flex-col items-center bg-[var(--bg-color)] p-6 rounded-2xl border border-[var(--border-color)] hover:shadow-md transition"
            >
              <div className="mb-3 w-12 h-12 flex items-center justify-center bg-[var(--accent-color)]/20 rounded-full text-[var(--accent-color)] font-bold text-lg shadow-sm">
                {index + 1}
              </div>
              <h4 className="font-semibold mb-2">{step.title}</h4>
              <p className="text-[var(--muted-text)] text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 inline-flex items-center justify-center gap-3 bg-[var(--accent-color)] text-white font-semibold px-6 py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
        >
          Get Started Today <ChevronRight size={18} strokeWidth={2} />
        </motion.div>
      </div>
    </section>
  );
}