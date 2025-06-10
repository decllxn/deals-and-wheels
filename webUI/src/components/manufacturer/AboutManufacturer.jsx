import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function AboutManufacturer() {
  const { slug } = useParams();
  const [history, setHistory] = useState("Loading history...");
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchManufacturerDetails() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/manufacturers/api/${slug}/`);
        if (!res.ok) throw new Error("Failed to fetch manufacturer details");
        const data = await res.json();

        setHistory(data.history || "No historical background available.");
        setAchievements(
          Array.isArray(data.achievements) && data.achievements.length > 0
            ? data.achievements
            : ["Notable achievements data not available."]
        );
      } catch (err) {
        setError(err.message);
        setHistory("Unable to load history.");
        setAchievements(["Could not load achievements."]);
      } finally {
        setLoading(false);
      }
    }

    fetchManufacturerDetails();
  }, [slug]);

  if (loading) {
    return (
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto text-center">
        <p className="text-lg text-gray-500">Loading About section...</p>
      </section>
    );
  }

  return (
    <section
      className="px-6 py-16 md:py-24 max-w-7xl mx-auto space-y-10"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          About the Brand
        </h2>
        <p className="text-lg md:text-xl font-light text-[var(--muted-text)] leading-relaxed">
          {history}
        </p>
      </div>

      {/* Achievements List */}
      <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4"
          >
            <div className="w-1 h-full bg-[var(--highlight-color)] rounded-full" />
            <p className="text-base md:text-lg font-medium leading-relaxed text-[var(--text-color)]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}