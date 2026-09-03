import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

const DEMO_USERS = [
  { name: "Divya Poojari", email: "divya@example.com" },
  { name: "Alex Morgan", email: "alex@example.com" }
];

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("ajaia_user")?.value;
  const db = await getDb();

  if (userId && ObjectId.isValid(userId)) {
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (user) return { _id: user._id.toString(), name: user.name, email: user.email };
  }

  const fallback = await db.collection("users").findOne({ email: DEMO_USERS[0].email });
  if (fallback) return { _id: fallback._id.toString(), name: fallback.name, email: fallback.email };
  return null;
}

export async function ensureSeedUsers() {
  const db = await getDb();
  for (const user of DEMO_USERS) {
    await db.collection("users").updateOne(
      { email: user.email },
      { $setOnInsert: { ...user, createdAt: new Date() } },
      { upsert: true }
    );
  }
}
