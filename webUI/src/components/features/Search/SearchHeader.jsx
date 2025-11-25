import React from "react";

export default function SearchHeader({ activeView }) {
  return (
    <div className="mb-8">
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
              Zamara
            </span>
            , we simplify your journey to owning the perfect car.
          </>
        ) : (
          <>
            Browse honest feedback from real car owners. Drive
            confidently with{" "}
            <span className="font-bold text-[var(--text-color)]">
              Zamara
            </span>
            .
          </>
        )}
      </p>
    </div>
  );
}