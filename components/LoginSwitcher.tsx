"use client";

import { useEffect, useState } from "react";

type User = { _id: string; name: string; email: string };

export default function LoginSwitcher({ currentUser }: { currentUser: User | null }) {
  const [users, setUsers] = useState<User[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth").then(r => r.json()).then(setUsers).catch(() => {});
  }, []);

  async function switchUser(userId: string) {
    setBusy(true);
    await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId }) });
    window.location.href = "/";
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:block text-right">
        <div className="text-sm font-semibold">{currentUser?.name}</div>
        <div className="text-xs text-gray-500">{currentUser?.email}</div>
      </div>
      <select
        aria-label="Demo user"
        disabled={busy}
        value={currentUser?._id || ""}
        onChange={(e) => switchUser(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
      >
        {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>
    </div>
  );
}
