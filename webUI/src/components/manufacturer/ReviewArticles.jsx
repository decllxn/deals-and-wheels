import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function ReviewArticles() {
  const { slug } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/manufacturers/api/${slug}/reviews/`);
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [slug]);

  const latestReviews = reviews.slice(0, 5);
  const hasReviews = latestReviews.length > 0;

  return (
    <section
      className="px-6 py-16 md:py-24 max-w-7xl mx-auto space-y-12"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          In-Depth Car Reviews
        </h2>
        <p className="text-[var(--muted-text)] text-lg">
          Explore expert-written deep dives into design, performance, and everyday driving impressions.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-xl bg-[var(--surface-color)] h-64 ${
                i === 0 ? "lg:col-span-2 lg:row-span-2 h-96" : ""
              }`}
            />
          ))}
        </div>
      )}

      {/* Reviews Grid */}
      {!loading && hasReviews ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestReviews.map((review, idx) => (
            <a
              href={review.url || "#"}
              key={review.id || idx}
              className={`group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 bg-[var(--surface-color)] flex flex-col ${
                idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
              style={{ border: "1px solid var(--border-color)" }}
            >
              {/* Image */}
              {review.image && (
                <div className="aspect-video w-full relative overflow-hidden">
                  <img
                    src={review.image}
                    alt={review.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              )}

              {/* Text */}
              <div className="p-5 flex flex-col justify-between flex-grow space-y-2">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-[var(--highlight-color)]">
                    {review.date || "Recently"}
                  </span>
                  <h3 className="text-lg font-semibold leading-tight group-hover:underline">
                    {review.title}
                  </h3>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed line-clamp-3">
                    {review.summary || "A detailed review with expert insight."}
                  </p>
                </div>
                <div className="text-sm text-[var(--accent-color)] font-medium group-hover:underline mt-2">
                  Read full review →
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center italic text-[var(--muted-text)]">
            No reviews available at this time.
          </p>
        )
      )}

      {/* CTA */}
      {hasReviews && !loading && (
        <div className="text-center">
          <button className="px-6 py-3 text-sm font-semibold rounded-full bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition">
            See All Reviews
          </button>
        </div>
      )}
    </section>
  );
}