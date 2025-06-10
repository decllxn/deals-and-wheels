import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp } from 'lucide-react';
import ViewTabs from './ViewTabs';
import CarTypeTabs from './CarTypeTabs';
import SearchModal from './SearchModal';

const SearchExperience = () => {
  const [activeView, setActiveView] = useState('Find a Car');
  const [carType, setCarType] = useState('New');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const popularTags = [
    { label: 'Toyota Prado' },
    { label: 'Mazda CX-5' },
    { label: 'Nissan Note' },
    { label: 'Mercedes C200' },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="relative w-full py-20 px-6 sm:px-10 flex flex-col lg:flex-row items-start justify-between gap-y-12 lg:gap-20 mt-20 overflow-hidden"
        style={{
          color: 'var(--text-color)',
          backgroundColor: 'var(--bg-color)',
        }}
      >
        {/* Content Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl text-center lg:text-left"
        >
          {/* Headline & Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {activeView === 'Find a Car'
                ? 'Find Your Dream Car Today'
                : 'Real Reviews. Real Drivers.'}
            </h1>

            <p className="text-base sm:text-lg mt-4 text-[var(--muted-text)] leading-relaxed">
              {activeView === 'Find a Car'
                ? 'At Deals & Wheels, we simplify your journey to owning the perfect car. Browse thousands of new and used vehicles from verified dealers and private sellers.'
                : 'Browse uncensored, honest feedback from real car owners. Make smarter decisions, avoid regrets, and drive with confidence.'}
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 flex justify-center lg:justify-start"
          >
            <ViewTabs
              activeView={activeView}
              onChange={setActiveView}
              className="space-x-1 p-1 rounded-full border"
              itemClassName="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
              activeItemClassName="text-white shadow"
              inactiveItemClassName="hover:opacity-80"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--surface-color)',
              }}
              activeItemStyle={{ backgroundColor: 'var(--accent-color)' }}
              inactiveItemStyle={{
                color: 'var(--muted-text)',
                backgroundColor: 'transparent',
              }}
            />
          </motion.div>

          {/* Car View */}
          {activeView === 'Find a Car' && (
            <>
              {/* Car Type Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-4 flex justify-center lg:justify-start"
              >
                <CarTypeTabs
                  activeType={carType}
                  onChange={setCarType}
                  className="flex space-x-1 p-1 rounded-md border"
                  itemClassName="px-3 py-1 rounded-md text-xs font-semibold transition-colors duration-300"
                  activeItemClassName="text-white"
                  inactiveItemClassName="hover:opacity-80"
                  style={{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                  }}
                  activeItemStyle={{ backgroundColor: 'var(--accent-color)' }}
                  inactiveItemStyle={{
                    color: 'var(--muted-text)',
                    backgroundColor: 'transparent',
                  }}
                />
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-4 flex justify-center lg:justify-start"
              >
                <div
                  className="flex items-center rounded-full px-5 py-3 w-full max-w-md border shadow-sm"
                  style={{
                    backgroundColor: 'var(--surface-color)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <Search
                    className="w-5 h-5 mr-3"
                    style={{ color: 'var(--muted-text)' }}
                  />
                  <input
                    type="text"
                    placeholder={`Search ${carType} cars...`}
                    value={searchQuery}
                    onFocus={openModal}
                    readOnly
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: 'var(--text-color)' }}
                  />
                </div>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {popularTags.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(tag.label);
                        openModal();
                      }}
                      className="flex items-center text-[10px] px-3 py-1 rounded-full border transition"
                      style={{
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        borderColor: 'var(--border-color)',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          'var(--highlight-color)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          'var(--surface-color)')
                      }
                    >
                      <TrendingUp
                        className="w-3 h-3 mr-1"
                        style={{ color: 'var(--accent-color)' }}
                      />
                      {tag.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Image - only visible on lg and above */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden lg:flex justify-center flex-1 max-w-[480px]"
        >
          <img
            src="/red-car.png"
            alt="Search Car"
            className="w-full object-contain max-h-[400px]"
          />
        </motion.div>

        {/* Modal */}
        <SearchModal
          isOpen={isModalOpen}
          onClose={closeModal}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Divider */}
      <div className="w-full h-px mb-10 bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
    </>
  );
};

export default SearchExperience;