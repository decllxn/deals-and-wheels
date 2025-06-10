export function Blog({ posts = [] }) {
    const latestPosts = posts.slice(0, 5);
    const hasPosts = latestPosts.length > 0;
  
    return (
      <section
        className="px-6 py-16 md:py-24 max-w-7xl mx-auto space-y-12"
        style={{
          backgroundColor: 'var(--bg-color)',
          color: 'var(--text-color)',
        }}
      >
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            From the Blog
          </h2>
          <p className="text-[var(--muted-text)] text-lg">
            Dive into stories, insights, and behind-the-scenes looks from the world of performance engineering and innovation.
          </p>
        </div>
  
        {/* Blog Grid */}
        {hasPosts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestPosts.map((post, idx) => (
              <a
                href={post.url || '#'}
                key={idx}
                className={`group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 bg-[var(--surface-color)] flex flex-col ${
                  idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
                style={{ border: '1px solid var(--border-color)' }}
              >
                {/* Image */}
                {post.image && (
                  <div className="aspect-video w-full relative overflow-hidden rounded-t-xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                )}
  
                {/* Text Content */}
                <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-[var(--highlight-color)]">
                      {post.date || 'Recently'}
                    </span>
                    <h3 className="text-lg font-semibold leading-tight group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="text-[var(--muted-text)] text-sm leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                  <div className="text-sm text-[var(--accent-color)] font-medium group-hover:underline mt-2">
                    Read full post →
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center italic text-[var(--muted-text)]">
            No blog posts available at this time.
          </p>
        )}
  
        {/* CTA */}
        <div className="text-center">
          <button className="px-6 py-3 text-sm font-semibold rounded-full bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition">
            See All Blog Posts
          </button>
        </div>
      </section>
    );
  }  