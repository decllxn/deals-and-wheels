import { motion } from "framer-motion";

export default function EditorialTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div
      className="relative border-b overflow-x-auto no-scrollbar py-2"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none z-20" />

      {/* Tabs */}
      <div className="flex min-w-max space-x-6 sm:space-x-8 px-1 sm:px-0 relative z-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-base sm:text-lg font-medium whitespace-nowrap transition-colors duration-200 hover:scale-105 hover:text-[var(--text)]`}
              style={{
                color: isActive ? "var(--text)" : "var(--text-muted)",
              }}
            >
              {tab}

              {isActive && (
                <motion.div
                  key="editorial-tab-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full"
                  style={{
                    backgroundColor: "var(--accent)",
                  }}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 400, // Slightly lower for more bounce
                    damping: 12,    // Lower damping for more momentum
                    restDelta: 0.001, // Make sure it comes to rest slowly
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}