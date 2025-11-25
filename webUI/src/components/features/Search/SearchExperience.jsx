import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchHeader from "./SearchHeader";
import SearchInput from "./SearchInput";
import PopularTags from "./PopularTags";
import ViewTabs from "./ViewTabs";
import SearchModal from "./SearchModal";

export default function SearchExperience() {
  const [activeView, setActiveView] = useState("Find a Car");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="relative w-full py-16 px-6 sm:px-10 flex flex-col items-start justify-between gap-y-12 overflow-hidden lg:flex-row lg:items-center lg:gap-20 lg:py-24"
        style={{
          color: "var(--text-color)",
          backgroundColor: "var(--bg-color)",
        }}
      >
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl text-left relative z-10 lg:w-1/2"
        >
          {/* Small Screen Image */}
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

          {/* Headline + Description */}
          <SearchHeader activeView={activeView} />

          {/* View Switch Tabs */}
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

          {/* Conditional search UI */}
          {activeView === "Find a Car" && (
            <>
              <SearchInput
                query={searchQuery}
                setQuery={setSearchQuery}
                onFocus={openModal}
              />
              <PopularTags setSearchQuery={setSearchQuery} openModal={openModal} />
            </>
          )}
        </motion.div>

        {/* Right Image */}
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

        {/* Accent Light */}
        <div className="absolute top-[-4rem] right-[-4rem] w-[250px] h-[250px] bg-[var(--highlight-color)] rounded-full blur-3xl opacity-20 z-0" />
      </div>

      <hr className="border-t border-[color:var(--border-color)] mx-6 sm:mx-10 lg:mx-20" />
    </>
  );
}