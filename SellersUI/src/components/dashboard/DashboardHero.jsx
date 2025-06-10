// DashboardHero.js
import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays, FileDown } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardSummaryStrip from './DashboardSummaryStrip';

const DashboardHero = ({ userName = 'User', onDownloadReport }) => {
  const [dateRange, setDateRange] = useState('Today');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setIsDropdownOpen(false);
  };

  const dateRanges = ['Today', 'Week', 'Month', 'Custom'];

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current && dropdownButtonRef.current) {
      const buttonRect = dropdownButtonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelowButton = windowHeight - buttonRect.bottom - 16; // 16px for padding
      const dropdownHeight = dropdownRef.current.scrollHeight;

      if (dropdownHeight > spaceBelowButton) {
        dropdownRef.current.style.maxHeight = `${spaceBelowButton}px`;
        dropdownRef.current.style.overflowY = 'auto'; // Enable vertical scrolling
      } else {
        dropdownRef.current.style.maxHeight = 'none'; // Allow full height
        dropdownRef.current.style.overflowY = 'visible'; // Disable scrolling
      }
    }
  }, [isDropdownOpen]);

  return (
    // Clean overflow behavior, removed any forced y scroll or height breaking
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-[var(--bg-secondary)] rounded-lg shadow-md p-6 mb-8"
>
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
    <div className="flex-1">
      <h2 className="text-2xl font-semibold text-[var(--text)]">
        Welcome back, <span className="text-[var(--accent)]">{userName}</span>!
      </h2>
      <p className="text-[var(--text-muted)] mt-1">
        Here's a quick overview of your dashboard.
      </p>
    </div>

    <div className="flex items-center space-x-4 w-full lg:w-auto">
      <div className="relative w-full max-w-xs">
        <button
          ref={dropdownButtonRef}
          className="flex items-center justify-between w-full border border-[var(--input-border)] rounded-md px-3 py-2 text-[var(--text)] focus:outline-none focus:border-[var(--input-focus)]"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <CalendarDays className="mr-2" size={16} />
          {dateRange}
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-20 mt-2 w-full bg-[var(--bg-secondary)] rounded-md shadow-lg border border-[var(--border)]"
          >
            {dateRanges.map((range, index) => (
  <button
    key={range}
    onClick={() => handleDateRangeChange(range)}
    className={`block w-full text-left px-4 py-2 hover:bg-[var(--accent-hover)] ${
      index === 0 ? 'rounded-t-md' : ''
    } ${index === dateRanges.length - 1 ? 'rounded-b-md' : ''}`}
  >
    {range}
  </button>
))}

          </div>
        )}
      </div>

      <button
        onClick={onDownloadReport}
        className="bg-[var(--accent)] text-white rounded-md px-4 py-2 flex items-center hover:bg-[var(--accent-hover)] whitespace-nowrap"
      >
        <FileDown className="mr-2" size={16} />
        Download Report
      </button>
    </div>
  </div>

  <DashboardSummaryStrip />
</motion.div>

  );
};

export default DashboardHero;