import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ForDealersHero = () => {
  return (
    <section
      className="relative overflow-hidden py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between mt-15"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Decorative Wave Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/745.jpg"
          alt="Blue wave background"
          className="w-full h-full object-cover opacity-10 md:opacity-20"
        />
      </div>

      {/* Left: Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl space-y-6 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Grow Your Dealership with{" "}
          <span style={{ color: "var(--accent-color)" }}>
            Kenya’s Most Trusted Car Marketplace
          </span>
        </h1>

        <p
          className="text-lg md:text-xl leading-relaxed"
          style={{ color: "var(--muted-text)" }}
        >
          Join hundreds of verified dealers reaching thousands of ready car
          buyers every day. Manage listings, track performance, and grow with
          confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
          <Link
            to="/dealer-signup"
            className="px-6 py-3 rounded-full font-semibold shadow-md text-center transition"
            style={{
              backgroundColor: "var(--accent-color)",
              color: "#fff",
            }}
          >
            Become a Dealer
          </Link>

          <Link
            to="#pricing"
            className="px-6 py-3 rounded-full font-semibold text-center border transition"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--accent-color)",
            }}
          >
            See Subscription Plans
          </Link>
        </div>
      </motion.div>

      {/* Right: Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
      >
        <img
          src="/dealerhandshake.png"
          alt="Dealers Handshake Illustration"
          className="max-w-md w-full h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>
    </section>
  );
};

export default ForDealersHero;