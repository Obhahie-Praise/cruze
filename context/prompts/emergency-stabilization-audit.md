# emergency-stabilization-audit.md

Before making any changes, read:

1. AGENTS.md
2. context/architecture.md
3. context/code-standards.md
4. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Immediately stop feature development.

Switch into application stabilization mode.

The application is currently experiencing:

* Extensive linting failures
* Prisma client resolution failures
* Authentication instability
* Forced user logout
* Orders page hydration failures
* Turbopack runtime failures

The purpose of this task is to restore application stability before any new feature work continues.

Do not implement new features.

Do not modify UI unless necessary to resolve errors.

Focus exclusively on identifying and eliminating root causes.

---

# Phase 1: Linting Audit

The project currently contains numerous linting errors.

Requirements:

* Run linting across the entire application.
* Categorize all linting failures.
* Fix all errors.
* Fix all warnings that may impact runtime behavior.
* Verify code standards compliance.

Pay special attention to:

* Unused imports
* Invalid React Hooks usage
* Server/client boundary violations
* Type errors
* Async misuse
* Invalid component exports

The codebase should lint cleanly.

---

# Phase 2: Prisma Client Investigation

Current error:

Module not found:

Can't resolve:

.prisma/client/index-browser

---

## Investigation Requirements

Audit:

* prisma schema
* prisma client generation
* prisma package versions
* next configuration
* import locations
* server/client boundaries

Determine:

Why Prisma is attempting to resolve:

.prisma/client/index-browser

---

## Verify

* Prisma Client generation
* Generated client location
* Prisma imports
* Prisma singleton implementation
* Server-only usage

---

## Common Causes To Investigate

* Prisma imported inside Client Components
* Prisma imported into shared utilities consumed by Client Components
* Incorrect Prisma package versions
* Broken generated client
* Failed prisma generate
* Invalid bundling behavior

Do not assume the cause.

Verify.

---

# Phase 3: Authentication Stability Audit

Current symptom:

Users are being unexpectedly logged out.

---

## Investigate

* Better Auth session creation
* Session validation
* Session persistence
* Session expiration
* Middleware protection
* Route guards
* Cookies
* Session refresh

Determine whether logout is caused by:

* Missing session
* Failed session lookup
* Prisma failures
* Middleware failures
* Redirect loops

---

## Verify

Admin Flow

Signup
↓
Login
↓
Dashboard Access
↓
Refresh Page
↓
Remain Logged In

Customer Flow

Signup
↓
Login
↓
Storefront Access
↓
Refresh Page
↓
Remain Logged In

---

# Phase 4: Orders Page Hydration Audit

Current symptom:

Hydration failures occur on:

/dashboard/orders

---

## Investigate

Audit:

* Tabs
* Dialogs
* Dropdowns
* Order cards
* Status badges
* Client Components
* Server Components

Verify:

* Server/client rendering consistency
* Stable keys
* Date rendering
* Currency rendering
* Dynamic content generation
* Randomized values
* Conditional rendering

---

## Special Attention

Investigate:

* Shadcn Tabs
* Dialogs
* Dropdown Menus
* Alert Dialogs

Verify proper usage.

---

# Phase 5: Turbopack Crash Investigation

Current symptom:

An unexpected Turbopack error occurred.

---

## Investigation Requirements

Run:

Development Build

Production Build

Type Check

Lint

Prisma Generate

---

## Determine

Whether Turbopack failures originate from:

* Prisma
* Authentication
* Hydration
* Invalid imports
* Circular dependencies
* Server/client violations

Do not suppress errors.

Find the source.

---

# Server / Client Boundary Audit

Audit entire application.

Verify:

Server Components do not import:

* useState
* useEffect
* browser APIs

Client Components do not import:

* Prisma
* Server Actions
* Server-only utilities

Fix all violations.

---

# Production Validation

Application must successfully complete:

* npm run lint
* npm run build
* prisma generate
* type checking

without failures.

---

# Runtime Validation

Verify:

✓ Authentication works

✓ Sessions persist

✓ Dashboard loads

✓ Orders page loads

✓ No hydration warnings

✓ No Prisma resolution errors

✓ No forced logouts

✓ No Turbopack crashes

---

# Root Cause Report

For every issue discovered document:

Issue
↓
Root Cause
↓
Affected Files
↓
Fix Applied
↓
Verification Performed

Do not stop at symptoms.

Resolve underlying causes.

---

# Restrictions

Do not:

* Disable lint rules
* Disable type checking
* Disable hydration checks
* Suppress Prisma errors
* Suppress authentication failures

The goal is stability, not silence.

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Stabilization audit completed
* Prisma fixes
* Authentication fixes
* Hydration fixes
* Turbopack fixes
* Production validation results
* Current project state

---

# Definition of Done

✓ Lint passes

✓ Build passes

✓ Prisma generates correctly

✓ No .prisma/client/index-browser errors

✓ Authentication works

✓ Sessions persist

✓ Orders page works

✓ No hydration errors

✓ No forced logouts

✓ No Turbopack crashes

✓ Production validation passes

✓ Root causes documented

✓ Progress tracker updated

Feature development must not resume until all stability checks pass.
