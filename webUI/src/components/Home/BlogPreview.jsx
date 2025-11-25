import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import BlogCard from "./BlogCard";
import useLatestBlogs from "@/hooks/useLatestBlogs";

export default function BlogPreview() {
  const { blogs, loading, error } = useLatestBlogs();

  return (
    <section className="px-6 md:px-16 py-20 bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-3">
          <h2 className="text-3xl md:text-4xl font-bold">
            Zamara <span className="text-[var(--accent-color)]">Blog</span>
          </h2>
          <Link
            to="editorial/blogs"
            className="flex items-center gap-2 text-sm font-medium text-[var(--accent-color)] hover:text-[var(--accent-hover)]"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl animate-pulse shadow-md"
                style={{ backgroundColor: "var(--surface-color)" }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {/* No Blogs */}
        {!loading && !error && blogs.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md shadow-md col-span-3">
            <BookOpen className="w-12 h-12 mb-4 text-[var(--text-color)]" />
            <p className="text-lg font-medium">No blog posts found.</p>
            <p className="text-sm mt-2 text-[var(--muted-text)]">
              Check back for new posts!
            </p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && blogs.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <BlogCard key={blog.id} blog={blog} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}