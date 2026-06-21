# Authentication UI & User Flow

Before making any changes, read:

1. AGENTS.md
2. context/project-vision.md
3. context/architecture.md
4. context/features.md
5. context/user-flows.md
6. context/ui-context.md
7. context/code-standards.md
8. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Build the authentication experience for the application.

Routes:

* /signin
* /signup

Implement both:

* UI
* Authentication functionality
* Role assignment
* Redirect behavior
* User account dropdown

This feature should be production ready.

---

# Design Requirements

Use the provided authentication design as inspiration.

The implementation must match the overall layout and user experience while following project design standards.

---

# Theme Requirements

Maintain the project's neutral design system.

Requirements:

* No blue theme colors
* No hardcoded branding colors
* Use existing design tokens
* Fully support Light Mode
* Fully support Dark Mode
* Fully support System Theme

---

# Responsiveness

The authentication experience must be fully responsive.

Requirements:

* Desktop
* Tablet
* Mobile

The layout should gracefully adapt across breakpoints.

---

# Left Panel

Contains:

Authentication form

Use extensive Shadcn components.

Suggested components:

* Card
* Button
* Input
* Label
* Separator
* Alert
* Field
* Form
* Checkbox
* Tooltip

---

# Authentication Method

Only display:

Continue with Google

Requirements:

* Remove all other social providers.
* The Google button should span the available width.
* The button should feel like the primary action.

---

# Right Panel

Contains:

* Cruze Logo
* Cruze
* Short brand description

Requirements:

* Keep the background grid pattern.
* Keep the clean marketing panel appearance.
* Use the project's neutral theme.
* Keep content minimal.

---

# Theme Switcher

Replace the design's theme switcher.

Use the project's existing theme switcher.

Do not redesign it.

Do not create a new theme switcher.

Reuse the existing implementation.

---

# Better Auth Integration

Connect the authentication pages to Better Auth.

Authentication should be functional.

Requirements:

* Sign In
* Sign Up
* Session creation
* Session persistence
* Google provider support

---

# User Roles

System roles:

* ADMIN
* CUSTOMER

---

# Default Admin

The following email should automatically receive the ADMIN role:

[jeffcruze@gmail.com](mailto:jeffcruze@gmail.com)

Requirements:

* Automatically assign ADMIN role on account creation.
* Persist role in the database.
* Do not require manual intervention.

---

# Default Customer Role

All other users should automatically receive:

CUSTOMER

upon account creation.

---

# Redirect Logic

---

## Admin User

After authentication:

Redirect to:

/dashboard/overview

---

## Customer User

After authentication:

Redirect to:

/

Storefront homepage.

---

# Homepage Placeholder Behavior

The storefront homepage is currently a placeholder.

Requirements:

If the user is authenticated:

Display:

* User name
* User email

using real session data.

If the user is not authenticated:

Display the existing placeholder experience.

---

# Dashboard Profile Button

Replace the placeholder profile button.

Use real authenticated user data.

---

# Sidebar Profile Section

Display:

* User avatar
* User name
* User email

using real data.

---

# Profile Dropdown

Clicking the profile button should open a dropdown menu.

Use Shadcn Dropdown Menu.

---

## Dropdown Options

### Account Settings

Requirements:

* Display icon
* Placeholder destination for now

---

### Logout

Requirements:

* Display icon
* Styled as destructive action
* Use red destructive styling
* Properly destroy the session

---

# Route Protection

Protect:

* /dashboard/*
* /checkout
* /support
* /profile

Unauthenticated users should be redirected appropriately.

---

# Dashboard Protection

Only users with:

ADMIN

may access:

/dashboard/*

Non-admin users should be denied access and redirected safely.

---

# Error Handling

Handle:

* Authentication failures
* Missing sessions
* Missing user records
* Role assignment failures
* Google authentication failures

Users should receive clear and friendly feedback.

Do not expose internal errors.

---

# Loading States

Implement loading states for:

* Sign In
* Sign Up
* Session loading
* Role verification

Use Shadcn Skeletons and loading indicators where appropriate.

---

# Accessibility

Ensure:

* Keyboard navigation
* Screen reader support
* Accessible dropdowns
* Accessible forms
* Accessible buttons

---

# Shadcn Usage

Extensive use of Shadcn components is required.

Prefer existing Shadcn primitives before creating custom implementations.

---

# Restrictions

Do not:

* Create account settings pages
* Create customer dashboards
* Create profile pages
* Create onboarding flows

Only implement authentication and account access infrastructure.

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Authentication completion
* Better Auth integration completion
* Role system completion
* Redirect logic completion
* Profile dropdown completion
* Current project state

---

# Definition of Done

This task is complete only when:

✓ Sign In page exists

✓ Sign Up page exists

✓ Responsive design works

✓ Neutral theme is maintained

✓ Google authentication works

✓ Better Auth integration works

✓ Sessions persist correctly

✓ ADMIN role assignment works

✓ CUSTOMER role assignment works

✓ Admins redirect to /dashboard/overview

✓ Customers redirect to /

✓ Homepage displays authenticated user data

✓ Sidebar profile displays real user data

✓ Profile dropdown works

✓ Logout works

✓ Dashboard protection works

✓ Theme support works

✓ Progress tracker is updated

The authentication experience should be production ready upon completion.
