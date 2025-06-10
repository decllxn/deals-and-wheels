export function Reviews({ comments = [], videos = [] }) {
  const hasVideos = videos && videos.length > 0;

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
          Customer & Expert Reviews
        </h2>
        <p className="text-[var(--muted-text)] text-lg">
          What enthusiasts and professionals are saying about this brand.
        </p>
      </div>

      {/* Comments Section */}
      {comments.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-4 text-[var(--muted-text)] text-lg leading-relaxed">
          {comments.map((comment, idx) => (
            <blockquote
              key={idx}
              className="border-l-4 border-[var(--highlight-color)] pl-4 italic"
            >
              “{comment}”
            </blockquote>
          ))}
        </div>
      )}

      {/* Video Section */}
      <div className="space-y-6">
        {hasVideos ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(0, 3).map((url, idx) => (
                <div
                  key={idx}
                  className="aspect-video rounded-lg overflow-hidden shadow-lg"
                >
                  <iframe
                    src={url}
                    title={`Review Video ${idx + 1}`}
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
            <div className="text-center pt-4">
              <button className="px-6 py-3 text-sm font-semibold rounded-full bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] transition">
                See All Reviews
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-[var(--muted-text)] italic">
            No video reviews available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}