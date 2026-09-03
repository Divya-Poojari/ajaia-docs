import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

const emptyContent = {
  type: "doc",
  content: [{ type: "paragraph" }]
};

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const db = await getDb();
  const owned = await db.collection("documents").aggregate([
    { $match: { ownerId: new ObjectId(user._id) } },
    { $sort: { updatedAt: -1 } },
    { $lookup: { from: "users", localField: "ownerId", foreignField: "_id", as: "owner" } },
    { $unwind: "$owner" }
  ]).toArray();

  const shared = await db.collection("shares").aggregate([
    { $match: { userId: new ObjectId(user._id) } },
    { $lookup: { from: "documents", localField: "documentId", foreignField: "_id", as: "doc" } },
    { $unwind: "$doc" },
    { $lookup: { from: "users", localField: "doc.ownerId", foreignField: "_id", as: "owner" } },
    { $unwind: "$owner" },
    { $sort: { "doc.updatedAt": -1 } }
  ]).toArray();

  return NextResponse.json({
    owned: owned.map((d: any) => ({
      _id: d._id.toString(), title: d.title, ownerId: d.ownerId.toString(),
      ownerName: d.owner.name, updatedAt: d.updatedAt.toISOString(), access: "owner"
    })),
    shared: shared.map((s: any) => ({
      _id: s.doc._id.toString(), title: s.doc.title, ownerId: s.doc.ownerId.toString(),
      ownerName: s.owner.name, updatedAt: s.doc.updatedAt.toISOString(), access: "shared",
      permission: s.permission
    }))
  });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await request.json();
  const title = String(body.title || "Untitled document").trim().slice(0, 120);
  const db = await getDb();
  const now = new Date();

  const result = await db.collection("documents").insertOne({
    title: title || "Untitled document",
    content: emptyContent,
    ownerId: new ObjectId(user._id),
    createdAt: now,
    updatedAt: now
  });

  return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
}
