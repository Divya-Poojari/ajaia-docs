import { ObjectId } from "mongodb";

export type AccessResult = {
  allowed: boolean;
  isOwner: boolean;
  permission: "viewer" | "editor";
};

export async function resolveDocumentAccess(
  db: any,
  documentId: string,
  userId: string
): Promise<AccessResult> {
  if (!ObjectId.isValid(documentId) || !ObjectId.isValid(userId)) {
    return { allowed: false, isOwner: false, permission: "viewer" };
  }

  const document = await db.collection("documents").findOne({ _id: new ObjectId(documentId) });
  if (!document) return { allowed: false, isOwner: false, permission: "viewer" };

  if (document.ownerId.toString() === userId) {
    return { allowed: true, isOwner: true, permission: "editor" };
  }

  const share = await db.collection("shares").findOne({
    documentId: new ObjectId(documentId),
    userId: new ObjectId(userId)
  });

  if (!share) return { allowed: false, isOwner: false, permission: "viewer" };

  return {
    allowed: true,
    isOwner: false,
    permission: share.permission
  };
}
