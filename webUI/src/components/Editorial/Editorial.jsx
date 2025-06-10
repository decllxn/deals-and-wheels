import React from "react";
import HeroSection from "./HeroSection";
import EditorialNewsSection from "./EditorialNewsSection";
import EditorialBlogSection from "./EditorialBlogSection";
import EditorialReviewSection from "./EditorialReviewSection";
import EditorialGuideSection from "./EditorialGuideSection";
import EditorialGlossarySection from "./EditorialGlossarySection";


const Editorial = () => {
    return (
        <div>
            <HeroSection />
            <EditorialNewsSection />
            <EditorialBlogSection />
            <EditorialGuideSection />
            <EditorialGlossarySection />
            <EditorialReviewSection />
        </div>
    )
}

export default Editorial