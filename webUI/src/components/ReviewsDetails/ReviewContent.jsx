import DOMPurify from "dompurify";

export default function ReviewContent({ content }) {
  if (!content) return null;

  return (
    <section className="prose prose-sm sm:prose lg:prose-lg max-w-4xl mx-auto px-2 md:px-0 text-[var(--text-color)] review-content">
      <div
        className="prose-img:rounded-xl prose-img:shadow-md prose-a:text-[var(--accent-color)] prose-a:underline-offset-2 prose-a:hover:text-[var(--accent-hover)]"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </section>
  );
}