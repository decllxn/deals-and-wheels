import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Layers, Upload, ShoppingBag } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: UserCheck,
    title: "Register & Verify",
    description:
      "Create your dealership profile and verify your business to build trust with thousands of car buyers.",
  },
  {
    id: 2,
    icon: Layers,
    title: "Choose Your Plan",
    description:
      "Select a package that suits your dealership size — from small sellers to established partners.",
  },
  {
    id: 3,
    icon: Upload,
    title: "Upload Inventory",
    description:
      "List your cars quickly with high-quality images, details, and prices through our simple dashboard.",
  },
  {
    id: 4,
    icon: ShoppingBag,
    title: "Start Selling",
    description:
      "Reach verified buyers, close deals faster, and grow your dealership — all in one trusted marketplace.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 px-6 md:px-16 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          How It <span className="text-[var(--accent-color)]">Works</span>
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Get started in four simple steps — designed to help your dealership
          grow with confidence and clarity.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-[var(--accent-color)] text-white shadow-md"
              >
                <Icon size={30} />
              </motion.div>

              <div className="absolute -top-3 left-5 bg-[var(--accent-color)] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm shadow-sm">
                {step.id}
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle connecting line */}
      <div className="hidden md:block absolute top-[58%] left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-[var(--accent-color)]/10 via-[var(--accent-color)]/30 to-[var(--accent-color)]/10"></div>
    </section>
  );
};

export default HowItWorks;