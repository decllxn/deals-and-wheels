import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react'; // Reusing the book icon for glossary

const darkBackgroundColor = "#1f1f1f";
const secondaryBackgroundColor = "#2a2a2a";
const lightTextColor = "rgba(255, 255, 255, 0.6)"; // Slightly transparent white

export default function EditorialGlossarySection() {
  const [glossaryArticles, setGlossaryArticles] = useState([]);
  const [glossaryCategories, setGlossaryCategories] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch glossary articles from API
  const fetchGlossaryArticles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/glossary/api/latest/');
      setGlossaryArticles(response.data);
    } catch (error) {
      console.error("Error fetching glossary articles:", error);
    } finally {
      setIsLoadingArticles(false);
    }
  };

  // Fetch glossary categories from API
  const fetchGlossaryCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/glossary/api/glossary-categories/');
      setGlossaryCategories(response.data);
    } catch (error) {
      console.error("Error fetching glossary categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Call fetch functions when the component mounts
  useEffect(() => {
    fetchGlossaryArticles();
    fetchGlossaryCategories();
  }, []);

  const defaultImage = "https://via.placeholder.com/400x300?text=Glossary"; // Fallback image

  const NoGlossary = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-[#1f1f1f] bg-opacity-70">
      <BookOpen className="w-12 h-12 text-white mb-4" />
      <p className="text-lg text-white font-medium">{message}</p>
      <p className="text-sm text-white mt-2">Explore the automotive world!</p>
    </div>
  );

  const NoGlossaryCategories = () => (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-[#1f1f1f] bg-opacity-70">
      <svg className="w-10 h-10 text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
      </svg>
      <p className="text-md text-white font-medium">No glossary categories found.</p>
      <p className="text-sm text-white mt-2">Categorizing terms!</p>
    </div>
  );

  return (
    <section className={`bg-[${darkBackgroundColor}] text-white px-6 md:px-16 py-20 space-y-16`}>
      {/* Glossary Articles */}
      <div>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Latest Automotive Glossary</h2>
          <Link
            to="/glossary" // Assuming you have a /glossary page
            className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-sm"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {isLoadingArticles ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-800 rounded-2xl animate-pulse" />
            ))
          ) : glossaryArticles.length > 0 ? (
            glossaryArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className={`bg-[${secondaryBackgroundColor}] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col`}
              >
                <img
                  src={article.thumbnail_image || defaultImage}
                  alt={article.title || "Glossary Term"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <p className={`text-sm text-[${lightTextColor}]`}>{new Date(article.created_at).toLocaleDateString() || "Date unavailable"}</p>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {article.title || "Untitled Term"}
                  </h3>
                  <p className={`text-gray-300 text-sm flex-grow line-clamp-2`}>{article.excerpt || ""}</p>
                  <Link to={`/glossary/${article.slug || article.id}`} className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-sm">
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <NoGlossary message="No glossary terms available right now." />
          )}
        </div>
      </div>

      {/* Glossary Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Browse Glossary Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoadingCategories ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-800 rounded-xl animate-pulse" />
            ))
          ) : glossaryCategories.length > 0 ? (
            glossaryCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15 }}
                className="relative h-28 rounded-xl overflow-hidden group shadow-md cursor-pointer"
              >
                <img
                  src={cat.image || defaultImage}
                  alt={cat.name || "Category"}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h4 className="text-white text-base font-semibold text-center px-2">
                    {cat.name || "Unnamed"}
                  </h4>
                </div>
              </motion.div>
            ))
          ) : (
            <NoGlossaryCategories />
          )}
        </div>
      </div>
    </section>
  );
}