import React from "react";
import Navbar from "../components/Weblayout/Navbar";
import BlogDetail from "../components/Blog-detail/BlogDetail";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import Footer from "../components/Weblayout/Footer";

const ArticleDetailPage = () => {
    return (
        <div>
            <Navbar />
            <BlogDetail />
            <WhyDealsAndWheels />
            <Footer />
        </div>
    )
}

export default ArticleDetailPage;