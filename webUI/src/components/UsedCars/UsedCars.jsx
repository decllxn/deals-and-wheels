import React, { useState, useEffect } from 'react';
import FiltersContainer from './Filters/FiltersContainer';
import Listings from './Listings';
import { FiFilter, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import UsedCarsHero from './UsedCarsHero';  // <-- added here
import Breadcrumbs from '../Weblayout/topbar/Breadcrumbs';


const UsedCars = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleToggle = () => setFiltersOpen(!filtersOpen);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && filtersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [filtersOpen, isMobile]);

  return (
    <>
      {/* Hero Section */}
      <UsedCarsHero />

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-12" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: 'var(--text-color)' }}>
              Browse <span style={{ color: 'var(--accent-color)' }}>23,450</span> cars
            </h1>
          </div>

          <button
            className="flex items-center px-5 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out shadow-sm"
            style={{
              backgroundColor: 'var(--surface-color)',
              color: 'var(--muted-text)',
              border: '1px solid var(--border-color)',
            }}
            onClick={handleToggle}
          >
            <FiFilter className="mr-2" size={18} />
            {filtersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Main Layout */}
        <div className={`grid gap-8 ${filtersOpen ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-1 lg:grid-cols-1'}`}>
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                key="desktop-filters"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="hidden md:block md:col-span-1"
              >
                <FiltersContainer />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key="listings"
            layout
            transition={{ duration: 0.4 }}
            className={`${filtersOpen ? 'md:col-span-2 lg:col-span-3' : 'col-span-1'}`}
          >
            <Listings filtersOpen={filtersOpen} />
          </motion.div>
        </div>

        {/* Mobile Slide-in Sidebar */}
        <AnimatePresence>
          {isMobile && filtersOpen && (
            <motion.div
              key="mobile-filters"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 h-full w-80 bg-[var(--surface-color)] z-50 p-4 shadow-lg md:hidden overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Deals<span style={{ color: 'var(--accent-color)' }}>&</span>Wheels</h2>
                <button onClick={handleToggle} className="text-[var(--muted-text)]">
                  <FiX size={24} />
                </button>
              </div>
              <FiltersContainer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isMobile && filtersOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={handleToggle}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default UsedCars;