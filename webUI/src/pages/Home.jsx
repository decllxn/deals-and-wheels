import React from "react";
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
import Breadcrumbs from "../components/Weblayout/topbar/Breadcrumbs";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchExperience />
      <FeaturedCarsSlider />
      <CarsForSaleFilter />
      <ListingGrid />
      <ReviewPreview />
      <BlogPreview />
      <ExploreCars />
      <WhyDealsAndWheels />
      <Footer />
    </div>
  )
}

export default Home;