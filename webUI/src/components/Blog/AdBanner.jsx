import React, { useEffect } from "react";
import { motion } from "framer-motion"; // Assuming framer-motion is used for subtle animations

const AdBanner = ({ slotId, format = "auto", fullWidth = false }) => {
  useEffect(() => {
    try {
      // Push ad to AdSense stack. Check for window.adsbygoogle to ensure it's loaded.
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense failed to load:", e);
    }
  }, [slotId]); // Re-run effect if slotId changes

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative py-8 ${fullWidth ? "w-full px-0" : "max-w-7xl mx-auto px-4"}`}
    >
      <div
        className="relative overflow-hidden rounded-2xl shadow-xl flex items-center justify-center p-6 md:p-8"
        style={{
          backgroundColor: "var(--surface-color)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Subtle Background Accent 1 */}
        <div
          className="absolute top-0 left-0 w-24 h-24 rounded-full blur-xl opacity-10"
          style={{ backgroundColor: "var(--accent-color)" }}
        ></div>
        {/* Subtle Background Accent 2 */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-xl opacity-10"
          style={{ backgroundColor: "var(--highlight-color)" }}
        ></div>

        {/* AdSense Container */}
        <div className="relative z-10 text-center">
          <p className="text-sm font-medium mb-2" style={{ color: "var(--muted-text)" }}>
            Advertisement
          </p>
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: '90px' }} // Added minHeight to give it some initial space
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // **IMPORTANT: Replace with your actual AdSense Publisher ID**
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive={fullWidth ? "true" : "false"} // Explicitly set based on prop
          ></ins>
        </div>
      </div>
    </motion.div>
  );
};

export default AdBanner;