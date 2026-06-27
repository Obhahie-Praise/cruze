# project-wide-stabilization-and-error-elimination.md

Before making any changes, read:

1. AGENTS.md
2. context/code-standards.md
3. context/architecture.md
4. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Stop all feature development.

Switch into **Project Stabilization Mode**.

The goal of this task is to perform a complete audit of the entire codebase and eliminate every compilation error, lint error, TypeScript error, runtime issue, import issue, and IDE error introduced throughout development.

The project should reach a stable, production-ready state before any new features are implemented.

This is **not** a feature implementation task.

Do not redesign UI.

Do not change business logic unless it is the source of an error.

The priority is correctness, stability, consistency, and maintainability.

---

# Project-Wide Audit

Perform a complete scan of the entire project.

Inspect every directory including but not limited to:

* app/
* components/
* actions/
* lib/
* hooks/
* prisma/
* types/
* uploadthing/
* auth/
* middleware/
* server/
* context/
* utils/

Do not stop after fixing the first few errors.

Continue scanning until the entire project is clean.

---

# IDE Errors

The project should contain **zero** editor errors.

Eliminate every red squiggle.

This includes:

* TypeScript errors
* Import resolution errors
* JSX errors
* React errors
* Prisma typing errors
* Better Auth typing errors
* UploadThing typing errors
* Shadcn component typing errors

Every file should open cleanly in the editor.

---

# TypeScript Audit

Inspect every file for:

* implicit any
* explicit any
* missing interfaces
* incorrect interface usage
* unsafe casting
* incorrect generic usage
* nullable value issues
* unreachable code
* duplicate declarations
* invalid imports
* incorrect async usage
* promise misuse
* invalid return types
* server/client boundary violations

All types must satisfy the project's Code Standards.

Do not use:

* any
* @ts-ignore
* @ts-expect-error
* eslint-disable

Fix the underlying issue instead.

---

# React Audit

Inspect for:

* invalid hooks
* missing dependency arrays
* invalid keys
* nested button elements
* invalid component composition
* hydration issues
* client/server rendering mismatches
* unused state
* unused props
* invalid event handlers

---

# Next.js Audit

Inspect:

* page exports
* layout exports
* loading.tsx
* error.tsx
* route handlers
* middleware
* dynamic routes
* metadata
* server actions
* caching
* redirects
* navigation

Ensure everything follows Next.js App Router best practices.

---

# Prisma Audit

Verify:

* schema validity
* generated client
* relation integrity
* query typing
* migrations
* singleton usage
* database connection handling

Ensure all Prisma queries compile correctly.

---

# Better Auth Audit

Verify:

* authentication flow
* session handling
* role handling
* protected routes
* callbacks
* middleware integration

Ensure authentication compiles without warnings or errors.

---

# UploadThing Audit

Verify:

* upload routes
* endpoint definitions
* image typing
* upload handlers
* client components
* server handlers

Ensure uploads compile successfully.

---

# UI Audit

Inspect every component for:

* invalid Shadcn usage
* accessibility issues
* incorrect prop usage
* inconsistent spacing
* duplicate components
* broken imports

Do not modify components inside:

components/ui/

unless absolutely required for compatibility.

---

# Dead Code Cleanup

Remove:

* unused imports
* unused variables
* unused interfaces
* unused functions
* commented-out code
* debugging statements
* console logs
* duplicate helper functions

The codebase should remain clean and maintainable.

---

# Build Verification

After completing fixes, verify all of the following:

* npm install (dependencies resolve correctly)
* prisma generate
* npm run lint
* npm run build

All commands must complete successfully.

There should be:

* zero lint errors
* zero lint warnings
* zero TypeScript errors
* zero build failures

---

# Runtime Verification

Run the application and verify:

* Dashboard loads
* Storefront loads
* Authentication works
* Navigation works
* Dialogs open correctly
* Tables render correctly
* Theme switching works
* Image uploads work
* Database queries execute correctly

Resolve any runtime exceptions discovered.

---

# Code Standards Enforcement

Ensure every modified file complies with:

context/code-standards.md

Consistency is required across the entire project.

---

# Restrictions

Do NOT:

* silence errors
* disable lint rules
* suppress TypeScript errors
* remove functionality simply to make the build pass
* introduce temporary fixes

Every issue must be resolved correctly.

---

# Completion Criteria

The task is complete only when all of the following are true:

✓ No red squiggles remain anywhere in the project

✓ No TypeScript errors remain

✓ No lint errors remain

✓ No lint warnings remain

✓ No build errors remain

✓ No hydration issues remain

✓ No import resolution issues remain

✓ No Prisma typing issues remain

✓ No Better Auth typing issues remain

✓ No UploadThing typing issues remain

✓ No runtime errors remain during normal application usage

✓ The application builds successfully

✓ The application runs successfully

✓ Existing functionality remains intact

---

# Progress Tracker

Update:

context/progress-tracker.md

Record:

* Full project audit completed
* Files inspected
* Categories of issues fixed
* Validation completed
* Final project health status

The project should now be considered stable and ready for continued feature development.
