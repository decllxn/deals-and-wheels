import React, { useRef, useState, useEffect } from 'react';
import {
  Bold, Italic, Underline, Highlighter, Quote, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, CheckSquare, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Code2, ImageIcon, LinkIcon, Youtube, Minus, Undo2, Redo2, Eraser, Upload
} from 'lucide-react';

const ToolbarButton = ({ onClick, icon, active, label }) => (
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
);

const BlogEditorToolbar = ({ editor }) => {
  const [headingOpen, setHeadingOpen] = useState(false);
  const headingRef = useRef(null);

  const chain = () => editor?.chain().focus();
  const isActive = (type, attrs = {}) => editor?.isActive(type, attrs);

  const handleLocalImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        chain().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headingRef.current && !headingRef.current.contains(e.target)) {
        setHeadingOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-card/90 shadow-sm border border-muted backdrop-blur-lg">
      {/* Text formatting */}
      <ToolbarButton onClick={() => chain().toggleBold().run()} icon={<Bold size={16} />} active={isActive('bold')} label="Bold" />
      <ToolbarButton onClick={() => chain().toggleItalic().run()} icon={<Italic size={16} />} active={isActive('italic')} label="Italic" />
      <ToolbarButton onClick={() => chain().toggleUnderline().run()} icon={<Underline size={16} />} active={isActive('underline')} label="Underline" />
      <ToolbarButton onClick={() => chain().toggleHighlight().run()} icon={<Highlighter size={16} />} active={isActive('highlight')} label="Highlight" />
      <ToolbarButton onClick={() => chain().toggleCode().run()} icon={<Code size={16} />} active={isActive('code')} label="Inline Code" />
      <ToolbarButton onClick={() => chain().toggleBlockquote().run()} icon={<Quote size={16} />} active={isActive('blockquote')} label="Blockquote" />

      {/* Headings */}
      <div ref={headingRef} className="relative">
        <ToolbarButton
          onClick={() => setHeadingOpen(!headingOpen)}
          icon={<Heading1 size={16} />}
          active={isActive('heading')}
          label="Headings"
        />
        {headingOpen && (
          <div className="absolute z-20 mt-2 bg-popover rounded-md shadow-lg border border-muted flex flex-col space-y-1 p-2">
            <ToolbarButton onClick={() => chain().toggleHeading({ level: 1 }).run()} icon={<Heading1 size={14} />} active={isActive('heading', { level: 1 })} label="H1" />
            <ToolbarButton onClick={() => chain().toggleHeading({ level: 2 }).run()} icon={<Heading2 size={14} />} active={isActive('heading', { level: 2 })} label="H2" />
            <ToolbarButton onClick={() => chain().toggleHeading({ level: 3 }).run()} icon={<Heading3 size={14} />} active={isActive('heading', { level: 3 })} label="H3" />
          </div>
        )}
      </div>

      {/* Lists */}
      <ToolbarButton onClick={() => chain().toggleBulletList().run()} icon={<List size={16} />} active={isActive('bulletList')} label="Bullet List" />
      <ToolbarButton onClick={() => chain().toggleOrderedList().run()} icon={<ListOrdered size={16} />} active={isActive('orderedList')} label="Numbered List" />
      <ToolbarButton onClick={() => chain().toggleTaskList().run()} icon={<CheckSquare size={16} />} active={isActive('taskList')} label="Task List" />

      {/* Alignment */}
      <ToolbarButton onClick={() => chain().setTextAlign('left').run()} icon={<AlignLeft size={16} />} active={isActive({ textAlign: 'left' })} label="Left Align" />
      <ToolbarButton onClick={() => chain().setTextAlign('center').run()} icon={<AlignCenter size={16} />} active={isActive({ textAlign: 'center' })} label="Center" />
      <ToolbarButton onClick={() => chain().setTextAlign('right').run()} icon={<AlignRight size={16} />} active={isActive({ textAlign: 'right' })} label="Right Align" />
      <ToolbarButton onClick={() => chain().setTextAlign('justify').run()} icon={<AlignJustify size={16} />} active={isActive({ textAlign: 'justify' })} label="Justify" />

      {/* Content & Embeds */}
      <ToolbarButton onClick={() => chain().toggleCodeBlock().run()} icon={<Code2 size={16} />} active={isActive('codeBlock')} label="Code Block" />
      <ToolbarButton onClick={() => chain().setHorizontalRule().run()} icon={<Minus size={16} />} label="Divider" />

      <ToolbarButton
        onClick={() => {
          const url = prompt('Enter image URL');
          if (url) chain().setImage({ src: url }).run();
        }}
        icon={<ImageIcon size={16} />}
        label="Insert Image URL"
      />
      <label title="Upload Image">
        <input type="file" accept="image/*" className="hidden" onChange={handleLocalImageUpload} />
        <ToolbarButton onClick={() => {}} icon={<Upload size={16} />} label="Upload Image" />
      </label>

      <ToolbarButton
        onClick={() => {
          const url = prompt('Enter video URL (YouTube)');
          if (url) chain().insertContent(`<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`).run();
        }}
        icon={<Youtube size={16} />}
        label="Insert Video"
      />

      <ToolbarButton
        onClick={() => {
          const url = prompt('Enter link:');
          if (url) chain().setLink({ href: url }).run();
        }}
        icon={<LinkIcon size={16} />}
        active={isActive('link')}
        label="Insert Link"
      />

      {/* History & Clear */}
      <ToolbarButton onClick={() => chain().undo().run()} icon={<Undo2 size={16} />} label="Undo" />
      <ToolbarButton onClick={() => chain().redo().run()} icon={<Redo2 size={16} />} label="Redo" />
      <ToolbarButton onClick={() => chain().clearNodes().unsetAllMarks().run()} icon={<Eraser size={16} />} label="Clear Formatting" />
    </div>
  );
};

export default BlogEditorToolbar;