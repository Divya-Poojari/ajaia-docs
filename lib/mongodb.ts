import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "ajaia_docs";

const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | undefined;
};

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error("Missing MONGODB_URI. Configure it in .env.local");
  }

  if (!globalForMongo.mongoClient) {
    globalForMongo.mongoClient = new MongoClient(uri);
    await globalForMongo.mongoClient.connect();
  }

  return globalForMongo.mongoClient.db(dbName);
}