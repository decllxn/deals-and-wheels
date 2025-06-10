import React from "react";
import { useParams } from "react-router-dom";
import TableOfContents from "../components/Article/TableOfContents";
import SocialSharing from "../components/Article/SocialSharing";
import AuthorBio from "../components/Article/AuthorBio";
import RelatedArticles from "../components/Article/RelatedArticles";
import ArticleBanner from "../components/Article/ArticleBanner";
import Comments from "../components/Article/Comments";
import Navbar from "../components/Weblayout/Navbar";
import WhyDealsAndWheels from "../components/Weblayout/WhyDealsAndWheels";
import CarSlider from "../components/Article/CarSlider";  // Potential car slider
import Footer from "../components/Weblayout/Footer";
import AdSquare from "../components/Article/AdSquare";  // Square Ad Component
import AdHorizontal from "../components/Article/AdHorizontal"; // Horizontal Ad Component

const ArticlePage = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar />

      <div className="bg-white mt-15 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-6">
          
          {/* 📌 Left Sidebar (Sticky TOC & Ad for Large Screens) */}
          <aside className="hidden lg:flex flex-col gap-6 w-72 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
            <TableOfContents 
              sections={[
                { id: "section1", title: "Introduction" },
                { id: "section2", title: "Key Insights" },
                { id: "section3", title: "Final Thoughts" },
              ]}
            />
            
          </aside>

          {/* 📖 Main Content */}
          <main className="flex-1">
            {/* 🖼️ Featured Image */}
            <ArticleBanner 
              title="The Future of Electric Cars in 2025"
              image="/testcar.jpg"
              category="Technology"
              author="John Doe"
              date="March 29, 2025"
              readTime="5"
            />

            {/* 📌 Mobile TOC (Collapsible & Horizontally Scrollable) */}
            <div className="block lg:hidden mb-4">
              <TableOfContents 
                sections={[
                  { id: "section1", title: "Introduction" },
                  { id: "section2", title: "Key Insights" },
                  { id: "section3", title: "Final Thoughts" },
                ]}
              />
            </div>

            {/* 📢 Social Sharing */}
            <SocialSharing />

            {/* 📜 Article Content */}
            <article className="prose lg:prose-xl dark:prose-dark mt-6">
              <p>Electric cars are taking over, but what does the future hold?</p>
              <p>In this article, we explore the latest advancements in battery technology, autonomous driving, and charging infrastructure...</p>
              
              {/* 🔄 Ad in Between Content */}
              <AdHorizontal slotId="9876543210" />

              <p>Governments worldwide are pushing for more sustainable transport solutions...</p>
              <h2 id="section1">🔋 Battery Innovations</h2>
              <p>Battery range is increasing rapidly with solid-state battery technology...</p>
              
              {/* 🔄 Another Ad in Between Content */}
              <AdHorizontal slotId="5555555555" />

              <h2 id="section2">🚀 Autonomous Vehicles</h2>
              <p>AI-powered self-driving cars are closer than ever...</p>

              <h2 id="section3">🌍 Global EV Market</h2>
              <p>EV sales are projected to reach 50 million units by 2030...</p>
            </article>

            {/* 📢 Social Sharing (End of Article) */}
            <SocialSharing />
            
            {/* 📝 Author Bio */}
            <AuthorBio />

            {/* 📰 Related Articles */}
            <RelatedArticles />

            {/* 💬 Comments */}
            <Comments />
          </main>

          {/* 📌 Right Sidebar (Sticky Ad for Large Screens) */}
          <aside className="hidden xl:flex flex-col gap-6 w-72 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
            <AdSquare slotId="2468135790" />
            <AdSquare slotId="2468135790" />
          </aside>

        </div>
      </div>

      {/* 🚘 Why Choose Deals & Wheels? */}
      <WhyDealsAndWheels />

      <Footer />
    </>
  );
};

export default ArticlePage;