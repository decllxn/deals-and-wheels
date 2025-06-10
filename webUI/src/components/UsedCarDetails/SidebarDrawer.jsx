import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SidebarDrawer({ isOpen, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.3 },
  };

  const drawerVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed overlay */}
          <motion.div
            className="fixed inset-0 bg-black backdrop-blur-sm z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[80%] md:w-[380px] bg-[var(--surface-color)] shadow-lg z-50 p-6 overflow-y-auto no-scrollbar"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 35,
              mass: 0.7,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[var(--text-color)]">{title}</h2>
              <button onClick={onClose} className="p-2 bg-[var(--highlight-color)] rounded-full">
                <X className="w-5 h-5 text-[var(--text-color)]" />
              </button>
            </div>

            <div className="text-[var(--text-color)]">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}