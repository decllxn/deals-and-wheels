import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
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

import GuideEditorToolbar from './GuideEditorToolbar'; // Assuming you'll create this toolbar

export default function GuideEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }), // Keeping code block separate for guides
      Underline,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        autolink: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Highlight,
      Placeholder.configure({
        placeholder: '✍️ Start writing your guide...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock,
      Bold,
      Italic,
      Strike,
      HorizontalRule,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-md w-full max-w-full"
    >
      {editor && <GuideEditorToolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className="prose max-w-none px-5 py-4 focus:outline-none text-[var(--text)] dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--accent)] prose-code:bg-muted/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
      />
    </motion.div>
  );
}