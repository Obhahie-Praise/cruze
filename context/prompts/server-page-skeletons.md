# Global Loading States & Skeleton Infrastructure

Before making any changes, read:

1. AGENTS.md
2. context/architecture.md
3. context/features.md
4. context/ui-context.md
5. context/code-standards.md
6. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Establish a consistent loading experience across the entire application.

All pages and components that depend on asynchronous database data must provide a meaningful loading state using Shadcn Skeleton components.

This task exists to improve:

* Perceived performance
* User experience
* Visual stability
* Application polish

Users should never encounter blank screens while waiting for data to load.

---

# Purpose

Skeletons are visual placeholders that represent the structure of content before data becomes available.

The goal is to make loading states feel intentional and informative.

Skeletons should closely resemble the final UI layout that will appear after data has loaded.

---

# Required Coverage

Implement loading states for all:

* Server Components
* Async Server Components
* Database-driven pages
* Database-driven sections
* Database-driven widgets
* Analytics sections
* Dashboard sections
* Data tables
* Product sections

If a component depends on database data, it should have a corresponding loading state.

---

# Route-Level Loading

Create loading.tsx files for routes that perform data fetching.

Examples include:

* Dashboard pages
* Product pages
* Checkout pages
* Customer pages
* Order pages
* Support pages
* Analytics pages

The route loading state should accurately represent the page structure.

---

# Component-Level Loading

Create reusable skeleton components for common patterns.

Examples include:

* Metric Cards Skeleton
* Analytics Chart Skeleton
* Data Table Skeleton
* Product Grid Skeleton
* Product Detail Skeleton
* Order List Skeleton
* Customer List Skeleton
* Support Ticket Skeleton
* Revenue Statistics Skeleton

These components should be reusable throughout the application.

---

# Design Requirements

Skeletons must:

* Match the dimensions of final content
* Match the spacing of final content
* Match the layout of final content
* Support responsive layouts
* Support light mode
* Support dark mode
* Follow the project's neutral design system

Avoid generic placeholder blocks that do not resemble the final interface.

---

# Shadcn Requirement

Use:

* Skeleton

from Shadcn UI.

Do not introduce custom loading libraries.

Do not introduce alternative skeleton implementations.

---

# Performance Requirements

Loading states should:

* Appear immediately
* Prevent layout shifting
* Improve perceived performance
* Work correctly with server rendering

Skeletons should disappear automatically when data becomes available.

---

# Accessibility Requirements

Loading states should:

* Preserve layout structure
* Avoid excessive animation
* Remain readable in all themes

Accessibility must remain consistent throughout loading transitions.

---

# Reusability

When multiple pages share similar layouts:

Create shared skeleton components instead of duplicating code.

Skeleton components should become part of the application's reusable UI infrastructure.

---

# Restrictions

Do not:

* Use fake data
* Hardcode placeholder values
* Replace real content permanently
* Create loading states for static pages that do not fetch data

Only implement loading states where asynchronous data exists.

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Skeleton infrastructure completion
* Shared skeleton components created
* Routes covered
* Components covered
* Current project state

---

# Definition of Done

This task is complete only when:

✓ Database-driven pages have loading states

✓ Database-driven components have loading states

✓ Shared skeleton components exist

✓ Layout shifts are minimized

✓ Light mode works

✓ Dark mode works

✓ Responsive layouts work

✓ Shadcn Skeleton is used consistently

✓ Progress tracker is updated

The application should provide a smooth and professional loading experience across all data-driven interfaces.
