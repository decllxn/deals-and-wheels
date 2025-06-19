import React from "react";
import HeroSection from "./HeroSection";
import EditorialNewsSection from "./EditorialNewsSection";
import EditorialBlogSection from "./EditorialBlogSection";
import EditorialReviewSection from "./EditorialReviewSection";

const Editorial = () => {
    return (
        <div>
            <HeroSection />
            <EditorialNewsSection />
            <EditorialBlogSection />
            <EditorialReviewSection />
        </div>
    )
}

export default Editorial