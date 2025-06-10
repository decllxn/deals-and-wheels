import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ManufacturerHero() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchManufacturer() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/manufacturers/api/${slug}/`);
        if (!res.ok) throw new Error("Failed to fetch manufacturer info");
        const manufacturer = await res.json();
        setData(manufacturer);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchManufacturer();
  }, [slug]);

  if (loading) {
    return (
      <section className="px-6 py-24 text-center text-lg text-[var(--muted-text)]">
        Loading manufacturer data...
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="px-6 py-24 text-center text-red-600 text-lg">
        {error || "Failed to load manufacturer details."}
      </section>
    );
  }

  const { name, logo, image, description } = data;
  const tagline =
    data.tagline ||
    "Driven by passion, powered by innovation."; // Fallback tagline

  return (
    <section
      className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        border: "1px solid rgba(var(--text-color-rgb, 255, 255, 255), 0.05)",
      }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {image && (
          <img
            src={image}
            alt={`${name} Background`}
            className="w-full h-full object-cover"
            style={{
              filter: "brightness(0.7) saturate(0.9) contrast(1.05)",
              opacity: 0.8,
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.15) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(var(--bg-color-rgb, 0,0,0), 0.3) 100%)",
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 px-6 py-16 md:py-20 lg:py-24 max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-8 text-center md:text-left">
        <div className="space-y-3 md:space-y-4 max-w-xl md:w-3/5">
          <p
            className="uppercase tracking-widest text-xs md:text-sm font-semibold"
            style={{ color: "var(--highlight-color)", letterSpacing: "0.08em" }}
          >
            {name}
          </p>

          <h1
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
            style={{
              color: "var(--text-color)",
              textShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            {name}
          </h1>

          <p
            className="text-base md:text-lg italic font-light opacity-85"
            style={{ color: "var(--muted-text)" }}
          >
            “{tagline}”
          </p>

          <p
            className="text-sm md:text-base font-normal opacity-75 pt-1"
            style={{ color: "var(--muted-text)" }}
          >
            Discover models, prices, and detailed reviews from {name}.
          </p>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0 mt-6 md:mt-0">
          <div
            className="p-3 md:p-4 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: "rgba(var(--text-color-rgb, 255, 255, 255), 0.05)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(var(--text-color-rgb, 255, 255, 255), 0.1)",
            }}
          >
            <img
              src={logo}
              alt={`${name} Logo`}
              className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-95"
              style={{
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.1))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}