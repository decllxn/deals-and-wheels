import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  TrendingUp,
  Building2,
  Rocket,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ListChecks,
  Star,
  BarChart3,
  Globe2,
  Headphones,
  MessageSquare,
  LineChart,
  Plug,
} from "lucide-react";
import BillingToggle from "./BillingToggle";

const plans = [
  {
    id: "starter",
    icon: <Car size={20} strokeWidth={1.4} />,
    name: "Starter",
    monthly: 2_199,
    yearly: 2_199 * 12 * 0.95 - 1,
    listings: "1 active listing",
    mostPopular: false,
  },
  {
    id: "growth",
    icon: <TrendingUp size={20} strokeWidth={1.4} />,
    name: "Growth",
    monthly: 5_999,
    yearly: 5_999 * 12 * 0.9 - 1,
    listings: "Up to 3 listings",
    mostPopular: false,
  },
  {
    id: "pro",
    icon: <Building2 size={20} strokeWidth={1.4} />,
    name: "Pro",
    monthly: 17_999,
    yearly: 17_999 * 12 * 0.85 - 1,
    listings: "Up to 10 listings",
    mostPopular: true,
  },
  {
    id: "business",
    icon: <Rocket size={20} strokeWidth={1.4} />,
    name: "Business",
    monthly: 39_999,
    yearly: 39_999 * 12 * 0.8 - 1,
    listings: "Up to 25 listings",
    mostPopular: false,
  },
  {
    id: "enterprise",
    icon: <ShieldCheck size={20} strokeWidth={1.4} />,
    name: "Enterprise",
    monthly: 0,
    yearly: 0,
    listings: "50+ listings",
    mostPopular: false,
  },
];

const features = [
  { icon: <ListChecks size={16} strokeWidth={1.2} />, name: "Car Listings", tiers: [true, true, true, true, true] },
  { icon: <Star size={16} strokeWidth={1.2} />, name: "Featured Listings", tiers: [false, true, true, true, true] },
  { icon: <BarChart3 size={16} strokeWidth={1.2} />, name: "Lead Dashboard", tiers: [true, true, true, true, true] },
  { icon: <LineChart size={16} strokeWidth={1.2} />, name: "Analytics Overview", tiers: [false, true, true, true, true] },
  { icon: <Globe2 size={16} strokeWidth={1.2} />, name: "Dealer Page", tiers: [false, true, true, true, true] },
  { icon: <Headphones size={16} strokeWidth={1.2} />, name: "Priority Support", tiers: [false, false, true, true, true] },
  { icon: <MessageSquare size={16} strokeWidth={1.2} />, name: "Chat & WhatsApp Leads", tiers: [false, false, true, true, true] },
  { icon: <TrendingUp size={16} strokeWidth={1.2} />, name: "Market Insights", tiers: [false, false, false, true, true] },
  { icon: <Plug size={16} strokeWidth={1.2} />, name: "API Access", tiers: [false, false, false, false, true] },
];

export default function PricingTiers() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 px-6 bg-transparent text-[var(--text-color)] relative overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Pricing Plans
        </h2>
        <p className="text-[var(--muted-text)] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Transparent, flexible pricing built for every car dealer in Kenya.
        </p>
      </div>

      <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />

      <div className="relative mt-6">
        <motion.div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth py-4"
        >
          {plans.map((plan, planIndex) => {
            const isYearly = billingCycle === "yearly";

            let priceDisplay;
            let displaySavings = null;

            if (plan.id === "enterprise") {
              priceDisplay = "Custom Pricing";
            } else {
              const yearlyPrice = Math.floor(plan.yearly / 1000) * 1000 + 999;
              const displayPrice = isYearly
                ? `KSh ${yearlyPrice.toLocaleString()} / yr`
                : `KSh ${plan.monthly.toLocaleString()} / mo`;

              const savings =
                isYearly && plan.monthly > 0
                  ? Math.round(plan.monthly * 12 - plan.yearly)
                  : null;

              if (savings && savings > 1000) {
                displaySavings = `Save KSh ${Math.floor(savings / 1000) * 1000}+ annually`;
              }

              priceDisplay = displayPrice;
            }

            return (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className={`min-w-[280px] md:min-w-[320px] rounded-2xl p-6 flex flex-col justify-between 
                border border-[var(--border-color)] bg-[var(--bg-color)] shadow-sm 
                transition-all relative overflow-hidden
                ${
                  plan.mostPopular
                    ? "border-[var(--accent-color)] shadow-md"
                    : ""
                }`}
              >
                {plan.mostPopular && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 right-3 bg-[var(--accent-color)] text-white text-[10px] font-medium px-2.5 py-1 rounded-full shadow-sm"
                  >
                    Most Popular
                  </motion.div>
                )}

                <div className="flex items-center gap-2 mb-4 opacity-90">
                  {plan.icon}
                  <h3 className="text-lg font-semibold tracking-tight">
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-3">
                  <p
                    className={`text-2xl font-bold tracking-tight ${
                      plan.id === "enterprise" ? "text-[var(--accent-color)]" : ""
                    }`}
                  >
                    {priceDisplay}
                  </p>
                  {displaySavings && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-green-500 mt-1 font-medium"
                    >
                      {displaySavings}
                    </motion.p>
                  )}
                </div>

                <p className="text-sm text-[var(--muted-text)] mb-5">
                  {plan.listings}
                </p>

                <div className="mt-4 flex-1 space-y-2">
                  {features.map((feature, fIndex) => {
                    const included = feature.tiers[planIndex];
                    return (
                      <div
                        key={feature.name}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span
                          className={`flex items-center gap-2 ${
                            included
                              ? "text-[var(--text-color)]"
                              : "text-[var(--muted-text)] opacity-60"
                          }`}
                        >
                          <span
                            className={`${
                              included ? "opacity-90" : "opacity-40"
                            }`}
                          >
                            {feature.icon}
                          </span>
                          {feature.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  className={`mt-6 py-2.5 rounded-xl w-full font-medium transition-all text-sm tracking-tight
                    ${
                      plan.mostPopular
                        ? "bg-[var(--accent-color)] text-white hover:shadow-md"
                        : "border border-[var(--accent-color)] text-[var(--accent-color)] hover:bg-[var(--accent-color)]/10"
                    }`}
                >
                  {plan.id === "enterprise" ? "Contact Sales" : "Choose Plan"}
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => scroll("left")}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--accent-color)] hover:text-white transition-all"
          >
            <ChevronLeft size={18} strokeWidth={1.4} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--accent-color)] hover:text-white transition-all"
          >
            <ChevronRight size={18} strokeWidth={1.4} />
          </button>
        </div>
      </div>
    </section>
  );
}