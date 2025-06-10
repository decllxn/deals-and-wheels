import React from "react";
import HeroSection from "./HeroSection";
import StepsToSell from "./StepsToSell";
import PricingTool from "./PricingTool";
import CarShowcasePreview from "./CarShowcasePreview";
import Testimonials from "./Testimonials";
import WhySellWithUs from "./WhySellWithUs";
import SellingOptions from "./SellingOptions";
import SellerDashboardPreview from "./SellerDashboardPreview";
import SecurePaymentSection from "./SecurePaymentSection";
import FAQSection from "./FAQSection";
import ScrollToTop from "../Weblayout/ScrollToTop";

const SellCar = () => {
  return (
    <>
    <ScrollToTop />
    <div className="w-full bg-white text-gray-900">
      {/* 🏆 Hero Section */}
      <HeroSection />

      {/* 📌 Step-by-Step Guide */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">
        <StepsToSell />
      </div>

      {/* 🎯 AI-Powered Pricing Tool */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <PricingTool />
        </div>
      </div>

      {/* 🚗 Live Car Showcase Preview */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">
        <CarShowcasePreview />
      </div>

      {/* 💬 Success Stories & Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <Testimonials />
        </div>
      </div>

      {/* ⚡ Why Choose Us? */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">
        <WhySellWithUs />
      </div>

      {/* 🛒 Different Selling Options */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SellingOptions />
        </div>
      </div>

      {/* 📊 Seller Dashboard Preview */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">
        <SellerDashboardPreview />
      </div>

      {/* 🔐 Secure Payment System */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SecurePaymentSection />
        </div>
      </div>

      {/* ❓ Frequently Asked Questions */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">
        <FAQSection />
      </div>
    </div>
    </>
  );
};

export default SellCar;