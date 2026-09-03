import { getDb } from "./mongodb";

export async function seedUsers() {
  const db = await getDb();
  const users = [
    { name: "Divya Poojari", email: "divya@example.com" },
    { name: "Alex Morgan", email: "alex@example.com" }
  ];

  for (const user of users) {
    await db.collection("users").updateOne(
      { email: user.email },
      { $setOnInsert: { ...user, createdAt: new Date() } },
      { upsert: true }
    );
  }

  return db.collection("users").find({}).toArray();
}
