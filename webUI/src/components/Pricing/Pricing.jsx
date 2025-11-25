import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import PricingTiers from "./PricingTiers";
import ComparisonTable from "./ComparisonTable";
import ValueBenefits from "./ValueBenefits"
import CheckoutCTA from "./CheckoutCTA";

const Pricing = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      {/* 🗺️ Fixed geometric background */}
      <motion.img
        src="/geometric-background.png"
        alt="Kenya line map background"
        className="fixed inset-0 w-full h-full object-cover object-center opacity-40 pointer-events-none z-0 mix-blend-luminosity"
      />

      {/* Hero Section */}
      <div className="relative z-[1]">
        <HeroSection />
      </div>

      {/* Pricing Tiers */}
      <div className="relative z-[1]">
        <PricingTiers />
      </div>

      {/* More Content */}
      <section className="relative z-[1]">
        <ComparisonTable />
      </section>

      <section className="relative z-[1]">
        <ValueBenefits />
      </section>

      <section className="relative z-[1]">
        <CheckoutCTA />
      </section>
    </div>
  );
};

export default Pricing;