"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { ArrowLeft, Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading1, Heading2, Share2, Check, LoaderCircle, Lock } from "lucide-react";
import ShareDialog from "./ShareDialog";

const EMPTY = { type: "doc", content: [{ type: "paragraph" }] };

export default function DocumentEditor({ id }: { id: string }) {
  const [doc, setDoc] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [saveState, setSaveState] = useState<"saved" | "saving" | "error">("saved");
  const [shareOpen, setShareOpen] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: EMPTY,
    immediatelyRender: false,
    editable: true,
    onUpdate: ({ editor }) => {
      if (!doc || doc.permission !== "editor") return;
      setSaveState("saving");
      const timer = window.setTimeout(() => save(editor.getJSON(), undefined), 650);
      (window as any).__ajaiaSaveTimer = timer;
    }
  });

  useEffect(() => {
    fetch(`/api/documents/${id}`).then(async r => {
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Unable to load document.");
      setDoc(data); setTitle(data.title);
      editor?.commands.setContent(data.content || EMPTY);
    }).catch(e => setDoc({ error: e.message }));
  }, [id, editor]);

  async function save(content?: any, nextTitle?: string) {
    if (!doc || doc.permission !== "editor") return;
    setSaveState("saving");
    const res = await fetch(`/api/documents/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content || editor?.getJSON(), title: nextTitle ?? title })
    });
    setSaveState(res.ok ? "saved" : "error");
  }

  async function rename() {
    const value = title.trim();
    if (!value) return;
    setTitle(value);
    await save(undefined, value);
  }

  if (!doc) return <div className="flex min-h-screen items-center justify-center text-gray-500">Loading document…</div>;
  if (doc.error) return <div className="flex min-h-screen items-center justify-center text-red-600">{doc.error}</div>;

  const readOnly = doc.permission !== "editor";

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => window.location.href="/"} className="rounded-lg p-2 hover:bg-gray-100" aria-label="Back"><ArrowLeft size={19}/></button>
            <input value={title} disabled={readOnly} onChange={e => setTitle(e.target.value)} onBlur={rename}
              className="min-w-0 max-w-[420px] border-b border-transparent bg-transparent px-1 py-1 text-lg font-semibold outline-none hover:border-gray-200 focus:border-gray-400 disabled:text-gray-500"/>
            {readOnly && <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"><Lock size={12}/> View only</span>}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {saveState === "saving" ? <><LoaderCircle size={14} className="animate-spin"/> Saving…</> :
               saveState === "error" ? <span className="text-red-600">Save failed</span> : <><Check size={14}/> Saved</>}
            </div>
            {doc.isOwner && <button onClick={() => setShareOpen(true)} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold hover:bg-gray-50"><Share2 size={16}/> Share</button>}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-7">
        <div className="mb-4 flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1.5">
          <ToolbarButton active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()}><Bold size={16}/></ToolbarButton>
          <ToolbarButton active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic size={16}/></ToolbarButton>
          <ToolbarButton active={editor?.isActive("underline")} onClick={() => editor?.chain().focus().toggleUnderline().run()}><UnderlineIcon size={16}/></ToolbarButton>
          <span className="mx-1 h-7 w-px bg-gray-200"/>
          <ToolbarButton active={editor?.isActive("heading", { level: 1 })} onClick={() => editor?.chain().focus().toggleHeading({level:1}).run()}><Heading1 size={17}/></ToolbarButton>
          <ToolbarButton active={editor?.isActive("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({level:2}).run()}><Heading2 size={17}/></ToolbarButton>
          <span className="mx-1 h-7 w-px bg-gray-200"/>
          <ToolbarButton active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()}><List size={17}/></ToolbarButton>
          <ToolbarButton active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered size={17}/></ToolbarButton>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
          <EditorContent editor={editor} className={`editor-content ${readOnly ? "cursor-default" : ""}`} />
        </div>
        <p className="mt-3 text-xs text-gray-400">Changes are saved automatically. {readOnly ? "You have view-only access." : "Use the toolbar for basic rich-text formatting."}</p>
      </div>
      {shareOpen && <ShareDialog documentId={id} onClose={() => setShareOpen(false)} />}
    </main>
  );
}

function ToolbarButton({ children, onClick, active }: any) {
  return <button onClick={onClick} type="button" className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 ${active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-white"}`}>{children}</button>;
}
