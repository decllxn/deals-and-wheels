import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, CheckCircle } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import DealerInfoCard from "./DealerInfoCard";
import DealerProfileModal from "./DealerProfileModal";
import { useAuth } from "../../../../context/AuthContext";

export default function DashboardHeader({ dealer }) {
  const { access: authToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(dealer.logo);

  return (
    <>
      <GlassPanel
        className="rounded-3xl p-6 border border-[var(--border-color)] 
                   bg-[var(--surface-color)]/70 backdrop-blur-xl 
                   shadow-[0_8px_24px_var(--shadow-color)] transition-all duration-300 
                   hover:shadow-[0_8px_32px_var(--shadow-color)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left - Dealer Info */}
          <div className="flex items-start gap-4">
            <motion.img
              src={preview || '/placeholder-logo.png'}
              alt="Dealer Logo"
              whileHover={{ scale: 1.02 }}
              className="w-20 h-20 rounded-2xl object-cover border border-[var(--border-color)] shadow-sm"
            />

            <div>
              <h1 className="text-2xl font-semibold text-[var(--text-color)] flex items-center gap-2 tracking-tight">
                {dealer.company_name || "Unnamed Dealer"}
                {dealer.is_verified && (
                  <CheckCircle className="w-4 h-4 text-[var(--accent-color)] stroke-[1.25]" />
                )}
              </h1>
              <p className="text-[var(--muted-text)] text-sm">
                {dealer.business_type || "Business Type Not Set"}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm 
                       text-[var(--accent-color)] border border-[var(--border-color)] 
                       bg-[var(--surface-color)]/50 hover:bg-[var(--surface-color)] 
                       shadow-[0_2px_8px_var(--shadow-color)] transition-all"
          >
            <Edit3 className="w-4 h-4 stroke-[1.25]" />
            Edit Profile
          </motion.button>
        </div>

        {/* Info Cards */}
        <DealerInfoCard dealer={dealer} />
      </GlassPanel>

      {/* Modal */}
      {isModalOpen && (
        <DealerProfileModal
          dealer={dealer}
          authToken={authToken}
          onClose={() => setIsModalOpen(false)}
          onLogoChange={(fileURL) => setPreview(fileURL)}
        />
      )}
    </>
  );
}