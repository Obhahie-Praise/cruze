Authentication Reliability & Recovery Fix

Before making any changes, read:

AGENTS.md
context/architecture.md
context/features.md
context/user-flows.md
context/code-standards.md
context/progress-tracker.md
Objective

Investigate and fix the authentication flow.

Current issue:

A user attempts to create an account.

An error occurs.

The user is not redirected.

When attempting signup again:

Email already exists

When attempting sign in:

Invalid credentials

This indicates the authentication system may be creating incomplete or inconsistent user records.

The implementation must be audited and repaired.

Required Investigation

Audit:

Sign Up Flow

Verify:

Account Creation
↓
User Creation
↓
Role Assignment
↓
Session Creation
↓
Redirect

Every step must complete successfully.

Sign In Flow

Verify:

Credential Validation
↓
Session Creation
↓
Role Lookup
↓
Redirect
Database Synchronization

Verify:

Auth user exists
Internal user exists
Roles exist
Sessions exist

The application must not allow orphaned records.

Recovery Logic

If:

Auth account exists
Database user missing

Automatically recover.

Create the missing user record.

Do not force the user to create a new account.

If:

User exists
Role missing

Automatically assign:

CUSTOMER

unless admin rules apply.

Transaction Safety

Ensure account creation behaves atomically.

The system must never leave:

partial users
missing profiles
missing roles
missing sessions

after signup attempts.

Redirect Reliability

Verify:

Admin:

/dashboard/overview

Customer:

/

Redirects must occur only after successful session creation.

Error Handling

Replace generic failures with actionable messages.

Users should never receive:

Something went wrong

without context.

Existing Broken Accounts

Implement a repair strategy.

If a user already exists in auth but is missing required application data:

Recover automatically on next authentication attempt.

Do not require manual database intervention.

Validation

Verify:

✓ New user signup works

✓ Existing user login works

✓ Admin login works

✓ Customer login works

✓ Redirects work

✓ Sessions persist

✓ Role assignment works

✓ Recovery logic works

✓ Partial account creation cannot occur

Progress Tracker

Update:

context/progress-tracker.md

Record:

Auth audit completed
Signup flow fixed
Login flow fixed
Redirect logic fixed
Recovery logic implemented