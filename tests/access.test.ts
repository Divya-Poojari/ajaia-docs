import { describe, expect, it } from "vitest";
import { resolveDocumentAccess } from "../lib/access";

describe("resolveDocumentAccess", () => {
  it("allows the owner and grants editor access", async () => {
    const db = {
      collection: () => ({
        findOne: async (query: any) => {
          if (query._id && query._id.toString() === "507f1f77bcf86cd799439011") {
            return { _id: query._id, ownerId: query._id };
          }
          return null;
        }
      })
    };
    const result = await resolveDocumentAccess(db, "507f1f77bcf86cd799439011", "507f1f77bcf86cd799439011");
    expect(result.allowed).toBe(true);
    expect(result.isOwner).toBe(true);
    expect(result.permission).toBe("editor");
  });

  it("denies a user who has neither ownership nor a share", async () => {
    const db = {
      collection: (name: string) => ({
        findOne: async (query: any) => {
          if (name === "documents") return { _id: query._id, ownerId: { toString: () => "507f1f77bcf86cd799439012" } };
          return null;
        }
      })
    };
    const result = await resolveDocumentAccess(db, "507f1f77bcf86cd799439011", "507f1f77bcf86cd799439013");
    expect(result.allowed).toBe(false);
  });
});
