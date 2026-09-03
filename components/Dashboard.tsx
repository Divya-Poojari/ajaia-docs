"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Plus, Upload, MoreHorizontal, Clock3, Users, Trash2 } from "lucide-react";
import LoginSwitcher from "./LoginSwitcher";

export default function Dashboard({ currentUser }: { currentUser: any }) {
  const [data, setData] = useState<any>({ owned: [], shared: [] });
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setBusy(true);
    try {
      const res = await fetch("/api/documents", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unable to load documents.");
      setData(json);
    } catch (e: any) { setError(e.message); }
    finally { setBusy(false); }
  }
  useEffect(() => { load(); }, []);

  async function createDocument() {
    const res = await fetch("/api/documents", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ title: "Untitled document" }) });
    const json = await res.json();
    if (res.ok) window.location.href = `/documents/${json.id}`;
    else setError(json.error || "Could not create document.");
  }

  async function importFile(file?: File) {
    if (!file) return;
    const form = new FormData(); form.append("file", file);
    const res = await fetch("/api/import", { method: "POST", body: form });
    const json = await res.json();
    if (res.ok) window.location.href = `/documents/${json.id}`;
    else setError(json.error || "Could not import file.");
  }

  async function deleteDocument(id: string) {
    if (!confirm("Delete this document? This cannot be undone.")) return;
    const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
    if (!res.ok) { const j = await res.json(); setError(j.error || "Delete failed."); return; }
    load();
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white"><FileText size={18}/></div>
            <div><div className="font-bold">Ajaia Docs</div><div className="text-xs text-gray-500">Shared work, made simple.</div></div>
          </div>
          <LoginSwitcher currentUser={currentUser} />
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-9">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-gray-500">Workspace</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Your documents</h1>
            <p className="mt-2 text-gray-500">Create, edit, import and share documents with your team.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"><Upload size={17}/> Import</button>
            <input ref={fileRef} type="file" accept=".txt,.md,text/plain,text/markdown" className="hidden" onChange={e => importFile(e.target.files?.[0])}/>
            <button onClick={createDocument} className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"><Plus size={17}/> New document</button>
          </div>
        </div>

        {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <div className="mt-9">
          <Section title="My documents" count={data.owned.length} />
          {busy ? <Skeleton/> : data.owned.length === 0 ? <Empty title="No documents yet" text="Create a document to start writing."/> :
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.owned.map((d:any) =>
              <DocumentCard key={d._id} doc={d} owner onDelete={() => deleteDocument(d._id)}/>)}</div>}
        </div>

        <div className="mt-12">
          <Section title="Shared with me" count={data.shared.length} />
          {busy ? <Skeleton/> : data.shared.length === 0 ? <Empty title="Nothing shared yet" text="Documents shared with you will appear here."/> :
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.shared.map((d:any) =>
              <DocumentCard key={d._id} doc={d}/>)}</div>}
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-600 shadow-sm">
          <div className="font-semibold text-gray-900">Supported import files</div>
          <div className="mt-1">.txt and .md files up to 2 MB. Imported content becomes a new editable document.</div>
        </div>
      </section>
    </main>
  );
}

function Section({title,count}:{title:string,count:number}) {
  return <div className="mb-4 flex items-center gap-2"><h2 className="text-lg font-bold">{title}</h2><span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{count}</span></div>;
}
function DocumentCard({doc,owner,onDelete}:{doc:any,owner?:boolean,onDelete?:()=>void}) {
  return <div onClick={() => window.location.href=`/documents/${doc._id}`} className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100"><FileText size={19}/></div>
      {owner && <button aria-label="Delete document" onClick={(e)=>{e.stopPropagation();onDelete?.()}} className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16}/></button>}
    </div>
    <h3 className="mt-5 truncate font-semibold">{doc.title}</h3>
    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500"><Clock3 size={13}/> {new Date(doc.updatedAt).toLocaleString()}</div>
    {doc.access === "shared" && <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gray-600"><Users size={13}/> Shared by {doc.ownerName} · {doc.permission === "editor" ? "Can edit" : "View only"}</div>}
    {owner && <div className="mt-4 text-xs text-gray-400">Owned by you</div>}
  </div>;
}
function Empty({title,text}:{title:string,text:string}) {
  return <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center"><div className="font-semibold">{title}</div><div className="mt-1 text-sm text-gray-500">{text}</div></div>;
}
function Skeleton(){ return <div className="h-36 animate-pulse rounded-2xl bg-gray-100"/>; }
