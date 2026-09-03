# Architecture Note

## Product slice

The implementation focuses on the complete document lifecycle:

**Create → edit → persist → reopen → import → share → collaborate through shared access**

The goal was not to clone Google Docs. The highest-value product behavior in the assignment is the ability to create useful documents and move them between users with clear access semantics.

## Architecture

```text
┌──────────────────────────────────────┐
│             Next.js UI               │
│ Dashboard + TipTap Document Editor   │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│       Next.js Route Handlers          │
│ documents / import / sharing / auth   │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│             MongoDB                  │
│ users / documents / shares           │
└──────────────────────────────────────┘
```

## Document representation

Document content is persisted as TipTap/ProseMirror JSON instead of storing only rendered HTML.

Benefits:

- Formatting structure survives refresh.
- The editor can render the same document model directly.
- The representation can evolve toward comments, history, and collaboration later.
- Server-side data is not coupled to a particular visual HTML representation.

## Data model

### users

```text
_id
name
email
createdAt
```

### documents

```text
_id
title
content
ownerId
sourceFileName (optional)
createdAt
updatedAt
```

### shares

```text
_id
documentId
userId
permission: viewer | editor
createdAt
updatedAt
```

## Access control

The API resolves access using:

1. Is the current user the document owner?
2. If not, does a share record exist for the current user?
3. If neither is true, return `403`.
4. If the share is `viewer`, writes are rejected.
5. Only the owner can manage sharing and delete a document.

This keeps authorization on the server rather than relying on UI visibility.

## File handling

The assignment requires file handling but does not require a general file-storage system.

I chose `.txt` and `.md` import because they can be safely and quickly transformed into editable document content without adding a binary-storage dependency.

Constraints are surfaced in the UI:

- `.txt` / `.md`
- 2 MB maximum

## Persistence

MongoDB Atlas is used because the document structure is naturally represented as JSON and the setup is practical for a small deployed application.

## Scope decisions

Intentionally not implemented:

- Real-time CRDT/OT collaboration
- Comments
- Version history
- OAuth/password authentication
- `.docx` parsing
- PDF export

These were deprioritized to protect the core end-to-end workflow within the 4–6 hour constraint.

## Reliability considerations

Implemented:

- Request validation
- Invalid document ID handling
- Unsupported file-type rejection
- File-size validation
- Server-side authorization
- Read-only behavior for viewer shares
- Save status feedback
- Automated access-control tests

## Future architecture

A production version would separate authentication/session management, introduce object storage for binary files, add real-time collaboration using WebSockets/CRDTs, and add an audit/versioning layer.
