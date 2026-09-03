import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

function textToTiptap(text: string) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  return {
    type: "doc",
    content: lines.length
      ? lines.map((line) => ({ type: "paragraph", content: line ? [{ type: "text", text: line }] : undefined }))
      : [{ type: "paragraph" }]
  };
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Please select a file." }, { status: 400 });

  const name = file.name.toLowerCase();
  if (!name.endsWith(".txt") && !name.endsWith(".md")) {
    return NextResponse.json({ error: "Unsupported file type. Please upload .txt or .md." }, { status: 400 });
  }
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: "File is too large. Maximum size is 2 MB." }, { status: 400 });
  }

  const text = await file.text();
  const db = await getDb();
  const now = new Date();
  const result = await db.collection("documents").insertOne({
    title: file.name.replace(/\.(txt|md)$/i, "") || "Imported document",
    content: textToTiptap(text),
    ownerId: new ObjectId(user._id),
    sourceFileName: file.name,
    createdAt: now,
    updatedAt: now
  });

  return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
}
