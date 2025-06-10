import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchManufacturers() {
      try {
        const res = await fetch("http://127.0.0.1:8000/manufacturers/api/");
        const data = await res.json();
        setManufacturers(data);
      } catch (err) {
        console.error("Failed to load manufacturers", err);
      } finally {
        setLoading(false);
      }
    }

    fetchManufacturers();
  }, []);

  if (loading) {
    return (
      <section className="py-24 text-center text-lg text-[var(--muted-text)]">
        Loading manufacturers...
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-12 mt-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Browse by Manufacturer
        </h2>
        <p className="text-[var(--muted-text)] text-lg max-w-2xl mx-auto">
          Discover top automotive brands and explore their models, history, and legacy in the industry.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {manufacturers.map((brand) => (
          <Link
            to={`/manufacturers/${brand.slug}`}
            key={brand.id}
            className="group relative rounded-2xl overflow-hidden shadow-lg bg-[var(--surface-color)] hover:shadow-xl transition"
          >
            {/* Background image */}
            {brand.image ? (
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-sm">
                No image available
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex items-center justify-between">
              <div>
                <h3 className="text-white text-xl font-semibold">{brand.name}</h3>
              </div>
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="w-10 h-10 object-contain"
                />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
