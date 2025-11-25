// src/pages/dealer-dashboard/Dashboard.jsx
import React from "react";
import DealerListingManager from "./DealerListingManager";
import DealerDashboard from "./DealerDashboard";
import { motion } from "framer-motion";
import { LogIn, ShieldAlert } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import { useAuth } from "../../../context/AuthContext";

const Dashboard = ({ setShowAuthModal, setIsSignUp }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[var(--muted-text)] text-lg font-medium"
        >
          Loading your dashboard...
        </motion.div>
      </div>
    );

  if (!isAuthenticated)
    return (
      <CenteredFallback
        title="Sign in to access your dealer dashboard"
        description="Your personalized dealer dashboard helps you manage listings, analytics, and more."
        icon={<LogIn className="w-6 h-6 text-[var(--accent-color)]" />}
        buttonText="Sign In"
        onButtonClick={() => {
          setIsSignUp(false);
          setShowAuthModal(true);
        }}
      />
    );

  if (!user?.dealer_profile)
    return (
      <CenteredFallback
        title="Dealers Only"
        description="This section is exclusive to registered dealers. Please ensure your account has a dealer profile."
        icon={<ShieldAlert className="w-6 h-6 text-[var(--accent-color)]" />}
        buttonText="Back to Home"
        onButtonClick={() => (window.location.href = "/")}
      />
    );

  return (
    <div className="space-y-8 mt-12">
      <DealerDashboard />
      <DealerListingManager />
    </div>
  );
};

export default Dashboard;

function CenteredFallback({ title, description, icon, buttonText, onButtonClick }) {
  return (
    <div className="flex justify-center items-center h-[70vh] px-4">
      <GlassPanel
        className="max-w-md w-full text-center p-8 rounded-2xl border border-[var(--border-color)] 
                   bg-[var(--surface-color)]/80 shadow-[0_4px_16px_var(--shadow-color)] backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center space-y-5"
        >
          <div className="p-3 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-[var(--text-color)]">{title}</h2>
          <p className="text-[var(--muted-text)] text-sm leading-relaxed max-w-sm">
            {description}
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onButtonClick}
            className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white 
                       bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] 
                       shadow-md hover:shadow-lg transition"
          >
            {buttonText}
          </motion.button>
        </motion.div>
      </GlassPanel>
    </div>
  );
}