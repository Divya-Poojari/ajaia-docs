# AI Workflow Note

## Tools used

- ChatGPT
- AI-assisted coding/editor tooling, where available during implementation

## Where AI materially helped

AI was used as an engineering accelerator rather than as a substitute for product decisions.

Examples:

- Comparing lightweight editor options and choosing TipTap.
- Generating initial TypeScript/API boilerplate.
- Exploring MongoDB document/share data models.
- Troubleshooting Next.js App Router and client/server boundaries.
- Reviewing edge cases around ownership, shared access, and viewer permissions.
- Drafting and tightening documentation.

## What remained human judgment

The major product and scope decisions were made deliberately:

- Prioritize the full document lifecycle over advanced collaboration.
- Store structured TipTap JSON instead of HTML-only content.
- Use seeded demo users to keep the sharing workflow demonstrable within the timebox.
- Support `.txt` and `.md` instead of spending the time budget on `.docx` parsing.
- Enforce access server-side rather than relying on frontend visibility.

AI-generated output was treated as a starting point. Generated code was reviewed for API behavior, authorization boundaries, TypeScript correctness, and maintainability.

## Verification

Correctness was checked through:

- Manual create/edit/save/reopen flow.
- Manual rich-text formatting flow.
- Manual import of `.txt`/`.md`.
- Two-user sharing workflow.
- Viewer/editor permission behavior.
- Unauthorized access behavior.
- Automated authorization tests.
- Production deployment verification before submission.

## AI output rejected or changed

AI suggestions were not accepted blindly. In particular, any approach that placed document authorization solely in the client was rejected in favor of server-side access resolution.

If additional AI-assisted changes are made during final polishing, this section should be updated with one concrete example from the actual implementation session.
