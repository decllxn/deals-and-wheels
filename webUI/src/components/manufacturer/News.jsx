import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function News() {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/manufacturers/api/${slug}/news/`);
        if (!res.ok) throw new Error("Failed to fetch news articles.");
        const data = await res.json();
        setNews(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [slug]);

  const latestNews = news.slice(0, 5);
  const hasNews = latestNews.length > 0;
  const brandName = news[0]?.manufacturer?.name || slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <section
      className="px-6 py-16 md:py-24 max-w-7xl mx-auto space-y-12"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Latest {brandName} News
        </h2>
        <p className="text-[var(--muted-text)] text-lg">
          Stay updated with recent headlines and insights from the world of {brandName}.
        </p>
      </div>

      {/* Loading */}
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

      {/* News Grid */}
      {!loading && hasNews ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestNews.map((item, idx) => (
            <a
              href={`/editorial/blogs/${item.slug}`}
              key={item.id}
              className={`group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 bg-[var(--surface-color)] flex flex-col ${
                idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
              style={{ border: "1px solid var(--border-color)" }}
            >
              {/* Image */}
              {item.image && (
                <div className="aspect-video w-full relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-grow space-y-2">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-[var(--highlight-color)]">
                    {new Date(item.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="text-lg font-semibold leading-tight group-hover:underline">
                    {item.title}
                  </h3>
                  <p className="text-[var(--muted-text)] text-sm leading-relaxed line-clamp-3">
                    {item.content.replace(/<[^>]+>/g, "").slice(0, 160)}...
                  </p>
                </div>
                <div className="text-sm text-[var(--accent-color)] font-medium group-hover:underline mt-2">
                  Read full story →
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center italic text-[var(--muted-text)]">
            No news articles available at this time.
          </p>
        )
      )}

      {/* CTA */}
      {hasNews && !loading && (
        <div className="text-center">
          <button className="px-6 py-3 text-sm font-semibold rounded-full bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition">
            See All News
          </button>
        </div>
      )}
    </section>
  );
}