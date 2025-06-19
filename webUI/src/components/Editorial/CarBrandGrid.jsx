// components/CarBrandGrid.js
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { kenyaCarBrands } from "../Reviews/Carbrands";

const NoBrands = () => (
  <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-[var(--surface-color)] bg-opacity-70">
    <svg className="w-10 h-10 text-[var(--text-color)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
    </svg>
    <p className="text-md font-medium">No car brands found.</p>
    <p className="text-sm text-[var(--muted-text)] mt-2">Brands coming soon!</p>
  </div>
);

export default function CarBrandGrid() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold">Browse Reviews by Car Brand</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        {kenyaCarBrands.length > 0 ? (
          kenyaCarBrands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`reviews?brand=${encodeURIComponent(brand.name)}`)}
              className="bg-[var(--bg-color)] p-4 rounded-xl flex items-center justify-center hover:shadow-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <img
                src={brand.logoSrc}
                alt={brand.name}
                className="h-10 object-contain"
                loading="lazy"
              />
            </motion.div>
          ))
        ) : (
          <NoBrands />
        )}
      </div>
    </div>
  );
}