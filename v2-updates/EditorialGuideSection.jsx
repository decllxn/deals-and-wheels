import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { ArrowRight } from "lucide-react";

const darkBackgroundColor = "#1f1f1f";
const secondaryBackgroundColor = "#2a2a2a";
const lightTextColor = "rgba(255, 255, 255, 0.6)"; // Slightly transparent white

export default function EditorialGuideSection() {
  const [buyingSellingGuides, setBuyingSellingGuides] = useState([]);
  const [isLoadingGuides, setIsLoadingGuides] = useState(true);

  useEffect(() => {
    // Fetch the latest guides from the backend
    const fetchGuides = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/guides/latest/");
        const data = await response.json();
        setBuyingSellingGuides(data); // Assuming the response contains the list of guides
      } catch (error) {
        console.error("Error fetching guides:", error);
      } finally {
        setIsLoadingGuides(false);
      }
    };

    fetchGuides();
  }, []);

  const NoGuides = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-[#1f1f1f] bg-opacity-70">
      <BookOpen className="w-12 h-12 text-white mb-4" />
      <p className="text-lg text-white font-medium">{message}</p>
      <p className="text-sm text-white mt-2">Stay informed!</p>
    </div>
  );

  return (
    <section className={`bg-[${darkBackgroundColor}] text-white px-6 md:px-16 py-20 space-y-16`}>
      <div>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Buying & Selling Guides</h2>
          <Link
            to="/guides" // Assuming you have a /guides page
            className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-sm"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {isLoadingGuides ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-800 rounded-2xl animate-pulse" />
            ))
          ) : buyingSellingGuides.length > 0 ? (
            buyingSellingGuides.map((guide, idx) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className={`bg-[${secondaryBackgroundColor}] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col`}
              >
                <img
                  src={guide.cover_image}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <BookOpen size={14} /> {guide.guide_type || "Guide"}
                  </div>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {guide.title || "Untitled Guide"}
                  </h3>
                  <p className={`text-gray-300 text-sm flex-grow line-clamp-2`}>{guide.excerpt || ""}</p>
                  <Link to={`/guides/${guide.slug || guide.id}`} className="text-blue-500 hover:text-blue-400 text-sm mt-2 flex items-center gap-1">
                    Read Guide <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <NoGuides message="No buying & selling guides available right now." />
          )}
        </div>
      </div>
    </section>
  );
}