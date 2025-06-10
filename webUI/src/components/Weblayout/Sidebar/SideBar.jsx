import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import SidebarSubItem from "./SidebarSubItem";
import SidebarListView from "./SidebarListView";

const SideBar = ({ isOpen, onClose }) => {
  const [view, setView] = useState("main");

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.6 },
  };

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  const renderMainContent = () => (
    <div className="relative">
      <div className="flex items-center justify-end h-12">
        <button
          onClick={onClose}
          className="text-[var(--text-color)] hover:text-[var(--accent-color)] text-xl transition-colors duration-200 focus:outline-none"
          aria-label="Close Sidebar"
        >
          <FaTimes />
        </button>
      </div>
      <div className="pt-2 space-y-4">
        <SidebarItem icon="cart" label="Buy a Car" />
        <SidebarDropdown label="Auctions" icon="gavel">
          <SidebarSubItem label="Live Auctions" />
          <SidebarSubItem label="Featured Auctions" />
          <SidebarSubItem label="Past Auctions" />
        </SidebarDropdown>
        <SidebarDropdown label="New Cars" icon="car">
          <SidebarSubItem label="Visit Used Cars Page" onClick={() => setView("usedCars")} />
          <SidebarSubItem label="By Models" onClick={() => setView("newByModels")} />
          <SidebarSubItem label="By Type" onClick={() => setView("newByType")} />
          <SidebarSubItem label="By Popular Models" onClick={() => setView("newByPopular")} />
        </SidebarDropdown>
        <SidebarDropdown label="Used Cars" icon="car">
          <SidebarSubItem label="By Models" onClick={() => setView("usedByModels")} />
          <SidebarSubItem label="By Type" onClick={() => setView("usedByType")} />
          <SidebarSubItem label="By Popular Models" onClick={() => setView("usedByPopular")} />
        </SidebarDropdown>
        <SidebarDropdown label="Sell My Car" icon="car">
          <SidebarSubItem label="Sell My Car" />
          <SidebarSubItem label="Tips for Selling" />
          <SidebarSubItem label="FAQs" />
        </SidebarDropdown>
      </div>
    </div>
  );
  

  const viewContentMap = {
    main: renderMainContent,
    newByModels: () => <SidebarListView title="New Cars by Models" onBack={() => setView("main")} onClose={onClose} />,
    newByType: () => <SidebarListView title="New Cars by Type" onBack={() => setView("main")} onClose={onClose} />,
    newByPopular: () => <SidebarListView title="Popular New Cars" onBack={() => setView("main")} onClose={onClose} />,
    usedByModels: () => <SidebarListView title="Used Cars by Models" onBack={() => setView("main")} onClose={onClose} />,
    usedByType: () => <SidebarListView title="Used Cars by Type" onBack={() => setView("main")} onClose={onClose} />,
    usedByPopular: () => <SidebarListView title="Popular Used Cars" onBack={() => setView("main")} onClose={onClose} />,
    usedCars: () => <SidebarListView title="Used Cars Overview" onBack={() => setView("main")} onClose={onClose} />,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[var(--bg-color)] z-50 overflow-y-auto p-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {viewContentMap[view]()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar;