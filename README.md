# Ajaia Docs — Full Stack Product Engineer Assignment

A lightweight collaborative document workspace inspired by Google Docs.

## Live product

**Deployment URL:** `ADD_LIVE_DEPLOYMENT_URL_HERE`

> The application is deployment-ready for Vercel + MongoDB Atlas. Replace the placeholder above with the deployed URL before submitting.

## Demo accounts

The application seeds two demo users:

| User | Email |
|---|---|
| Divya Poojari | divya@example.com |
| Alex Morgan | alex@example.com |

Use the user switcher in the top-right corner to demonstrate sharing without requiring password authentication.

## Core capabilities

- Create a new document
- Rename a document
- Edit documents in-browser
- Rich text: bold, italic, underline, H1/H2, bulleted lists, numbered lists
- Automatic persistence to MongoDB
- Reopen documents after refresh
- Import `.txt` and `.md` files as editable documents
- Share documents with another seeded user
- `editor` and `viewer` permissions
- Owned vs. shared document sections
- Server-side document access checks
- Basic validation and error states
- Automated access-control tests

## Tech stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- TipTap
- MongoDB Atlas
- Vitest
- Vercel-ready deployment

## Local setup

### 1. Requirements

- Node.js 20+
- A MongoDB database (local MongoDB or MongoDB Atlas)

### 2. Install

```bash
npm install
```

### 3. Environment

Copy `.env.example` to `.env.local` and set:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=ajaia_docs
NEXT_PUBLIC_APP_NAME=Ajaia Docs
```

### 4. Start

```bash
npm run dev
```

Open `http://localhost:3000`.

The demo users are automatically created when the app starts. You can also explicitly seed them with:

```bash
npm run seed
```

## Test

```bash
npm test
```

The automated tests focus on the document authorization boundary: owners receive editor access, while unrelated users are denied.

## Import behavior

Supported files:

- `.txt`
- `.md`

Maximum file size: 2 MB.

Imported files become a new editable document. The original file is not stored as a separate binary attachment.

## Sharing demonstration

1. Start as **Divya Poojari**.
2. Create a document.
3. Edit and format it.
4. Click **Share**.
5. Share with **Alex Morgan** as `Can edit`.
6. Switch the demo user to Alex using the top-right selector.
7. Open the document under **Shared with me**.
8. Edit the document and save.
9. Switch back to Divya and reopen the document.

The API enforces ownership/share access server-side; hiding documents in the UI is not used as the security boundary.

## Deployment

Recommended path:

1. Create a MongoDB Atlas database.
2. Add the production connection string as `MONGODB_URI` in Vercel.
3. Set `MONGODB_DB=ajaia_docs`.
4. Import this repository into Vercel.
5. Deploy.
6. Replace `ADD_LIVE_DEPLOYMENT_URL_HERE` in the final submission materials.

No paid dependency is required.

## Known limitations

- Demo authentication is intentionally lightweight and uses a user-switching cookie instead of passwords/OAuth.
- Real-time multi-user collaboration is not implemented.
- Comments, version history, and document export are intentionally out of scope.
- Markdown import preserves the text content but does not implement a full Markdown AST conversion.
- Binary document formats such as `.docx` are not supported.

## Next 2–4 hours

If more time were available, the next priorities would be:

1. Real authentication with secure sessions.
2. Real-time collaboration/presence.
3. Version history with restore.
4. Better Markdown parsing and document import feedback.
5. More comprehensive API and end-to-end tests.
6. Production observability and rate limiting.
