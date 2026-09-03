# Ajaia Docs — Architecture Note

## 1. Overview

Ajaia Docs is a lightweight full-stack document management application built to demonstrate the core workflow of creating, editing, importing, persisting, and sharing documents.

The implementation intentionally focuses on a small, coherent product slice rather than attempting to replicate the complete functionality of Google Docs.

---

## 2. Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Rich-text document editing
* Responsive browser-based UI

### Backend

* Next.js server-side functionality
* Server-side document and sharing operations
* TypeScript

### Database

* MongoDB

MongoDB is used to persist document data and document-sharing relationships.

### Deployment

* Vercel

The production application is deployed through Vercel and connected to the GitHub repository.

---

## 3. High-Level Architecture

```text
┌──────────────────────────────┐
│        Browser / User        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Next.js / React UI     │
│                              │
│  • Document Dashboard        │
│  • Document Editor           │
│  • File Import               │
│  • Sharing Interface         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   Server-side Application    │
│                              │
│  • Document operations       │
│  • Persistence               │
│  • Sharing/access logic      │
│  • File import processing    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│           MongoDB            │
│                              │
│  • Documents                 │
│  • Ownership                 │
│  • Sharing information       │
└──────────────────────────────┘
```

---

## 4. Document Lifecycle

The primary document flow is:

```text
Create
  ↓
Edit
  ↓
Save
  ↓
Persist in MongoDB
  ↓
Reopen / Refresh
  ↓
Continue Editing
```

Documents have an owner and can be shared with another seeded user.

The dashboard provides separate views for:

* **My documents** — documents owned by the current user
* **Shared with me** — documents that another user has shared with the current user

This makes ownership and shared access visible without introducing unnecessary permission complexity.

---

## 5. Rich-Text Editing

The editor provides the core formatting required for the assignment, including:

* Bold
* Italic
* Underline
* Headings / text size variation
* Bulleted lists
* Numbered lists

The goal was to provide a coherent and usable editing experience rather than reproduce every feature available in a full document editor.

Document structure and formatting are persisted so that the document remains usable after refreshing or reopening it.

---

## 6. File Import

The application supports importing:

* `.txt`
* `.md`

The supported maximum file size is **2 MB**.

Imported content is converted into an editable document so that file import is directly connected to the primary document workflow rather than being implemented as an unrelated upload feature.

Unsupported files and invalid inputs are handled through application-level validation.

---

## 7. Sharing Model

The sharing model is intentionally lightweight.

Each document has:

```text
Owner
  │
  └── Document
        │
        └── Shared users
```

A document owner can grant another seeded user access to the document.

The recipient can then find the document in **Shared with me**.

This demonstrates the core access-control intent required by the assignment while avoiding unnecessary enterprise-level permission management.

---

## 8. Persistence

MongoDB provides persistent storage for:

* Document metadata
* Document content
* Ownership information
* Sharing information

This allows documents and sharing relationships to remain available after page refreshes and subsequent sessions.

Environment-specific configuration, including the MongoDB connection string, is provided through environment variables rather than being committed to source control.

---

## 9. File and Application Boundaries

The application is organized so that responsibilities are separated between:

* UI components
* Document/editor functionality
* Server-side operations
* Database access
* Seed/demo data

This keeps database access and server-side logic separate from presentation concerns and makes the application easier to extend.

---

## 10. Validation and Error Handling

Basic validation is applied to important user operations, including:

* Document creation
* Document updates
* File imports
* File type and size validation
* Sharing operations
* Document access

The goal was to prevent invalid operations from causing application failures and to provide useful feedback to the user.

---

## 11. Testing Strategy

The project includes automated testing for a meaningful application workflow.

In addition to automated testing, the application was manually verified through end-to-end flows covering:

* Document creation
* Editing and formatting
* Renaming
* Persistence after refresh
* File import
* Document sharing
* Shared document access
* Production deployment

---

## 12. Deployment

The production application is deployed on Vercel.

The deployment is connected to the GitHub repository, allowing changes pushed to the main branch to trigger a new deployment.

**Production URL:**

https://ajaia-docs-seven-teal.vercel.app/

---

## 13. Design Priorities and Tradeoffs

The main engineering priority was to deliver a complete core workflow rather than maximize the number of features.

The implementation prioritizes:

1. Usable document editing
2. Reliable persistence
3. File import
4. Clear ownership and sharing behavior
5. Simple deployment
6. Maintainable application structure
7. Basic automated verification

The following were intentionally deprioritized:

* Real-time collaborative editing
* Comments
* Version history
* Advanced role-based permissions
* Enterprise authentication
* Full Google Docs feature parity

These features can be added later without changing the fundamental product direction.

---

## 14. Future Architecture Improvements

If the product were extended beyond the assignment scope, the architecture could evolve to support:

* Real-time collaboration using WebSockets or a real-time database
* Document version history
* More granular access roles
* Production-grade authentication
* Background file processing for larger uploads
* Additional automated integration and end-to-end tests
* Document export and import in additional formats

The current architecture intentionally keeps these concerns out of the critical path so that the core product remains simple and reliable.
