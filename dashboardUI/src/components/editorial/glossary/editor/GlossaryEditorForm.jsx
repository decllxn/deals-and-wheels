import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import GuideEditor from './GlossaryEditor'; // Assuming you have created GuideEditor.js

export default function GlossaryEditorForm() {
  const [term, setTerm] = useState('');
  const [slug, setSlug] = useState('');
  const [definition, setDefinition] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [relatedTerms, setRelatedTerms] = useState('');
  const [synonyms, setSynonyms] = useState('');

  // Handle term change and generate slug automatically
  const handleTermChange = useCallback((e) => {
    const value = e.target.value;
    setTerm(value);
    setSlug(value.toLowerCase().replace(/\s+/g, '-'));
  }, []);

  // Render the form
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-md)] shadow-md p-6 space-y-6 text-[var(--text)] overflow-x-hidden">
      <h2 className="text-xl font-semibold mb-4">Create New Glossary Term</h2>

      {/* Term and Slug */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="term" className="block text-sm font-medium mb-1">Term</label>
          <input
            type="text"
            id="term"
            placeholder="Enter glossary term"
            value={term}
            onChange={handleTermChange}
            className="input-style"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug (URL)</label>
          <input
            type="text"
            id="slug"
            value={slug}
            readOnly
            className="input-style text-muted"
          />
        </div>
      </div>

      {/* Definition */}
      <div>
        <label htmlFor="definition" className="block text-sm font-medium mb-1">Definition</label>
        <div className="editor-container">
          <GuideEditor content={definition} onChange={setDefinition} id="definition" />
        </div>
      </div>

      {/* Tags, Category */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            id="tags"
            placeholder="e.g., car, terminology, explanation"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input-style"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            id="category"
            placeholder="e.g., General, Technical"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-style"
          />
        </div>
      </div>

      {/* Related Terms and Synonyms */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="relatedTerms" className="block text-sm font-medium mb-1">Related Terms</label>
          <input
            type="text"
            id="relatedTerms"
            placeholder="e.g., Term B, Term C"
            value={relatedTerms}
            onChange={(e) => setRelatedTerms(e.target.value)}
            className="input-style"
          />
        </div>
        <div>
          <label htmlFor="synonyms" className="block text-sm font-medium mb-1">Synonyms</label>
          <input
            type="text"
            id="synonyms"
            placeholder="e.g., Alternate Term, Equivalent Term"
            value={synonyms}
            onChange={(e) => setSynonyms(e.target.value)}
            className="input-style"
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
          className="checkbox-style"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <label htmlFor="isFeatured" className="text-sm font-medium">🌟 Mark as Featured Term</label>
      </motion.div>

      {/* SEO */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">SEO Optimization</h3>
        <div>
          <label htmlFor="metaDescription" className="block text-sm font-medium mb-1">Meta Description</label>
          <textarea
            id="metaDescription"
            placeholder="Briefly describe the term for search engines"
            className="input-style"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows="3"
          />
        </div>
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium mb-1">Keywords</label>
          <input
            type="text"
            id="keywords"
            placeholder="e.g., term, definition, explanation"
            className="input-style"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button className="button-style">Save Draft</button>
        <button className="button-style primary">Publish Term</button>
      </div>
    </div>
  );
}