// components/ExploreCars/ExploreCars.jsx

import React from 'react';
import SectionHeader from './SectionHeader';
import CarTypeGrid from './CarTypeGrid';
import ManufacturerList from './ManufacturerList';
import SubBrandList from './SubBrandList';
import { carTypes, mainManufacturersData, subBrandsTuningData } from './carData';

const ExploreCars = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Explore Our Extensive Car Library"
          subtitle="Discover your next vehicle by exploring different types and manufacturers."
        />
        <CarTypeGrid carTypes={carTypes} />
        <ManufacturerList manufacturers={mainManufacturersData} />
        <SubBrandList subBrands={subBrandsTuningData} />
      </div>
    </section>
  );
};

export default ExploreCars;