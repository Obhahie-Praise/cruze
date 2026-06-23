# fix-button-hydration-error.md

Before making any changes, read:

1. AGENTS.md
2. context/code-standards.md
3. context/architecture.md
4. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Investigate and resolve all hydration errors related to nested button elements.

The application is currently producing:

 cannot contain a nested 

This is invalid HTML and causes hydration failures.

The issue must be fixed at its source.

Do not suppress warnings.

Do not use workarounds.

Do not disable hydration checks.

---

# Root Cause Investigation

Search the entire codebase for:

* button inside button
* Button inside Button
* Shadcn Button nesting
* DropdownMenuTrigger wrapping Button
* DialogTrigger wrapping Button
* SheetTrigger wrapping Button
* Sidebar menu buttons
* Navigation buttons
* Profile dropdown buttons
* Search buttons
* Theme switcher buttons

Inspect all interactive elements.

---

# Common Shadcn Issues

Verify all usages of:

* DropdownMenuTrigger
* DialogTrigger
* SheetTrigger
* TooltipTrigger
* HoverCardTrigger
* SidebarMenuButton

Many Shadcn primitives already render buttons.

Avoid wrapping them with another Button component.

---

# Required Fix

Where appropriate:

Use:

asChild

on trigger components.

Examples include:

* DropdownMenuTrigger
* DialogTrigger
* SheetTrigger
* TooltipTrigger

Ensure only a single button element exists in the final DOM.

---

# Validation

After each fix:

Inspect the rendered DOM.

Verify:

* No button contains another button
* No nested interactive elements exist
* Accessibility remains intact
* Keyboard navigation still works

---

# Unicode Comment Cleanup

Locate JSX comments containing decorative Unicode characters.

Examples:

{/* ── Top Navigation Bar ──────────────────────────────── */}

Replace decorative separator comments with simple ASCII comments.

Example:

{/* Top Navigation Bar */}

or

{/* Top Navigation Bar Section */}

Reason:

The Next.js error formatter is crashing while processing Unicode box-drawing characters.

---

# Hydration Audit

Verify:

* Sidebar
* Top Navigation
* Search Dialog
* Theme Switcher
* Profile Dropdown
* Authentication Forms
* Dashboard Layout
* Data Tables

These areas commonly contain nested trigger components.

---

# Production Verification

Run:

* Development build
* Production build
* Type checking
* Linting

Confirm:

* No hydration warnings
* No nested button warnings
* No Turbopack crashes
* No Unicode comment crashes

---

# Restrictions

Do not:

* Modify Shadcn source files
* Disable hydration
* Suppress console errors
* Remove accessibility features

Fix the actual DOM structure.

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Nested button issues discovered
* Components affected
* Fixes applied
* Hydration verification results
* Build verification results

---

# Definition of Done

✓ No nested button elements exist

✓ No hydration warnings remain

✓ Dropdowns work

✓ Dialogs work

✓ Theme switcher works

✓ Sidebar works

✓ Profile menu works

✓ Search dialog works

✓ Production build succeeds

✓ Development build succeeds

✓ Unicode comment crashes are resolved

✓ Progress tracker updated

The application should render without hydration errors and without invalid HTML.
