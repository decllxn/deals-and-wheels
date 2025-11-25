import React, { useState, useEffect, useMemo, useCallback } from "react";
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

  const memoizedFilters = useMemo(() => appliedFilters, [appliedFilters]);

  // Load saved filters
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilters");
    if (saved) setAppliedFilters(JSON.parse(saved));
  }, []);

  // Save filters
  useEffect(() => {
    localStorage.setItem("appliedFilters", JSON.stringify(appliedFilters));
  }, [appliedFilters]);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = (e) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () =>
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
  }, []);

  // Scroll lock for mobile drawer
  useEffect(() => {
    document.body.style.overflow = isMobile && filtersOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMobile, filtersOpen]);

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && filtersOpen) setFiltersOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtersOpen]);

  const formatFilterLabel = useCallback((key, value) => {
    switch (key) {
      case "min_price":
        return `Min Price: KES ${Number(value).toLocaleString()}`;
      case "max_price":
        return `Max Price: KES ${Number(value).toLocaleString()}`;
      case "min_year":
        return `From Year: ${value}`;
      case "max_year":
        return `To Year: ${value}`;
      case "mileage":
        return `Mileage: ${Number(value).toLocaleString()} km`;
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
        return value; // Show make directly, logo is included
      case "model":
        return value;
      default:
        return `${key}: ${value}`;
    }
  }, []);

  return (
    <>
      <UsedCarsHero />

      <div
        className="max-w-[1600px] mx-auto px-6 py-12"
        style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
      >
        {/* TOP BAR */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Browse{" "}
            <span style={{ color: "var(--accent-color)" }}>{count.toLocaleString()}</span>{" "}
            cars
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen((s) => !s)}
              className="flex items-center px-4 py-2 rounded-lg text-sm font-medium shadow-sm border border-[var(--border-color)]"
              style={{ backgroundColor: "var(--surface-color)", color: "var(--muted-text)" }}
            >
              <div className="flex flex-col justify-center mr-2">
                {/* Thin lines icon representing filters */}
                <span className="w-5 h-[2px] bg-[var(--muted-text)] mb-[2px] block"></span>
                <span className="w-5 h-[2px] bg-[var(--muted-text)] mb-[2px] block"></span>
                <span className="w-5 h-[2px] bg-[var(--muted-text)] block"></span>
              </div>
              {filtersOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        {/* FILTER CHIPS */}
        {Object.keys(appliedFilters).length > 0 && (
          <div className="mb-6 flex flex-wrap gap-3">
            {Object.entries(appliedFilters).map(([key, val]) => (
              <span
                key={key}
                className="flex items-center px-3 py-1.5 rounded-full text-sm shadow-sm bg-[var(--border-color)]"
                style={{ color: "var(--text-color)" }}
              >
                {/* Make logo */}
                {key === "make" && (
                  <img
                    src={`/Brand_logos/${val.toLowerCase()}.png`}
                    alt={val}
                    className="w-5 h-5 mr-2 object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
                {formatFilterLabel(key, val)}
                <button
                  className="ml-2 hover:text-[var(--accent-color)] font-bold"
                  onClick={() =>
                    setAppliedFilters((prev) => {
                      const p = { ...prev };
                      delete p[key];
                      return p;
                    })
                  }
                  aria-label={`Remove filter ${key}`}
                >
                  ✕
                </button>
              </span>
            ))}

            <button
              onClick={() => setAppliedFilters({})}
              className="px-4 py-1.5 text-sm rounded-full border"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--muted-text)",
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* LAYOUT GRID */}
        <div
          className={`grid gap-8 relative ${
            filtersOpen && !isMobile ? "lg:grid-cols-[280px_minmax(0,1fr)]" : "lg:grid-cols-1"
          }`}
        >
          {/* DESKTOP SIDEBAR */}
          <AnimatePresence>
            {!isMobile && filtersOpen && (
              <motion.aside
                key="desktop-filters"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
                className="hidden lg:block sticky top-28 h-fit"
                aria-hidden={!filtersOpen}
              >
                <div style={{ width: 280 }}>
                  <FiltersContainer
                    appliedFilters={appliedFilters}
                    setAppliedFilters={setAppliedFilters}
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* LISTINGS */}
          <motion.div
            key="listings"
            layout
            transition={{ duration: 0.32 }}
            className="min-h-[400px] min-w-0"
          >
            <Listings
              filters={memoizedFilters}
              filtersOpen={filtersOpen}
              onCountChange={setCount}
            />
          </motion.div>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {isMobile && filtersOpen && (
            <>
              <motion.div
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-[var(--surface-color)] z-50 p-5 shadow-xl overflow-y-auto"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Deals<span style={{ color: "var(--accent-color)" }}>&</span>Wheels
                  </h2>
                  <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                    <FiX size={26} className="text-[var(--muted-text)]" />
                  </button>
                </div>

                <FiltersContainer
                  appliedFilters={appliedFilters}
                  setAppliedFilters={setAppliedFilters}
                />
              </motion.div>

              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setFiltersOpen(false)}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default UsedCars;