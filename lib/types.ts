export type User = {
  _id: string;
  name: string;
  email: string;
};

export type SharePermission = "viewer" | "editor";

export type DocumentSummary = {
  _id: string;
  title: string;
  ownerId: string;
  ownerName: string;
  updatedAt: string;
  access: "owner" | "shared";
  permission?: SharePermission;
};

export type DocumentRecord = {
  _id: string;
  title: string;
  content: Record<string, unknown>;
  ownerId: string;
  ownerName: string;
  updatedAt: string;
  permission: SharePermission;
  isOwner: boolean;
};
