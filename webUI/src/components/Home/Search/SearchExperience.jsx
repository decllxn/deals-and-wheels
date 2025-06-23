import React, { useState, useEffect } from 'react';
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
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const popularTags = [
    { label: 'Toyota Prado' },
    { label: 'Mazda CX-5' },
    { label: 'Nissan Note' },
    { label: 'Mercedes C200' },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Set initial size
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <>
      <div
        className="relative w-full py-16 px-6 sm:px-10 flex flex-col items-start justify-between gap-y-12 mt-16 overflow-hidden lg:flex-row lg:items-center lg:gap-20 lg:py-24"
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
          className="w-full max-w-3xl text-left relative z-10 lg:w-1/2"
        >
          {/* Image for smaller screens - now with better fluid wrapping and sizing */}
          {!isLargeScreen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              // Increased sizes for smaller screens, ensuring visibility
              className="float-right ml-4 mb-4 w-6/12 max-w-[250px] sm:w-1/3 sm:max-w-[320px] md:max-w-[380px] clear-right"
            >
              <img
                src="/red-car.png"
                alt="Search Car"
                // Adjusted max-h to prevent it from becoming too small
                className="w-full object-contain max-h-[180px] sm:max-h-[260px] md:max-h-[300px] drop-shadow-xl"
              />
            </motion.div>
          )}

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

            <p className="text-base sm:text-lg mt-4 text-[var(--muted-text)] leading-relaxed [text-wrap:balance]">
              {activeView === 'Find a Car' ? (
                <>
                  At <span className="font-bold text-[var(--text-color)]">Deals
                  <span className="text-[var(--accent-color)]">&</span>
                  Wheels
                  </span>, we simplify your journey to owning the perfect car. Browse thousands of new and used vehicles from verified dealers and private sellers.
                </>
              ) : (
                <>
                  Browse uncensored, honest feedback from real car owners. Make smarter decisions, avoid regrets, and drive with confidence at <span className="font-bold text-[var(--text-color)]">Deals
                  <span className="text-[var(--accent-color)]">&</span>
                  Wheels
                  </span>.
                </>
              )}
            </p>
          </motion.div>

          {/* All other content remains left-aligned as before */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 flex justify-start"
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

          {activeView === 'Find a Car' && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-4 flex justify-start"
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

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-4 flex justify-start"
              >
                <div
                  className="flex items-center rounded-full px-5 py-3 w-full max-w-md border shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent-color)]"
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
                    className="flex-1 bg-transparent outline-none text-sm placeholder-[var(--muted-text)]"
                    style={{ color: 'var(--text-color)' }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="flex flex-wrap gap-2 justify-start">
                  {popularTags.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(tag.label);
                        openModal();
                      }}
                      className="flex items-center text-[10px] px-3 py-1 rounded-full border transition-all duration-200 ease-in-out hover:shadow-md"
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

        {/* Image for large screens - original positioning, adjusted max-width */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          // Ensure it takes up appropriate space and is centered
          className="hidden lg:flex justify-center flex-1 max-w-[550px] lg:w-1/2" 
        >
          <img
            src="/red-car.png"
            alt="Search Car"
            // Increased max-h for large screens to ensure it's prominently visible
            className="w-full object-contain max-h-[450px] drop-shadow-xl" 
          />
        </motion.div>

        {/* Modal */}
        <SearchModal
          isOpen={isModalOpen}
          onClose={closeModal}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Background blur element */}
        <div className="absolute top-[-4rem] right-[-4rem] w-[250px] h-[250px] bg-[var(--accent-color)] rounded-full blur-3xl opacity-20 z-0" />
      </div>
      {/* Divider - moved outside the main div for clear separation if it's meant to be a full-width line */}
      <hr className="border-t border-[color:var(--border-color)] mx-6 sm:mx-10 lg:mx-20" />
    </>
  );
};

export default SearchExperience;