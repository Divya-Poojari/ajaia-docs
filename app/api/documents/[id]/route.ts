import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { resolveDocumentAccess } from "@/lib/access";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const db = await getDb();
  const access = await resolveDocumentAccess(db, id, user._id);
  if (!access.allowed) return NextResponse.json({ error: "Document not found or access denied." }, { status: 403 });

  const doc = await db.collection("documents").findOne({ _id: new ObjectId(id) });

if (!doc) {
  return NextResponse.json({ error: "Document not found" }, { status: 404 });
}

const owner = await db.collection("users").findOne({ _id: doc.ownerId });
  return NextResponse.json({
    _id: doc._id.toString(),
    title: doc.title,
    content: doc.content,
    ownerId: doc.ownerId.toString(),
    ownerName: owner?.name || "Unknown",
    updatedAt: doc.updatedAt.toISOString(),
    permission: access.permission,
    isOwner: access.isOwner
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid document id." }, { status: 400 });

  const db = await getDb();
  const access = await resolveDocumentAccess(db, id, user._id);
  if (!access.allowed) return NextResponse.json({ error: "Document not found or access denied." }, { status: 403 });
  if (access.permission !== "editor") return NextResponse.json({ error: "You have view-only access." }, { status: 403 });

  const body = await request.json();
  const update: Record<string, unknown> = { updatedAt: new Date() };

  if (typeof body.title === "string") {
    const title = body.title.trim().slice(0, 120);
    if (!title) return NextResponse.json({ error: "Title cannot be empty." }, { status: 400 });
    update.title = title;
  }
  if (body.content && typeof body.content === "object") update.content = body.content;

  await db.collection("documents").updateOne({ _id: new ObjectId(id) }, { $set: update });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid document id." }, { status: 400 });

  const db = await getDb();
  const access = await resolveDocumentAccess(db, id, user._id);
  if (!access.allowed || !access.isOwner) return NextResponse.json({ error: "Only the owner can delete this document." }, { status: 403 });

  await db.collection("documents").deleteOne({ _id: new ObjectId(id) });
  await db.collection("shares").deleteMany({ documentId: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
