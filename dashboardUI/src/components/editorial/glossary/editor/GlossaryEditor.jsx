import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { motion } from 'framer-motion';

import GlossaryEditorToolbar from './GlossaryEditorToolbar'; // Assuming you're creating this toolbar

export default function GlossaryEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }), // Disable default codeBlock
      Underline,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        autolink: true,
      }),
      Placeholder.configure({
        placeholder: '✍️ Start writing the definition...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock, // Retained for definitions or technical content
      Bold,
      Italic,
      Strike,
      HorizontalRule,
    ],
    content,
    onUpdate: useCallback(({ editor }) => {
      // Only update content if it has changed
      const newContent = editor.getHTML();
      if (newContent !== content) {
        onChange(newContent);
      }
    }, [content, onChange]), // Depend on content and onChange for memoization
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-md"
    >
      {editor && <GlossaryEditorToolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className="prose max-w-none px-5 py-4 focus:outline-none text-[var(--text)] dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--accent)] prose-code:bg-muted/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
      />
    </motion.div>
  );
}