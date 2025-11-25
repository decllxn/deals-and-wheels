import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Car,
  TrendingUp,
  Building2,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import BillingToggle from "./BillingToggle";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: <Car size={18} strokeWidth={1.4} />,
    monthly: 2199,
    yearly: 2199 * 12 * 0.95 - 1,
    valueNote: "Best for small dealers (1–2 vehicles)",
  },
  {
    id: "growth",
    name: "Growth",
    icon: <TrendingUp size={18} strokeWidth={1.4} />,
    monthly: 5999,
    yearly: 5999 * 12 * 0.9 - 1,
    valueNote: "Ideal for growing dealerships (3–5 vehicles)",
  },
  {
    id: "pro",
    name: "Pro",
    icon: <Building2 size={18} strokeWidth={1.4} />,
    monthly: 17999,
    yearly: 17999 * 12 * 0.85 - 1,
    valueNote: "Perfect for 10–20 vehicles",
  },
  {
    id: "business",
    name: "Business",
    icon: <Rocket size={18} strokeWidth={1.4} />,
    monthly: 39999,
    yearly: 39999 * 12 * 0.8 - 1,
    valueNote: "Recommended for large fleets (25–50 vehicles)",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: <ShieldCheck size={18} strokeWidth={1.4} />,
    monthly: 0,
    yearly: 0,
    valueNote: "Tailored for 50+ vehicles — contact sales",
  },
];

const features = [
  { name: "Car Listings", tiers: [true, true, true, true, true] },
  { name: "Featured Listings", tiers: [false, true, true, true, true] },
  { name: "Lead Dashboard", tiers: [true, true, true, true, true] },
  { name: "Analytics Overview", tiers: [false, true, true, true, true] },
  { name: "Dealer Page", tiers: [false, true, true, true, true] },
  { name: "Priority Support", tiers: [false, false, true, true, true] },
  { name: "Chat & WhatsApp Leads", tiers: [false, false, true, true, true] },
  { name: "Market Insights", tiers: [false, false, false, true, true] },
  { name: "API Access", tiers: [false, false, false, false, true] },
];

export default function ComparisonTable() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const isYearly = billingCycle === "yearly";

  const formatPrice = (plan) => {
    if (plan.id === "enterprise") return "Custom Pricing";

    const yearlyPrice = Math.floor(plan.yearly / 1000) * 1000 + 999;
    return isYearly
      ? `KSh ${yearlyPrice.toLocaleString()} / yr`
      : `KSh ${plan.monthly.toLocaleString()} / mo`;
  };

  return (
    <section className="py-10 px-6 text-[var(--text-color)] bg-transparent overflow-x-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Compare All Plans
        </h2>
        <p className="text-[var(--muted-text)] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          See what each tier offers side-by-side to find the perfect fit for
          your dealership.
        </p>
      </div>

      <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />

      <div className="w-full overflow-x-auto mt-8">
        <table className="min-w-[900px] w-full border-collapse border-spacing-0">
          <thead>
            <tr>
              <th className="text-left text-sm font-semibold py-3 px-3 border-b border-[var(--border-color)] w-[220px]">
                Features
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className="text-center py-3 px-4 border-b border-[var(--border-color)]"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5 mb-1">
                      {plan.icon}
                      <span className="font-semibold text-sm">
                        {plan.name}
                      </span>
                    </div>
                    <motion.p
                      key={billingCycle}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[13px] font-medium text-[var(--accent-color)]"
                    >
                      {formatPrice(plan)}
                    </motion.p>
                    <p className="text-[11px] text-[var(--muted-text)] mt-1 italic">
                      {plan.valueNote}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {features.map((feature, i) => (
              <tr
                key={feature.name}
                className={`${
                  i % 2 === 0 ? "bg-[var(--bg-color)]/50" : "bg-transparent"
                }`}
              >
                <td className="text-sm py-3 px-3 font-medium text-left">
                  {feature.name}
                </td>
                {plans.map((plan, index) => (
                  <td
                    key={plan.id}
                    className="text-center py-3 px-4 border-l border-[var(--border-color)]"
                  >
                    {feature.tiers[index] ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-center"
                      >
                        <Check
                          size={16}
                          strokeWidth={2}
                          className="text-[var(--accent-color)]"
                        />
                      </motion.div>
                    ) : (
                      <X
                        size={14}
                        strokeWidth={1.5}
                        className="text-[var(--muted-text)] opacity-60 mx-auto"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}