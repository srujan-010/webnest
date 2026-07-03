"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { 
  Bold, Italic, Heading1, Heading2, Heading3, 
  List, ListOrdered, Code, Link as LinkIcon, Image as ImageIcon,
  Undo, Redo
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TiptapEditor({ value, onChange, placeholder }: TiptapEditorProps) {
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-400 underline cursor-pointer',
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-2xl border border-zinc-800 my-4',
        },
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "w-full min-h-[220px] max-h-[400px] overflow-y-auto px-4 py-3 text-xs font-medium border border-zinc-800 border-t-0 rounded-b-xl bg-zinc-950 text-white focus:outline-none prose prose-invert max-w-none select-text",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      // Simple word count
      const text = editor.getText();
      const words = text.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    },
  });

  // Keep synced if value changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter link URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImageUrl = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all select-none">
      {/* Tool bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-zinc-900 border-b border-zinc-800">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${editor.isActive("bold") ? "text-indigo-400 bg-zinc-800/80" : "text-zinc-400"}`}
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${editor.isActive("italic") ? "text-indigo-400 bg-zinc-800/80" : "text-zinc-400"}`}
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-5 bg-zinc-800 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${editor.isActive("heading", { level: 1 }) ? "text-indigo-400 bg-zinc-800/80" : "text-zinc-400"}`}
          title="Heading 1"
        >
          <Heading1 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${editor.isActive("heading", { level: 2 }) ? "text-indigo-400 bg-zinc-800/80" : "text-zinc-400"}`}
          title="Heading 2"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${editor.isActive("heading", { level: 3 }) ? "text-indigo-400 bg-zinc-800/80" : "text-zinc-400"}`}
          title="Heading 3"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-5 bg-zinc-800 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${editor.isActive("bulletList") ? "text-indigo-400 bg-zinc-800/80" : "text-zinc-400"}`}
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${editor.isActive("orderedList") ? "text-indigo-400 bg-zinc-800/80" : "text-zinc-400"}`}
          title="Ordered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-5 bg-zinc-800 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${editor.isActive("codeBlock") ? "text-indigo-400 bg-zinc-800/80" : "text-zinc-400"}`}
          title="Code Block"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={addLink}
          className={`p-2 rounded-lg hover:bg-zinc-800 transition-colors ${editor.isActive("link") ? "text-indigo-400 bg-zinc-800/80" : "text-zinc-400"}`}
          title="Insert Link"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={addImageUrl}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          title="Insert Image URL"
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-5 bg-zinc-800 mx-1 ml-auto" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Undo"
        >
          <Undo className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Redo"
        >
          <Redo className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />

      {/* Word Count Status Strip */}
      <div className="px-4 py-1.5 bg-zinc-950 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-bold tracking-wide flex items-center justify-between select-none">
        <span>Tiptap Editor Engine</span>
        <span>{wordCount} Words</span>
      </div>
    </div>
  );
}
