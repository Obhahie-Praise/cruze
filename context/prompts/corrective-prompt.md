# corrective-prompt.md

Before making any changes, read:

1. AGENTS.md
2. context/architecture.md
3. context/features.md
4. context/user-flows.md
5. context/code-standards.md
6. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Stop feature development.

Switch into investigation, debugging, validation, and production-hardening mode.

The purpose of this task is to identify and eliminate the root cause of the current authentication failures, hydration errors, and potential data synchronization issues.

Do not make assumptions.

Do not implement workarounds.

Do not suppress errors.

Find the actual source of each issue and fix it correctly.

---

# Authentication Investigation

Current symptoms:

* User submits signup form
* Error appears in the application
* User record appears in the database
* User is not redirected correctly
* Attempting signup again reports that the email already exists
* Attempting login reports invalid credentials

This indicates a partial success somewhere in the authentication pipeline.

---

# Authentication Audit

Trace the complete lifecycle of:

Signup
↓
Validation
↓
Authentication Provider
↓
Database Write
↓
Role Assignment
↓
Session Creation
↓
Redirect

Determine exactly which step fails.

Do not guess.

Log and verify every stage.

---

# Data Collection Audit

Investigate all data being collected during signup.

Verify:

* Required fields
* Optional fields
* Field names
* Field types
* Validation rules
* Database schema expectations

Confirm that all collected values match the database schema exactly.

Identify:

* Missing fields
* Invalid values
* Incorrect types
* Unexpected null values
* Constraint violations

---

# Database Audit

Verify:

* Better Auth user creation
* Internal user creation
* Role assignment
* Session creation
* User synchronization

Confirm:

* Records are written successfully
* Transactions complete successfully
* No partial writes occur
* No orphaned records exist

---

# Session Audit

Verify:

* Session creation
* Session persistence
* Session lookup
* Session expiration
* Session refresh

Determine whether authentication succeeds but session creation fails.

---

# Redirect Audit

Verify:

Admin Users:

/dashboard/overview

Customer Users:

/

Confirm redirects occur only after:

* User creation succeeds
* Session creation succeeds
* Role resolution succeeds

---

# Error Reporting Audit

Inspect all authentication-related error handling.

Replace generic failures with meaningful diagnostics during development.

Determine the exact error source before displaying user-facing errors.

---

# Hydration Error Investigation

The application is experiencing hydration errors involving button elements.

Investigate all usages of:

* button
* Button
* Shadcn Button
* Dialog triggers
* Dropdown triggers
* Sidebar actions
* Navigation actions

Identify where invalid HTML nesting or mismatched rendering is occurring.

---

# Common Hydration Causes To Investigate

Check for:

* button inside button
* conditional server/client rendering mismatches
* invalid DOM nesting
* dynamic values rendered differently on server and client
* theme rendering mismatches
* browser-only APIs during server render
* dropdown trigger nesting issues
* dialog trigger nesting issues
* sidebar action nesting issues

Do not assume Shadcn is the issue.

Find the exact implementation causing the problem.

---

# Shadcn Validation

Audit all Shadcn component usage.

Verify:

* Correct composition patterns
* Correct trigger usage
* Correct asChild usage
* Correct client/server boundaries

Fix incorrect implementations.

Do not modify Shadcn source files.

---

# Production Validation

Run a complete production readiness audit.

Verify:

* Authentication
* Sessions
* Database writes
* Redirects
* Role assignment
* Upload infrastructure
* Dashboard routing
* Theme switching
* Search dialog
* Loading states
* Error boundaries

---

# Completion Validation

The application should successfully pass:

Signup Test

* Create new account
* Create database user
* Assign role
* Create session
* Redirect correctly

Login Test

* Login existing account
* Create valid session
* Redirect correctly

Admin Test

* Login admin account
* Access dashboard

Customer Test

* Login customer account
* Access storefront

Logout Test

* Destroy session correctly

Password Recovery Test

* Request password reset
* Complete reset successfully

---

# Root Cause Analysis

For every issue discovered:

Document:

Issue
↓
Root Cause
↓
Fix Applied
↓
Verification Performed

Do not stop at symptom-level fixes.

Resolve the underlying cause.

---

# Restrictions

Do not:

* Ignore errors
* Hide errors
* Disable validation
* Remove authentication checks
* Suppress hydration warnings
* Replace functionality with placeholders

Every issue must be properly diagnosed and resolved.

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Authentication audit results
* Database audit results
* Session audit results
* Hydration fixes
* Production validation results
* Root causes discovered
* Fixes applied
* Current project state

---

# Definition of Done

This task is complete only when:

✓ Signup works

✓ Login works

✓ Session creation works

✓ Redirects work

✓ Role assignment works

✓ Database synchronization works

✓ No partial account creation occurs

✓ No hydration errors remain

✓ Shadcn components validate correctly

✓ Production checks pass

✓ Completion checks pass

✓ Root causes are documented

✓ Progress tracker is updated

The application should be stable, production-ready, and free of authentication and hydration issues.
