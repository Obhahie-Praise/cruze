# post-implementation-lint-recovery.md

Before making any changes, read:

1. AGENTS.md
2. context/code-standards.md
3. context/architecture.md
4. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

The most recent implementation introduced a significant number of linting errors.

Stop all feature development.

Switch into code quality and stabilization mode.

The purpose of this task is to scan, identify, categorize, and resolve all linting issues introduced by the most recent implementation, particularly the Products Management page and any related database, server, UI, or utility changes.

Do not build new features.

Do not redesign UI.

Focus exclusively on restoring code quality and standards compliance.

---

# Scope

Audit all files modified during the most recent implementation.

Pay special attention to:

* /dashboard/products
* Product data tables
* Category tabs
* Add Category modal
* Product actions
* Bulk actions
* Database schema updates
* Server actions
* Query utilities
* Product metrics
* Product filters
* Category models
* Pagination logic

---

# Full Lint Audit

Run a complete lint scan across the application.

Categorize issues into:

## Imports

* Unused imports
* Duplicate imports
* Incorrect import ordering
* Invalid module imports

---

## Typescript

* Implicit any
* Explicit any
* Missing interfaces
* Unsafe type assertions
* Incorrect generic usage
* Nullable type issues

---

## React

* Missing keys
* Invalid hook usage
* Dependency array issues
* Unused state
* Unused props

---

## Next.js

* Server/client boundary violations
* Invalid page exports
* Invalid layout exports
* Improper server actions
* Improper async component usage

---

## Database

* Unsafe Prisma queries
* Invalid query typing
* Missing null checks
* Unhandled query failures

---

## UI Components

* Unused props
* Incorrect component composition
* Invalid Shadcn usage
* Accessibility violations

---

# Code Standards Enforcement

Verify all modified files comply with project standards.

Requirements:

* No any types
* Use interfaces for object structures
* Proper TypeScript typing
* Consistent naming conventions
* Consistent import ordering
* Consistent component structure

---

# Dead Code Removal

Identify and remove:

* Unused variables
* Unused functions
* Unused imports
* Unused interfaces
* Temporary debugging code
* Console logs
* Experimental code paths

---

# Database Validation

Verify:

* Category model compiles
* Product queries compile
* Migrations remain valid
* Prisma types are generated correctly

Run:

* prisma generate
* type checks
* lint checks

---

# Build Validation

After fixes:

Verify:

npm run lint

passes successfully.

Verify:

npm run build

passes successfully.

Verify:

TypeScript compilation passes without errors.

---

# Restrictions

Do not:

* Disable lint rules
* Suppress warnings
* Use eslint-ignore comments
* Use ts-ignore comments
* Introduce any types
* Remove functionality to silence errors

Every issue must be fixed correctly.

---

# Completion Checks

Confirm:

✓ No lint errors remain

✓ No lint warnings remain

✓ No TypeScript errors remain

✓ Products page compiles

✓ Categories compile

✓ Database compiles

✓ Build succeeds

✓ Shadcn components remain functional

✓ Existing functionality preserved

---

# Progress Tracker

Update:

context/progress-tracker.md

Record:

* Lint audit completed
* Files affected
* Issues resolved
* Validation completed
* Current project state

---

# Definition of Done

The task is complete only when:

✓ npm run lint passes

✓ npm run build passes

✓ TypeScript passes

✓ No new warnings exist

✓ No code standards violations exist

✓ Products implementation remains fully functional

✓ Progress tracker updated

Code quality must be restored before any new feature development continues.
