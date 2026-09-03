import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { ensureSeedUsers } from "@/lib/auth";

export async function GET() {
  await ensureSeedUsers();
  const db = await getDb();
  const users = await db.collection("users").find({}).sort({ name: 1 }).toArray();
  return NextResponse.json(users.map((u) => ({ _id: u._id.toString(), name: u.name, email: u.email })));
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.userId || !ObjectId.isValid(body.userId)) {
    return NextResponse.json({ error: "A valid user is required." }, { status: 400 });
  }

  const db = await getDb();
  const user = await db.collection("users").findOne({ _id: new ObjectId(body.userId) });
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  const response = NextResponse.json({
    user: { _id: user._id.toString(), name: user.name, email: user.email }
  });
  response.cookies.set("ajaia_user", user._id.toString(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
  return response;
}
