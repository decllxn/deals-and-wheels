import React from "react";
import SectionHeader from "./SectionHeader";
import CarTypeGrid from "./CarTypeGrid";
import ManufacturerList from "./ManufacturerList";
import { carTypes, manufacturersData } from "./carData";

const ExploreCars = () => {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          title="Explore Our Car Library"
          subtitle="Find your perfect vehicle by browsing car types and trusted manufacturers."
        />

        <CarTypeGrid carTypes={carTypes} />
        <ManufacturerList manufacturers={manufacturersData} />
      </div>
    </section>
  );
};

export default ExploreCars;