"use client";

import { useEffect, useState } from "react";
import { X, Share2 } from "lucide-react";

type User = { _id: string; name: string; email: string };

export default function ShareDialog({ documentId, onClose }: { documentId: string; onClose: () => void }) {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState("");
  const [permission, setPermission] = useState("editor");
  const [shares, setShares] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const [u, s] = await Promise.all([fetch("/api/auth"), fetch(`/api/documents/${documentId}/share`)]);
    setUsers(await u.json());
    setShares(await s.json());
  }
  useEffect(() => { load(); }, [documentId]);

  async function share() {
    if (!selected) return;
    setSaving(true); setMessage("");
    const res = await fetch(`/api/documents/${documentId}/share`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selected, permission })
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setMessage(data.error || "Unable to share."); return; }
    setMessage("Access updated.");
    await load();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <div className="flex items-center gap-2 font-semibold"><Share2 size={18}/> Share document</div>
            <div className="mt-1 text-sm text-gray-500">Give another demo user access.</div>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-2 hover:bg-gray-100"><X size={18}/></button>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-[1fr_150px_auto] gap-2">
            <select value={selected} onChange={e => setSelected(e.target.value)} className="rounded-lg border p-2.5">
              <option value="">Select user</option>
              {users.map(u => <option key={u._id} value={u._id}>{u.name} — {u.email}</option>)}
            </select>
            <select value={permission} onChange={e => setPermission(e.target.value)} className="rounded-lg border p-2.5">
              <option value="editor">Can edit</option>
              <option value="viewer">View only</option>
            </select>
            <button disabled={saving || !selected} onClick={share} className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40">
              {saving ? "..." : "Share"}
            </button>
          </div>
          {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
          <div className="mt-6">
            <div className="mb-2 text-sm font-semibold">People with access</div>
            <div className="space-y-2">
              {shares.length === 0 ? <div className="text-sm text-gray-500">No one else has access yet.</div> :
                shares.map(s => <div key={s.userId} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div><div className="text-sm font-medium">{s.name}</div><div className="text-xs text-gray-500">{s.email}</div></div>
                  <span className="text-xs font-medium text-gray-600">{s.permission === "editor" ? "Can edit" : "View only"}</span>
                </div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
