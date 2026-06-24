# auth-session-stability-and-layout-fixes.md

Before making any changes, read:

1. AGENTS.md
2. context/architecture.md
3. context/code-standards.md
4. context/user-flows.md
5. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Implement the following improvements:

1. Mobile dashboard layout adjustments
2. Fixed top navigation behavior
3. Authentication session stability investigation
4. Database connectivity audit
5. Better Auth session reliability improvements

Do not implement new features.

Focus only on stabilization and UX improvements.

---

# Part 1: Mobile Theme Switcher Relocation

Current Behavior:

The theme switcher exists in the top navigation bar on all screen sizes.

Required Behavior:

Desktop:

* Theme switcher remains in the top navigation bar.

Mobile:

* Remove theme switcher from the top navigation.
* Display theme switcher above the profile button in the sidebar.

Requirements:

* Maintain current theme switcher component.
* Do not redesign the switcher.
* Preserve all functionality.
* Preserve tooltip behavior.
* Preserve system theme default.

---

# Part 2: Fixed Top Navigation

Current Behavior:

Top navigation scrolls with content.

Required Behavior:

Top navigation remains fixed at the top of the viewport.

Requirements:

* All dashboard routes must use the fixed navigation.
* Content should not render beneath the navigation.
* Preserve existing spacing.
* Preserve breadcrumb functionality.
* Preserve sidebar interaction.

Verify:

* Desktop layout
* Tablet layout
* Mobile layout

---

# Part 3: Session Stability Investigation

Current Symptom:

Users are being logged out unexpectedly.

The logs show:

P1001

DatabaseNotReachable

Session lookups fail because Prisma cannot reach the database.

This is not automatically an authentication issue.

The root cause must be identified.

---

# Investigation Requirements

Audit:

* Better Auth configuration
* Prisma configuration
* Neon connection settings
* Connection pooling
* Prisma singleton implementation
* Session retrieval flow
* Middleware session validation
* Route protection

Determine exactly why the application intermittently loses database connectivity.

Do not assume the cause.

---

# Database Connectivity Audit

Current Error:

P1001

DatabaseNotReachable

Investigate:

* DATABASE_URL
* DIRECT_URL
* Neon pooler usage
* Prisma adapter configuration
* SSL requirements
* Environment variables
* Connection limits
* Idle timeout behavior

Verify the application can consistently connect to Neon.

---

# Prisma Audit

Verify:

Single Prisma Client Instance

The application must use a singleton Prisma client.

Prevent:

* Multiple Prisma instances
* Excessive connection creation
* Hot reload connection leaks

Audit all Prisma imports.

Verify all routes use the same shared Prisma client.

---

# Better Auth Session Audit

Investigate:

Session Creation

Session Validation

Session Refresh

Session Persistence

Session Expiration

Session Retrieval

Determine whether users are being logged out because:

* Database is unavailable
* Session lookup fails
* Middleware redirects immediately
* Session cache is missing

Document findings.

---

# Middleware Resilience

Current Behavior:

If the database becomes temporarily unavailable, users are redirected to signin.

Required Behavior:

Temporary database outages should not immediately destroy user experience.

Investigate:

* Middleware handling
* Session validation strategy
* Retry behavior
* Graceful failure handling

Determine whether the application can tolerate temporary database connection failures.

---

# Performance Audit

Inspect:

/api/auth/get-session

Current logs indicate:

Some requests complete in milliseconds.

Others complete in multiple seconds.

Determine:

* Why session retrieval is slow
* Whether queries are hanging
* Whether connection creation is repeated unnecessarily

---

# Production Validation

Verify:

✓ Login works

✓ Signup works

✓ Sessions persist

✓ Dashboard access works

✓ Page refresh preserves authentication

✓ Database reconnects properly

✓ Middleware behaves correctly

✓ No unexpected logouts occur

✓ No Prisma connection leaks occur

---

# Documentation

Document:

Issue

↓

Root Cause

↓

Fix Applied

↓

Verification Performed

For every stability issue discovered.

Do not stop at symptoms.

Identify and resolve the underlying cause.

---

# Progress Tracker

Update:

context/progress-tracker.md

Record:

* Mobile layout changes
* Fixed navigation implementation
* Session stability audit
* Prisma audit
* Neon audit
* Better Auth audit
* Fixes applied
* Validation results

---

# Definition of Done

✓ Mobile theme switcher moved to sidebar

✓ Desktop theme switcher preserved

✓ Top navigation fixed

✓ Session stability investigated

✓ Neon connection audited

✓ Prisma connection strategy audited

✓ Better Auth session flow audited

✓ Unexpected logouts eliminated

✓ Validation completed

✓ Progress tracker updated

The application should maintain user sessions reliably and remain stable during normal operation.
