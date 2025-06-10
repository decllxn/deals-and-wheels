import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import EditorialTabs from "../components/editorial/EditorialTabs";

// Tab contents
import NewsTabContent from "../components/editorial/tabs/NewsTabContent";
import BlogsTabContent from "../components/editorial/tabs/BlogsTabContent";
import GuidesTabContent from "../components/editorial/tabs/GuidesTabContent";
import GlossaryTabContent from "../components/editorial/tabs/GlossaryTabContent";
import CarReviewsTabContent from "../components/editorial/tabs/CarReviewsTabContent";

const tabs = [
  "News",
  "Blogs",
  "Guides",
  "Automotive Glossary",
  "Car Reviews",
];

export default function Editorial() {
  const [activeTab, setActiveTab] = useState("News");

  return (
    <AppLayout>
      <div
        className="w-full max-w-7xl mx-auto p-4"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <EditorialTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === "News" && <NewsTabContent />}
          {activeTab === "Blogs" && <BlogsTabContent />}
          {activeTab === "Guides" && <GuidesTabContent />}
          {activeTab === "Automotive Glossary" && <GlossaryTabContent />}
          {activeTab === "Car Reviews" && <CarReviewsTabContent />}
        </div>
      </div>
    </AppLayout>
  );
}