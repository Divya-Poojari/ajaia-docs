# Ajaia Docs

A lightweight full-stack document editor that allows users to create, edit, import, persist, and share documents through a simple browser-based workflow.

## Live Demo

**Live Application:** https://ajaia-docs-seven-teal.vercel.app/

**Source Code:** https://github.com/Divya-Poojari/ajaia-docs

---

## Features

### Document Creation & Editing

* Create new documents
* Rename documents
* Edit documents directly in the browser
* Save and reopen documents
* Rich-text formatting support:

  * Bold
  * Italic
  * Underline
  * Headings / text size variation
  * Bulleted lists
  * Numbered lists

### File Import

Documents can be created by importing supported files.

**Supported formats:**

* `.txt`
* `.md`

**Maximum file size:** 2 MB

Imported content is converted into an editable document within the application.

### Sharing

The application supports a simple document-sharing workflow:

* Each document has an owner
* Owners can share documents with another seeded user
* Owned documents appear under **My documents**
* Shared documents appear under **Shared with me**
* Shared documents can be opened by the recipient

### Persistence

Documents and sharing information are persisted using MongoDB.

The application preserves document content and formatting across page refreshes and reopening the application.

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Rich-text editor
* CSS / Tailwind CSS

### Backend

* Next.js server-side functionality / API routes
* TypeScript

### Database

* MongoDB

### Deployment

* Vercel

### Development Tools

* Git
* GitHub
* npm
* VS Code

---

## Application Architecture

At a high level, the application follows this flow:

```text
Browser
   │
   ▼
Next.js / React UI
   │
   ▼
Server-side logic / API
   │
   ▼
MongoDB
   │
   ├── Documents
   └── Sharing information
```

The frontend provides the document editing and sharing experience, while the server-side layer handles persistence and access-related operations. MongoDB is used to persist documents and sharing relationships.

---

## Demo / Seeded Users

The application uses seeded/demo users to demonstrate the sharing workflow.

**User 1:**
Divya Poojari

**User 2:**
Alex Morgan

These users can be used to demonstrate:

1. Creating a document as the owner
2. Sharing the document with another user
3. Switching to the recipient user
4. Viewing the document under **Shared with me**

---

## Local Setup

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas connection

### 1. Clone the repository

```bash
git clone https://github.com/Divya-Poojari/ajaia-docs.git
cd ajaia-docs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

Add:

```env
MONGODB_URI=your_mongodb_connection_string
```

Do not commit `.env.local` or any database credentials to the repository.

### 4. Seed demo data

If the project includes the seed script, run:

```bash
npm run seed
```

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Build

To create a production build:

```bash
npm run build
```

To start the production server after building:

```bash
npm start
```

---

## Testing

The project includes an automated test covering a meaningful part of the application workflow.

Example:

```bash
npm test
```

The test verifies core application behavior and helps ensure that changes do not break the expected workflow.

---

## Product Decisions & Scope

The project intentionally focuses on the core document workflow rather than attempting to replicate the complete functionality of Google Docs.

The primary priorities were:

1. A usable document editing experience
2. Reliable persistence
3. File import
4. Simple but demonstrable document sharing
5. A clear distinction between owned and shared documents
6. A deployable and testable full-stack implementation

Features such as real-time multi-user editing, comments, version history, and advanced permissions were intentionally kept out of scope to prioritize the core requirements.

---

## Known Limitations

* File import currently supports `.txt` and `.md` files.
* Maximum supported import file size is 2 MB.
* Authentication and user management are intentionally lightweight/seeded for the scope of this assignment.
* Real-time collaborative editing is not implemented.
* Advanced document permissions and version history are not implemented.

---

## What I Would Build Next

With an additional 2–4 hours, I would prioritize one of the following:

* Real-time collaboration indicators
* Document version history
* More granular sharing permissions
* Markdown/PDF export
* Improved authentication and user management
* Additional automated tests covering document and sharing workflows

The next enhancement would be selected based on reviewer/user feedback rather than adding features without a clear product need.

---

## AI-Native Workflow

AI tools were used as development assistants throughout the implementation.

AI helped accelerate:

* Debugging and troubleshooting
* Exploring implementation approaches
* Reviewing code structure
* Generating development ideas
* Improving error handling
* Identifying edge cases
* Preparing documentation and test scenarios

AI-generated suggestions were reviewed rather than accepted blindly. Approaches that introduced unnecessary complexity or did not fit the application's architecture were changed or rejected.

Correctness was verified through:

* Local development testing
* Production build verification
* Manual end-to-end testing
* Persistence testing
* Sharing workflow testing
* Deployment verification
* Automated testing

A more detailed description of the AI workflow is provided in `AI_WORKFLOW.md`.

---

## Deployment

The application is deployed on Vercel.

**Production URL:**

https://ajaia-docs-seven-teal.vercel.app/

The production deployment is connected to the GitHub repository and is automatically updated when changes are pushed to the main branch.

---

## Project Documentation

Additional project documentation:

* `ARCHITECTURE.md` — Architecture and key implementation decisions
* `AI_WORKFLOW.md` — AI-assisted development workflow
* `SUBMISSION.md` — Assignment submission summary

---

## Author

**Divya Poojari**

GitHub: https://github.com/Divya-Poojari
