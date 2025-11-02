import React, { useState, useRef } from "react";
import Navbar from "../components/Weblayout/Navbar";
import SearchExperience from "../components/Home/Search/SearchExperience";
import FeaturedCarsSlider from "../components/Home/FeaturedCarsSlider";
import BlogPreview from "../components/Home/BlogPreview";
import ReviewPreview from "../components/Home/ReviewPreview";
import CarsForSaleFilter from "../components/Home/CarsForSaleFilter";
import ListingGrid from "../components/Home/ListingGrid";
import ExploreCars from "../components/Home/Explore/ExploreCars";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";

const Home = () => {
  const [filters, setFilters] = useState({}); // ✅ central filters state
  const filterRef = useRef(null); // ✅ ref to access scrollToTop()

  return (
    <div>
      <Navbar />
      <SearchExperience />
      <FeaturedCarsSlider />

      {/* Cars For Sale Section */}
      <CarsForSaleFilter ref={filterRef} onFiltersChange={setFilters} />
      <ListingGrid filters={filters} filterRef={filterRef} />

      <ReviewPreview />
      <BlogPreview />
      <ExploreCars />
      <WhyDealsAndWheels />
      <Footer />
    </div>
  );
};

export default Home;