import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GuideEditor from './GuideEditor'; // Assuming you have created GuideEditor.js

export default function CarGuideEditorForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [readTime, setReadTime] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [condition, setCondition] = useState(''); // Added condition for car guides
  const [priceRange, setPriceRange] = useState(''); // Added price range

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <div className="w-full max-w-full bg-[var(--card)] rounded-[var(--radius-md)] shadow-md p-6 space-y-6 text-[var(--text)] overflow-x-hidden">
      <h2 className="text-xl font-semibold mb-4">Create New Car Guide</h2>

      {/* Title and Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Guide Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter guide title"
            value={title}
            onChange={handleTitleChange}
            className="placeholder:text-[var(--text-muted)] mt-1 block w-full text-lg font-semibold rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text)] py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug (URL)</label>
          <input
            type="text"
            id="slug"
            value={slug}
            readOnly
            className="placeholder:text-[var(--text-muted)] mt-1 block w-full text-sm rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-muted)] py-2 px-3"
          />
        </div>
      </div>

      {/* Cover Image */}
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium mb-1">Cover Image URL</label>
        <input
          type="text"
          id="coverImage"
          placeholder="https://example.com/cover.jpg"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="placeholder:text-[var(--text-muted)] mt-1 block w-full rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-border)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text)] py-2 px-3"
        />
      </div>

      {/* Guide Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">Guide Content</label>
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-secondary)]">
          <GuideEditor content={content} onChange={setContent} id="content" />
        </div>
      </div>

      {/* Tags, Category, Read Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            id="tags"
            placeholder="e.g., car buying, selling, maintenance"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="placeholder:text-[var(--text-muted)] mt-1 block w-full rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text)] py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            id="category"
            placeholder="e.g., Buying, Selling, Tips"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="placeholder:text-[var(--text-muted)] mt-1 block w-full rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-border)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text)] py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="readTime" className="block text-sm font-medium mb-1">Estimated Read Time (min)</label>
          <input
            type="number"
            id="readTime"
            placeholder="e.g., 10"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="placeholder:text-[var(--text-muted)] mt-1 block w-full rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-border)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text)] py-2 px-3"
          />
        </div>
      </div>

      {/* Condition and Price Range (Specific to car guides) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="condition" className="block text-sm font-medium mb-1">Condition</label>
          <input
            type="text"
            id="condition"
            placeholder="e.g., New, Used, Certified Pre-Owned"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="placeholder:text-[var(--text-muted)] mt-1 block w-full rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text)] py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium mb-1">Price Range</label>
          <input
            type="text"
            id="priceRange"
            placeholder="e.g., $10,000 - $20,000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="placeholder:text-[var(--text-muted)] mt-1 block w-full rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-border)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text)] py-2 px-3"
          />
        </div>
      </div>

      {/* Featured Guide */}
      <motion.div
        className="flex items-center gap-4 p-3 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--bg-secondary)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="checkbox"
          id="isFeatured"
          className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)] h-5 w-5"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <label htmlFor="isFeatured" className="text-sm font-medium">
          🌟 Mark as Featured Guide
        </label>
      </motion.div>

      {/* SEO */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">SEO Optimization</h3>
        <div>
          <label htmlFor="metaDescription" className="block text-sm font-medium mb-1">
            Meta Description
          </label>
          <textarea
            id="metaDescription"
            placeholder="Briefly describe the guide for search engines"
            className="placeholder:text-[var(--text-muted)] mt-1 block w-full rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-border)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text)] py-2 px-3"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows="3"
          />
        </div>
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium mb-1">
            Keywords
          </label>
          <input
            type="text"
            id="keywords"
            placeholder="e.g., car buying tips, selling cars, car maintenance"
            className="placeholder:text-[var(--text-muted)] mt-1 block w-full rounded-[var(--radius-sm)] shadow-sm focus:ring-[var(--input-focus)] focus:border-[var(--input-border)] border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text)] py-2 px-3"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          className="inline-flex items-center px-4 py-2 border border-[var(--border)] rounded-[var(--radius-sm)] shadow-sm text-sm font-medium bg-[var(--input-bg)] text-[var(--text)] hover:bg-[var(--card-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] transition-colors"
        >
          Save Draft
        </button>
        <button
          className="inline-flex items-center px-6 py-2 border border-transparent rounded-[var(--radius-sm)] shadow-sm text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] transition-colors"
        >
          Publish Guide
        </button>
      </div>
    </div>
  );
}