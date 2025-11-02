import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  CarFront,
  Zap,
  Building2,
  Rocket,
  ShieldCheck,
  Star,
} from "lucide-react";

const plans = [
  {
    id: "solo",
    icon: <CarFront size={22} />,
    name: "Solo",
    price: "KSh 9,999 / month",
    listings: "Up to 3 listings",
    mostPopular: false,
  },
  {
    id: "pro",
    icon: <Zap size={22} />,
    name: "Pro",
    price: "KSh 34,999 / month",
    listings: "Up to 10 listings",
    mostPopular: false,
  },
  {
    id: "business",
    icon: <Building2 size={22} />,
    name: "Business",
    price: "KSh 79,999 / month",
    listings: "Up to 25 listings",
    mostPopular: true, // highlight this plan
  },
  {
    id: "premium",
    icon: <Rocket size={22} />,
    name: "Premium",
    price: "KSh 149,999 / month",
    listings: "Up to 50 listings",
    mostPopular: false,
  },
  {
    id: "enterprise",
    icon: <ShieldCheck size={22} />,
    name: "Enterprise",
    price: "Custom Pricing",
    listings: "100+ listings",
    mostPopular: false,
  },
];

const features = [
  { name: "Car Listings", tiers: [true, true, true, true, true] },
  { name: "Featured Listings", tiers: [false, true, true, true, true] },
  { name: "Lead Dashboard", tiers: [true, true, true, true, true] },
  { name: "Basic Analytics", tiers: [true, true, true, true, true] },
  { name: "Dealer Branding Page", tiers: [false, true, true, true, true] },
  { name: "Priority Support", tiers: [false, true, true, true, true] },
  { name: "WhatsApp & Chat Leads", tiers: [false, false, true, true, true] },
  { name: "Market Insights", tiers: [false, false, true, true, true] },
  { name: "Team Accounts", tiers: [false, false, false, true, true] },
  { name: "Predictive Insights", tiers: [false, false, false, true, true] },
  { name: "API Access & Integrations", tiers: [false, false, false, false, true] },
  { name: "Dedicated Account Manager", tiers: [false, false, false, false, true] },
];

const PricingSection = () => {
  return (
    <section
      className="relative py-24 px-4 md:px-10 overflow-visible"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Dealership <span style={{ color: "var(--accent-color)" }}>Plans</span>
        </motion.h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--muted-text)" }}
        >
          Flexible plans built for dealerships of every size — unlock insights,
          automation, and exclusive tools as you scale.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="max-w-7xl mx-auto overflow-x-auto rounded-xl shadow-lg border border-[var(--border-color)] relative">
        <table className="min-w-full border-collapse text-sm md:text-base">
          <thead
            style={{
              backgroundColor: "var(--surface-color)",
              borderBottom: `2px solid var(--border-color)`,
            }}
          >
            <tr>
              <th className="py-5 px-6 text-left font-semibold uppercase tracking-wider">
                Plan
              </th>
              {plans.map((plan, i) => (
                <th
                  key={i}
                  className={`py-10 px-6 text-center relative ${
                    plan.mostPopular ? "shadow-md" : ""
                  }`}
                  style={{
                    color: plan.mostPopular
                      ? "var(--accent-color)"
                      : "var(--text-color)",
                    background:
                      plan.mostPopular &&
                      "linear-gradient(180deg, rgba(255,215,0,0.08), transparent)",
                    borderLeft: plan.mostPopular
                      ? `2px solid var(--accent-color)`
                      : undefined,
                    borderRight: plan.mostPopular
                      ? `2px solid var(--accent-color)`
                      : undefined,
                  }}
                >
                  {/* Most Popular Badge */}
                  {plan.mostPopular && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-semibold text-[#3b2e04] bg-gradient-to-r from-[#f9e07c] to-[#f7cf4b] shadow-md border border-[#f2ca47] flex items-center gap-1 backdrop-blur-sm z-20 mt-5"
                    >
                      <Star size={12} className="fill-[#3b2e04]" />
                      <span>Popular</span>
                    </motion.div>
                  )}

                  <div className="flex flex-col items-center mt-2">
                    <div className="mb-2">{plan.icon}</div>
                    <span className="font-semibold text-lg">{plan.name}</span>
                    <span
                      className="text-sm mt-1"
                      style={{ color: "var(--muted-text)" }}
                    >
                      {plan.listings}
                    </span>
                    <span
                      className="font-bold text-base mt-1"
                      style={{
                        color: plan.mostPopular
                          ? "var(--accent-color)"
                          : "var(--text-color)",
                      }}
                    >
                      {plan.price}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Features */}
          <tbody>
            {features.map((feature, rowIdx) => (
              <tr
                key={rowIdx}
                className={`border-t border-[var(--border-color)] ${
                  rowIdx % 2 === 0 ? "bg-[var(--surface-color)]" : ""
                }`}
              >
                <td className="py-4 px-6 font-medium">{feature.name}</td>
                {feature.tiers.map((enabled, colIdx) => (
                  <td key={colIdx} className="py-4 px-6 text-center">
                    {enabled ? (
                      <Check
                        size={18}
                        style={{ color: "var(--accent-color)" }}
                        className="inline-block"
                      />
                    ) : (
                      <X
                        size={18}
                        style={{ color: "var(--muted-text)" }}
                        className="inline-block"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* CTA Row */}
            <tr className="border-t border-[var(--border-color)]">
              <td></td>
              {plans.map((plan, i) => (
                <td key={i} className="py-6 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full md:w-auto px-5 py-3 rounded-lg font-medium"
                    style={{
                      backgroundColor: plan.mostPopular
                        ? "var(--accent-color)"
                        : "transparent",
                      border: plan.mostPopular
                        ? "none"
                        : `1px solid var(--accent-color)`,
                      color: plan.mostPopular
                        ? "white"
                        : "var(--accent-color)",
                      boxShadow: plan.mostPopular
                        ? "0 0 10px rgba(255, 215, 0, 0.3)"
                        : "none",
                    }}
                  >
                    {plan.mostPopular ? "Upgrade Now" : "Get Started"}
                  </motion.button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        className="text-center text-sm mt-10"
        style={{ color: "var(--muted-text)" }}
      >
        * All prices in Kenyan Shillings (KSh). Volume discounts and enterprise
        integrations available.
      </div>
    </section>
  );
};

export default PricingSection;