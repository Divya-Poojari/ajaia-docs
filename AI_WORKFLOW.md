# Ajaia Docs — AI Workflow

## 1. Overview

AI tools were used as development assistants during the implementation of Ajaia Docs.

The goal was to use AI to accelerate development and problem-solving while keeping engineering decisions, implementation review, testing, and final verification under developer control.

AI was treated as an assistant rather than as a replacement for understanding or validating the implementation.

---

## 2. Where AI Helped

AI assistance was used in several parts of the development workflow, including:

### Development

* Exploring implementation approaches
* Generating initial implementation ideas
* Improving component structure
* Reviewing TypeScript and React code
* Identifying potential edge cases

### Debugging

AI was particularly useful for troubleshooting development and deployment issues.

It helped with:

* Understanding build errors
* Diagnosing configuration problems
* Reviewing error messages
* Suggesting possible fixes
* Narrowing down causes of runtime issues

Each suggested fix was tested against the actual application before being accepted.

### Testing

AI was also used to:

* Identify important test scenarios
* Think through document persistence cases
* Consider sharing edge cases
* Review expected application behavior
* Suggest areas where validation could be improved

### Documentation

AI assistance was used to organize and refine:

* README documentation
* Architecture documentation
* AI workflow documentation
* Submission documentation
* Walkthrough structure

---

## 3. What AI-Generated Output Was Changed or Rejected

AI-generated suggestions were not accepted automatically.

Suggestions were changed or rejected when they:

* Added unnecessary complexity
* Did not fit the existing application structure
* Introduced dependencies that were not necessary
* Did not match the intended product scope
* Could not be verified reliably
* Solved a larger problem than the assignment required

The implementation was kept intentionally scoped around the core requirements rather than adding features simply because they were technically possible.

---

## 4. Human Verification

AI-generated suggestions were verified through actual development and testing.

Verification included:

* Running the application locally
* Testing document creation
* Testing document editing
* Testing rich-text formatting
* Testing document renaming
* Testing persistence after refresh
* Testing file import
* Testing document sharing
* Testing shared document access
* Running the production build
* Verifying the deployed Vercel application
* Running the automated test

This helped ensure that suggested implementations worked in the actual project rather than only appearing correct in isolation.

---

## 5. AI and Engineering Judgment

AI was most valuable when used for acceleration and review rather than blindly generating the complete solution.

The final implementation decisions were based on:

* Assignment requirements
* Application scope
* Maintainability
* Simplicity
* User experience
* Reliability
* Actual test results

The development process intentionally balanced AI-assisted speed with manual engineering judgment.

---

## 6. Key Takeaway

AI significantly reduced the time required for debugging, exploring solutions, reviewing implementation choices, and preparing documentation.

At the same time, the final code and product behavior were validated through manual testing, automated testing, production builds, and deployment verification.

The primary principle was:

> Use AI to move faster, but verify the result through engineering judgment and testing.
