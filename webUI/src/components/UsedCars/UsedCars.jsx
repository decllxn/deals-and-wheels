import React, { useState, useEffect, useMemo } from "react";
import FiltersContainer from "./Filters/FiltersContainer";
import Listings from "./Listings";
import { LuListCollapse } from "react-icons/lu";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import UsedCarsHero from "./UsedCarsHero";

const UsedCars = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [count, setCount] = useState(0);

  const handleToggle = () => setFiltersOpen((prev) => !prev);
  const memoizedFilters = useMemo(() => appliedFilters, [appliedFilters]);

  // ✅ Load filters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilters");
    if (saved) {
      setAppliedFilters(JSON.parse(saved));
    }
  }, []);

  // ✅ Save filters to localStorage
  useEffect(() => {
    localStorage.setItem("appliedFilters", JSON.stringify(appliedFilters));
  }, [appliedFilters]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Disable scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && filtersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen, isMobile]);

  // ✅ Format filter labels nicely
  const formatFilterLabel = (key, value) => {
    switch (key) {
      case "min_price":
      case "max_price":
        return `Price: $${value.toLocaleString()}`;
      case "min_year":
      case "max_year":
        return `Year: ${value}`;
      case "fuel_type":
        return `Fuel: ${value}`;
      case "transmission":
        return `Transmission: ${value}`;
      case "body_style":
        return `Body: ${value}`;
      case "seller_type":
        return `Seller: ${value}`;
      case "condition":
        return `Condition: ${value}`;
      case "make":
        return `Make: ${value}`;
      case "model":
        return `Model: ${value}`;
      default:
        return `${key}: ${value}`;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <UsedCarsHero />

      <div
        className="max-w-[1600px] mx-auto px-6 py-12"
        style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
      >
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Browse{" "}
            <span style={{ color: "var(--accent-color)" }}>
              {count.toLocaleString()}
            </span>{" "}
            cars
          </h1>

          <button
            className="flex items-center px-5 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out shadow-sm"
            style={{
              backgroundColor: "var(--surface-color)",
              color: "var(--muted-text)",
              border: "1px solid var(--border-color)",
            }}
            onClick={handleToggle}
          >
            <LuListCollapse className="mr-2" size={18} />
            {filtersOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Active filter chips */}
        {Object.entries(appliedFilters).length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {Object.entries(appliedFilters).map(([key, val]) =>
              val ? (
                <span
                  key={key}
                  className="flex items-center px-4 py-1.5 rounded-full text-sm shadow-sm"
                  style={{
                    backgroundColor: "var(--border-color)",
                    color: "var(--text-color)",
                  }}
                >
                  <span>{formatFilterLabel(key, val)}</span>
                  <button
                    onClick={() =>
                      setAppliedFilters((prev) => {
                        const updated = { ...prev };
                        delete updated[key];
                        return updated;
                      })
                    }
                    className="ml-3 font-bold hover:text-[var(--accent-color)] transition"
                  >
                    ✕
                  </button>
                </span>
              ) : null
            )}

            {/* Clear All */}
            <button
              onClick={() => setAppliedFilters({})}
              className="ml-2 px-4 py-1.5 rounded-full text-sm border font-medium"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--muted-text)",
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Main Layout */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {/* Sidebar filters (desktop) */}
          <AnimatePresence>
            {filtersOpen && !isMobile && (
              <motion.div
                key="desktop-filters"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="hidden md:block md:col-span-1"
              >
                <FiltersContainer
                  appliedFilters={appliedFilters}
                  setAppliedFilters={setAppliedFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Listings area */}
          <motion.div
            key="listings"
            layout
            transition={{ duration: 0.4 }}
            className={`${
              filtersOpen && !isMobile
                ? "md:col-span-2 lg:col-span-3"
                : "col-span-1 md:col-span-3 lg:col-span-4"
            }`}
          >
            <Listings
              filters={memoizedFilters}
              filtersOpen={filtersOpen}
              onCountChange={setCount}
            />
          </motion.div>
        </div>

        {/* Mobile Slide-in Sidebar */}
        <AnimatePresence>
          {isMobile && filtersOpen && (
            <motion.div
              key="mobile-filters"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-80 bg-[var(--surface-color)] z-50 p-4 shadow-lg md:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Deals<span style={{ color: "var(--accent-color)" }}>&</span>Wheels
                </h2>
                <button onClick={handleToggle} className="text-[var(--muted-text)]">
                  <FiX size={24} />
                </button>
              </div>
              <FiltersContainer
                appliedFilters={appliedFilters}
                setAppliedFilters={setAppliedFilters}
              />
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