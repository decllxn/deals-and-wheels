import React from "react";
import { Navbar } from "@components/layout";
import { Footer } from "@components/layout";
import HeroSection from "../../components/Blog/HeroSection";
import TrendingArticles from "../../components/Blog/TrendingArticles";
import AdBanner from "../../components/Blog/AdBanner";
import Categories from "../../components/Blog/Categories";
import LatestPosts from "../../components/Blog/LatestPosts";
import RecommendedReads from "../../components/Blog/RecommendedReads";


const BlogHome = () => {
  return (
    <>
    <Navbar />
      <HeroSection />
        <TrendingArticles />
        <AdBanner slotId="1234567890" format="rectangle" />
        <Categories />
        <LatestPosts />
        <RecommendedReads />
    <Footer />
    </>
  );
};

export default BlogHome;