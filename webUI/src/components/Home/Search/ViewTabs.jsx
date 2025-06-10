import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BiSearch, BiCommentDetail } from 'react-icons/bi';

const views = ['Find a Car', 'Read Reviews'];
const icons = {
  'Find a Car': <BiSearch className="inline-block mr-1" />,
  'Read Reviews': <BiCommentDetail className="inline-block mr-1" />,
};

const ViewTabs = ({ activeView, onChange }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState({});

  useLayoutEffect(() => {
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children);
      const newPos = {};
      children.forEach((child, idx) => {
        const view = views[idx];
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
      {/* Tabs container that shrinks to content width */}
      <div className="relative inline-flex flex-col items-start">
        {/* Buttons */}
        <div ref={containerRef} className="flex space-x-7 sm:space-x-9 relative z-10">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => onChange(view)}
              className={`
                flex items-center text-base sm:text-lg font-medium pb-1 transition-colors duration-200 focus:outline-none
                ${activeView === view
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-white-600 dark:text-white-300 hover:text-blue-500 dark:hover:text-blue-300'}
              `}
            >
              {icons[view]}
              {view}
            </button>
          ))}
        </div>

        {/* Base line: only as wide as buttons */}
        <div className="relative w-full h-0.5 bg-gray-200 dark:bg-neutral-700 rounded-full mt-1" />

        {/* Active indicator */}
        {positions[activeView] && (
          <motion.div
            layout
            className="absolute bottom-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            initial={false}
            animate={{
              width: positions[activeView].width,
              left: positions[activeView].left,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </div>
    </div>
  );
};

export default ViewTabs;