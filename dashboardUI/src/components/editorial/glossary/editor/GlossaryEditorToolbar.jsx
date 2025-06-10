import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  Bold, Italic, Underline, Highlighter, Quote, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  LinkIcon, Minus, Undo2, Redo2, Eraser,
} from 'lucide-react';

const ToolbarButton = React.memo(({ onClick, icon, active, label }) => (
  <button
    onClick={onClick}
    title={label}
    className={`group p-2 rounded-md transition-colors hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
      active ? 'text-primary bg-primary/10 ring-1 ring-primary/20' : 'text-muted-foreground'
    }`}
  >
    <div className="opacity-80 group-hover:opacity-100">{icon}</div>
    <span className="sr-only">{label}</span>
  </button>
));

const GlossaryEditorToolbar = ({ editor }) => {
  const [headingOpen, setHeadingOpen] = useState(false);
  const headingRef = useRef(null);

  const chain = () => editor?.chain().focus();
  const isActive = (type, attrs = {}) => editor?.isActive(type, attrs);

  // Detect click outside for closing the heading menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headingRef.current && !headingRef.current.contains(e.target)) {
        setHeadingOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toolbarButtons = useMemo(() => [
    { onClick: () => chain().toggleBold().run(), icon: <Bold size={16} />, active: isActive('bold'), label: 'Bold' },
    { onClick: () => chain().toggleItalic().run(), icon: <Italic size={16} />, active: isActive('italic'), label: 'Italic' },
    { onClick: () => chain().toggleUnderline().run(), icon: <Underline size={16} />, active: isActive('underline'), label: 'Underline' },
    { onClick: () => chain().toggleHighlight().run(), icon: <Highlighter size={16} />, active: isActive('highlight'), label: 'Highlight' },
    { onClick: () => chain().toggleCode().run(), icon: <Code size={16} />, active: isActive('code'), label: 'Inline Code' },
    { onClick: () => chain().toggleBlockquote().run(), icon: <Quote size={16} />, active: isActive('blockquote'), label: 'Blockquote' },
    { onClick: () => setHeadingOpen(!headingOpen), icon: <Heading1 size={16} />, active: isActive('heading'), label: 'Headings' },
    { onClick: () => chain().toggleBulletList().run(), icon: <List size={16} />, active: isActive('bulletList'), label: 'Bullet List' },
    { onClick: () => chain().toggleOrderedList().run(), icon: <ListOrdered size={16} />, active: isActive('orderedList'), label: 'Numbered List' },
    { onClick: () => chain().setTextAlign('left').run(), icon: <AlignLeft size={16} />, active: isActive({ textAlign: 'left' }), label: 'Left Align' },
    { onClick: () => chain().setTextAlign('center').run(), icon: <AlignCenter size={16} />, active: isActive({ textAlign: 'center' }), label: 'Center' },
    { onClick: () => chain().setTextAlign('right').run(), icon: <AlignRight size={16} />, active: isActive({ textAlign: 'right' }), label: 'Right Align' },
    { onClick: () => chain().setTextAlign('justify').run(), icon: <AlignJustify size={16} />, active: isActive({ textAlign: 'justify' }), label: 'Justify' },
    { onClick: () => chain().setHorizontalRule().run(), icon: <Minus size={16} />, label: 'Divider' },
    { onClick: () => {
      const url = prompt('Enter link:');
      if (url) chain().setLink({ href: url }).run();
    }, icon: <LinkIcon size={16} />, active: isActive('link'), label: 'Insert Link' },
    { onClick: () => chain().undo().run(), icon: <Undo2 size={16} />, label: 'Undo' },
    { onClick: () => chain().redo().run(), icon: <Redo2 size={16} />, label: 'Redo' },
    { onClick: () => chain().clearNodes().unsetAllMarks().run(), icon: <Eraser size={16} />, label: 'Clear Formatting' },
  ], [editor, headingOpen, chain, isActive]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-card/90 shadow-sm border border-muted backdrop-blur-lg">
      {toolbarButtons.map((button, index) => (
        <ToolbarButton key={index} {...button} />
      ))}

      {headingOpen && (
        <div ref={headingRef} className="absolute z-20 mt-2 bg-popover rounded-md shadow-lg border border-muted flex flex-col space-y-1 p-2">
          <ToolbarButton onClick={() => chain().toggleHeading({ level: 1 }).run()} icon={<Heading1 size={14} />} active={isActive('heading', { level: 1 })} label="H1" />
          <ToolbarButton onClick={() => chain().toggleHeading({ level: 2 }).run()} icon={<Heading2 size={14} />} active={isActive('heading', { level: 2 })} label="H2" />
          <ToolbarButton onClick={() => chain().toggleHeading({ level: 3 }).run()} icon={<Heading3 size={14} />} active={isActive('heading', { level: 3 })} label="H3" />
        </div>
      )}
    </div>
  );
};

export default GlossaryEditorToolbar;