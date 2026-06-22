# Authentication Session & Password Recovery

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

Improve the authentication functionality.

This task focuses exclusively on:

* Session persistence
* Remember Me functionality
* Forgot Password functionality
* Password Reset functionality

Do not modify the authentication UI layout.

Do not redesign any authentication screens.

Do not modify branding, spacing, typography, colors, or visual appearance.

This task is functionality only.

---

# Session Persistence

Implement session duration management based on the state of the:

Keep Me Logged In

option.

---

## Keep Me Logged In Enabled

When enabled:

* Session duration should be 90 days
* Users should remain authenticated across browser restarts
* Session persistence should survive page refreshes
* Session expiration should be extended appropriately

---

## Keep Me Logged In Disabled

When disabled:

* Session duration should be 2 days
* Users should be required to authenticate again after expiration

---

# Better Auth Integration

Configure Better Auth to support:

* Standard sessions
* Extended sessions
* Session expiration management

The implementation should remain secure and production-ready.

---

# Forgot Password Flow

The Forgot Password action must be fully functional.

---

## User Flow

User clicks:

Forgot Password

↓

Password Recovery Dialog Opens

↓

User enters email address

↓

Recovery email is sent

↓

Success state is displayed

↓

User receives password reset link

↓

User clicks reset link

↓

User creates a new password

↓

User signs in normally

---

# Recovery Interface

Use a Dialog Modal.

Requirements:

* Use Shadcn Dialog
* Open from the existing Forgot Password action
* Maintain current authentication page design
* Responsive on all screen sizes

---

# URL State

The dialog should be reflected in the URL state.

Requirements:

Opening the dialog should update the URL.

Closing the dialog should restore the previous URL state.

Users should be able to:

* Refresh the page
* Share the URL
* Reopen the recovery flow

without losing context.

Use the App Router URL state pattern.

---

# Password Recovery Dialog

The dialog should contain:

* Title
* Description
* Email input
* Submit button
* Cancel button

Use Shadcn components throughout.

---

# Success State

After a successful submission:

Display a confirmation state.

The user should clearly understand:

* An email has been sent
* The next steps to complete recovery
* What to do if the email does not arrive

---

# Password Reset Page

Create the required reset password flow.

Requirements:

* Validate reset tokens
* Handle expired tokens
* Handle invalid tokens
* Allow creation of a new password
* Confirm password change success

This page should follow existing authentication styling.

---

# Error Handling

Handle:

* Unknown email addresses
* Expired reset tokens
* Invalid reset tokens
* Network failures
* Email delivery failures
* Rate limiting

Provide clear user-friendly messaging.

Do not expose internal errors.

---

# Security Requirements

Implement security best practices.

Requirements:

* Secure token generation
* Token expiration
* Single-use reset tokens
* Password validation
* Protection against abuse

The password recovery flow should be production-ready.

---

# Accessibility Requirements

Ensure:

* Keyboard navigation
* Accessible dialogs
* Accessible forms
* Accessible feedback messages

---

# Restrictions

Do not:

* Redesign authentication pages
* Change authentication layouts
* Modify theme implementation
* Alter branding
* Introduce new UI patterns

Only implement authentication functionality.

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Session persistence implementation
* Remember Me implementation
* Password recovery implementation
* Password reset implementation
* Current project state

---

# Definition of Done

This task is complete only when:

✓ Remember Me works

✓ 90-day sessions work

✓ 2-day sessions work

✓ Forgot Password works

✓ Recovery email flow works

✓ Password reset works

✓ Dialog URL state works

✓ Invalid tokens are handled

✓ Expired tokens are handled

✓ Success states exist

✓ Error states exist

✓ Accessibility requirements are met

✓ Progress tracker is updated

The authentication system should provide a complete production-ready account recovery experience.
