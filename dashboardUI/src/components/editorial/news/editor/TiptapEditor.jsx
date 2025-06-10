import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { motion } from 'framer-motion';

import Toolbar from './EditorToolbar';

export default function TiptapEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: true }),
      Underline,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        autolink: true,
      }),
      Image,
      Highlight,
      Placeholder.configure({
        placeholder: "📝 Start writing your article...",
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
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
      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-md"
    >
      {editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className="prose max-w-none px-5 py-4 focus:outline-none text-[var(--text)] dark:prose-invert prose-headings:font-semibold prose-a:text-[var(--accent)] prose-code:bg-muted/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
      />
    </motion.div>
  );
}