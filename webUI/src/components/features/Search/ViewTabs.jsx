import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MessageSquareText } from "lucide-react"; // thin, elegant icons

const views = [
  { label: "Find a Car", icon: Search },
  { label: "Read Reviews", icon: MessageSquareText },
];

const ViewTabs = ({ activeView, onChange }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState({});

  useLayoutEffect(() => {
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children);
      const newPos = {};
      children.forEach((child, idx) => {
        const view = views[idx].label;
        const rect = child.getBoundingClientRect();
        const parentRect = containerRef.current.getBoundingClientRect();
        newPos[view] = {
          width: rect.width,
          left: rect.left - parentRect.left,
        };
      });
      setPositions(newPos);
    }
  }, [activeView]);

  return (
    <div className="relative w-full">
      <div className="relative inline-flex flex-col items-start">
        {/* Buttons */}
        <div
          ref={containerRef}
          className="flex space-x-7 sm:space-x-9 relative z-10"
        >
          {views.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onChange(label)}
              className={`
                flex items-center text-base sm:text-lg font-medium pb-1 
                transition-colors duration-200 ease-in-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] rounded-sm
                ${
                  activeView === label
                    ? "text-[var(--accent-color)]"
                    : "text-[var(--muted-text)] hover:text-[var(--accent-hover)]"
                }
              `}
            >
              <Icon
                size={18}
                strokeWidth={1.5}
                className="mr-2 transition-transform duration-300"
              />
              {label}
            </button>
          ))}
        </div>

        {/* Subtle baseline */}
        <div className="relative w-full h-[1px] bg-[var(--border-color)] rounded-full mt-1" />

        {/* Animated active underline */}
        {positions[activeView] && (
          <motion.div
            layout
            className="absolute bottom-0 h-[2px] bg-[var(--accent-color)] rounded-full"
            initial={false}
            animate={{
              width: positions[activeView].width,
              left: positions[activeView].left,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          />
        )}
      </div>
    </div>
  );
};

export default ViewTabs;