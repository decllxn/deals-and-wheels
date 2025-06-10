import React, { useEffect, useRef, useState } from "react";

// Optional helper to extract ToC from content dynamically
const extractTableOfContents = (content) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;
  const headings = tempDiv.querySelectorAll("h2, h3");
  return Array.from(headings).map((heading) => ({
    id: heading.id || heading.textContent.replace(/\s+/g, "-").toLowerCase(),
    text: heading.textContent,
    level: heading.tagName,
  }));
};

const BlogContent = ({ content }) => {
  const contentRef = useRef();
  const [toc, setToc] = useState([]);

  useEffect(() => {
    setToc(extractTableOfContents(content));
  }, [content]);

  return (
    <section className="py-16 px-6 md:px-16 relative overflow-hidden" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Table of Contents */}
        {toc.length > 0 && (
          <aside className="hidden md:block w-1/4 sticky top-32 self-start">
            <h3 className="font-semibold mb-4 text-sm text-[var(--muted-text)]">Contents</h3>
            <ul className="space-y-3 text-sm">
              {toc.map((item, idx) => (
                <li key={idx} className="transition hover:text-[var(--accent-color)]">
                  <a href={`#${item.id}`} className={`pl-${item.level === "H3" ? 4 : 0}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main Content */}
        <article
          ref={contentRef}
          className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
          style={{
            "--tw-prose-body": "var(--text-color)",
            "--tw-prose-headings": "var(--text-color)",
            "--tw-prose-links": "var(--accent-color)",
            "--tw-prose-bold": "var(--text-color)",
            "--tw-prose-code": "var(--accent-color)",
            "--tw-prose-quote-borders": "var(--highlight-color)",
            "--tw-prose-quotes": "var(--muted-text)",
            "--tw-prose-bullets": "var(--accent-color)",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

      </div>
    </section>
  );
};

export default BlogContent;