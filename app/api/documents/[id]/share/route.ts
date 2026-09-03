import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { resolveDocumentAccess } from "@/lib/access";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;
  if (!user || !ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const db = await getDb();
  const access = await resolveDocumentAccess(db, id, user._id);
  if (!access.allowed) return NextResponse.json({ error: "Access denied." }, { status: 403 });

  const shares = await db.collection("shares").aggregate([
    { $match: { documentId: new ObjectId(id) } },
    { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
    { $unwind: "$user" }
  ]).toArray();

  return NextResponse.json(shares.map((s: any) => ({
    userId: s.userId.toString(), name: s.user.name, email: s.user.email, permission: s.permission
  })));
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;
  if (!user || !ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const db = await getDb();
  const access = await resolveDocumentAccess(db, id, user._id);
  if (!access.allowed || !access.isOwner) return NextResponse.json({ error: "Only the owner can manage sharing." }, { status: 403 });

  const body = await request.json();
  if (!ObjectId.isValid(body.userId)) return NextResponse.json({ error: "Select a valid user." }, { status: 400 });
  if (body.userId === user._id) return NextResponse.json({ error: "The owner already has access." }, { status: 400 });

  const permission = body.permission === "viewer" ? "viewer" : "editor";
  await db.collection("shares").updateOne(
    { documentId: new ObjectId(id), userId: new ObjectId(body.userId) },
    { $set: { permission, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}
