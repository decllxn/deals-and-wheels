import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp } from "lucide-react";
import ViewTabs from "./ViewTabs";
import SearchModal from "./SearchModal";
import { usePopularTags } from "../../../hooks/usePopularTags";

const SearchExperience = () => {
  const [activeView, setActiveView] = useState("Find a Car");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const { data: popularTags, isLoading, isError } = usePopularTags();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <div
        className="relative w-full py-16 px-6 sm:px-10 flex flex-col items-start justify-between gap-y-12 overflow-hidden lg:flex-row lg:items-center lg:gap-20 lg:py-24 mt-20 xl:mt-10"
        style={{
          color: "var(--text-color)",
          backgroundColor: "var(--bg-color)",
        }}
      >
        {/* Content Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl text-left relative z-10 lg:w-1/2"
        >
          {/* Image for smaller screens */}
          {!isLargeScreen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="float-right ml-4 mb-4 w-6/12 max-w-[250px] sm:w-1/3 sm:max-w-[320px] md:max-w-[380px] clear-right"
            >
              <img
                src="/red-car.png"
                alt="Search Car"
                className="w-full object-contain max-h-[180px] sm:max-h-[260px] md:max-h-[300px] drop-shadow-xl"
              />
            </motion.div>
          )}

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {activeView === "Find a Car"
                ? "Find Your Dream Car Today"
                : "Real Reviews. Real Drivers."}
            </h1>

            <p className="text-base sm:text-lg mt-4 text-[var(--muted-text)] leading-relaxed [text-wrap:balance]">
              {activeView === "Find a Car" ? (
                <>
                  At{" "}
                  <span className="font-bold text-[var(--text-color)]">
                    Deals
                    <span className="text-[var(--accent-color)]">&</span>
                    Wheels
                  </span>
                  , we simplify your journey to owning the perfect car.
                </>
              ) : (
                <>
                  Browse uncensored, honest feedback from real car owners. Drive
                  with confidence at{" "}
                  <span className="font-bold text-[var(--text-color)]">
                    Deals
                    <span className="text-[var(--accent-color)]">&</span>
                    Wheels
                  </span>
                  .
                </>
              )}
            </p>
          </motion.div>

          {/* Tabs */}
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
                borderColor: "var(--border-color)",
                backgroundColor: "var(--surface-color)",
              }}
              activeItemStyle={{ backgroundColor: "var(--accent-color)" }}
              inactiveItemStyle={{
                color: "var(--muted-text)",
                backgroundColor: "transparent",
              }}
            />
          </motion.div>

          {/* Search input */}
          {activeView === "Find a Car" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-4 flex justify-start"
              >
                <div
                  className="flex items-center rounded-full px-5 py-3 w-full max-w-md border shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent-color)]"
                  style={{
                    backgroundColor: "var(--surface-color)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <Search
                    className="w-5 h-5 mr-3"
                    style={{ color: "var(--muted-text)" }}
                  />
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchQuery}
                    onFocus={openModal}
                    readOnly
                    className="flex-1 bg-transparent outline-none text-sm placeholder-[var(--muted-text)]"
                    style={{ color: "var(--text-color)" }}
                  />
                </div>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="flex flex-wrap gap-2 justify-start">
                  {isLoading &&
                    Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-20 rounded-full bg-gray-200 animate-pulse"
                      />
                    ))}

                  {isError && (
                    <span className="text-xs text-gray-500 italic">
                      Popular tags unavailable
                    </span>
                  )}

                  {!isLoading &&
                    !isError &&
                    popularTags?.map((tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(tag.label);
                          openModal();
                        }}
                        className="flex items-center text-[10px] px-3 py-1 rounded-full border transition-all duration-200 ease-in-out hover:shadow-md"
                        style={{
                          backgroundColor: "var(--surface-color)",
                          color: "var(--text-color)",
                          borderColor: "var(--border-color)",
                        }}
                      >
                        <TrendingUp
                          className="w-3 h-3 mr-1"
                          style={{ color: "var(--accent-color)" }}
                        />
                        {tag.label}
                      </button>
                    ))}
                </div>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden lg:flex justify-center flex-1 max-w-[550px] lg:w-1/2"
        >
          <img
            src="/red-car.png"
            alt="Search Car"
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

        {/* Background blur */}
        <div className="absolute top-[-4rem] right-[-4rem] w-[250px] h-[250px] bg-[var(--accent-color)] rounded-full blur-3xl opacity-20 z-0" />
      </div>
      <hr className="border-t border-[color:var(--border-color)] mx-6 sm:mx-10 lg:mx-20" />
    </>
  );
};

export default SearchExperience;