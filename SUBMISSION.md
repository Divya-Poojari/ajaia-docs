# Ajaia Docs — Assignment Submission

## 1. Live Product

**Production URL:**

https://ajaia-docs-seven-teal.vercel.app/

The application is deployed on Vercel and is available for evaluation.

---

## 2. Source Code

**GitHub Repository:**

https://github.com/Divya-Poojari/ajaia-docs

The repository contains the complete application source code and project documentation.

---

## 3. Walkthrough Video

**Video:**

https://drive.google.com/file/d/1MBBqmiWlpSxLBQg2v3uuVvYQc7McYqup/view?usp=drive_link

The walkthrough demonstrates the main user flow, core functionality, implementation decisions, scope tradeoffs, and AI-assisted development workflow.

---

## 4. Demo / Seeded Users

The application uses seeded/demo users to demonstrate document sharing.

**User 1:**

Divya Poojari

**User 2:**

Alex Morgan

These accounts can be used to demonstrate the owner and shared-user workflow.

---

## 5. Core Functionality

The following assignment requirements are implemented:

* [x] Create a new document
* [x] Rename a document
* [x] Edit document content in the browser
* [x] Save and reopen documents
* [x] Bold formatting
* [x] Italic formatting
* [x] Underline formatting
* [x] Headings / text size variation
* [x] Bulleted lists
* [x] Numbered lists
* [x] File import
* [x] `.txt` file support
* [x] `.md` file support
* [x] File size validation
* [x] Document ownership
* [x] Share document with another user
* [x] Owned documents view
* [x] Shared documents view
* [x] Persistent document storage
* [x] Persistent sharing information
* [x] Basic validation and error handling
* [x] Automated testing
* [x] Production deployment

---

## 6. Supported File Import

Supported file types:

* `.txt`
* `.md`

Maximum supported file size:

**2 MB**

The supported file types and size limitation are also communicated in the application UI.

---

## 7. Documentation Included

The project includes:

### README.md

Contains:

* Project overview
* Features
* Technology stack
* Local setup instructions
* Environment variable information
* Testing information
* Deployment information
* Scope and limitations

### ARCHITECTURE.md

Contains:

* High-level architecture
* Technology choices
* Document lifecycle
* Persistence model
* Sharing model
* Validation approach
* Deployment architecture
* Design tradeoffs

### AI_WORKFLOW.md

Contains:

* AI tools and workflow
* Areas where AI accelerated development
* AI-generated suggestions that were reviewed or rejected
* Verification approach
* Engineering judgment and testing process

---

## 8. Automated Testing

The project includes an automated test covering a core document workflow.

The test verifies that document data can be created and persisted correctly and that the expected application behavior is maintained.

The test can be executed using the project's configured test command.
npm test

## 9. Local Setup

The project can be run locally using the instructions provided in `README.md`.

The basic workflow is:

```bash
git clone https://github.com/Divya-Poojari/ajaia-docs.git
cd ajaia-docs
npm install
```

Configure the required environment variables in `.env.local`, then run:

```bash
npm run dev
```

The application is available locally at:

```text
http://localhost:3000
```

---

## 10. Environment Variables

The application requires a MongoDB connection string.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
```

Actual credentials are intentionally not included in the repository.

---

## 11. Scope Decisions

The project intentionally prioritizes the core document workflow over implementing every possible Google Docs feature.

The main focus was:

1. Document creation and editing
2. Rich-text formatting
3. File import
4. Persistence
5. Document sharing
6. Clear owned/shared document views
7. Deployment and verification

Features intentionally deprioritized include:

* Real-time collaboration
* Comments
* Version history
* Advanced permissions
* Enterprise authentication
* Full Google Docs feature parity

---

## 12. What I Would Build Next

With an additional 2–4 hours, I would prioritize one of the following based on product value:

1. Real-time collaboration indicators
2. Document version history
3. More granular sharing permissions
4. Additional automated integration/end-to-end tests
5. Document export to PDF or Markdown

The goal would be to extend the existing core workflow without compromising its reliability.

---

## 13. Final Verification

The deployed application was manually verified for the main end-to-end workflows:

* Document creation
* Document editing
* Rich-text formatting
* Document renaming
* Saving and reopening
* Persistence after refresh
* File import
* Sharing
* Shared document access
* Production deployment

The production build was also verified before submission.

---

## 14. Submission Contents

This submission includes:

* Complete source code
* README.md
* ARCHITECTURE.md
* AI_WORKFLOW.md
* SUBMISSION.md
* Walkthrough video
* Screenshots / demo assets

---

## 15. Contact

**Divya Poojari**

GitHub:

https://github.com/Divya-Poojari/ajaia-docs
