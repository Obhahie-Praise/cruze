# Portal Layout Foundation

Before making any changes, read:

1. AGENTS.md
2. context/architecture.md
3. context/ui-context.md
4. context/code-standards.md
5. context/user-flows.md
6. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Build the foundational layout for the Portal (Dashboard) section of the application.

This task focuses exclusively on layout, navigation, theme controls, and dashboard structure.

Do not implement business logic.

Do not implement analytics.

Do not implement product management.

Do not implement authentication logic.

Do not implement data fetching.

Only build the reusable dashboard shell that all dashboard routes will inherit.

---

# Typography Setup

Change the project's default font family to:

Commissioner

Requirements:

* Configure Commissioner as the global application font.
* Apply it through the root layout.
* Ensure all pages inherit the font automatically.
* Remove any existing default font configuration.

---

# Shadcn Components

Install the following additional component:

* Breadcrumb

Use Shadcn components exclusively for this implementation.

Do not introduce external UI libraries.

Do not modify files inside:

components/ui/*

after installation.

---

# Dashboard Layout Requirements

Build a reusable dashboard layout for:

/dashboard/*

All dashboard routes must inherit this layout.

The layout should consist of:

* Sidebar
* Top Navigation Bar
* Main Content Area

The layout must be fully responsive.

---

# Sidebar Requirements

Use the Shadcn Sidebar system.

Requirements:

* Collapsible
* Responsive
* Mobile friendly
* Persistent across dashboard routes

---

## Sidebar Navigation Order

The first navigation item must be:

Search

All other dashboard links should appear after Search.

---

## Search Action

The Search navigation item must:

* Open a centered modal
* Use a Shadcn Dialog component
* Resemble a command/search interface
* Be designed for future global dashboard search functionality

This implementation should only create the interface.

Do not implement search functionality.

---

## Sidebar Links

Create placeholder navigation links for:

* Overview
* Orders
* Products
* Customers
* Analytics

Navigation should support active states.

---

## Sidebar Footer

At the bottom of the sidebar:

Add a placeholder profile button.

Requirements:

* Positioned at the bottom
* Styled consistently with the sidebar
* Reserved for future account functionality

Do not implement account functionality.

---

# Top Navigation Bar

The top navigation bar should exist across all dashboard pages.

Requirements:

* Fixed layout structure
* Responsive behavior
* Consistent spacing

---

## Left Section

Contains:

Sidebar Open / Close Trigger

Only this control should appear on the left.

---

## Center Section

Contains:

Current Route Breadcrumb

Requirements:

* Use the Shadcn Breadcrumb component
* Dynamically reflect the current route
* Remain visually centered within the navbar

Important:

The breadcrumb must be positioned in the true visual center of the navbar.

Do not rely on a simple flex layout that shifts the breadcrumb as left and right content changes.

The center position should remain stable regardless of surrounding content.

---

## Right Section

Contains:

Theme Switcher

Requirements:

* Icons only
* Tooltips for all options
* Functional theme switching
* Uses existing next-themes setup

Options:

* Light
* System
* Dark

Default:

System

---

# Theme Requirements

Ensure all dashboard layout components support:

* Light Mode
* Dark Mode
* System Theme

Use existing theme tokens.

Do not hardcode colors.

Do not introduce custom theme systems.

---

# Main Content Area

Create a content container for child routes.

Requirements:

* Responsive
* Scrollable when necessary
* Consistent spacing
* Ready for future dashboard pages

Do not implement page-specific content.

---

# Accessibility Requirements

Ensure:

* Keyboard navigation works
* Dialog is accessible
* Sidebar is accessible
* Theme switcher is accessible
* Tooltips are accessible

Accessibility should be maintained across desktop and mobile.

---

# Restrictions

Do not:

* Implement dashboard widgets
* Implement analytics
* Implement CRUD functionality
* Implement search functionality
* Implement user accounts
* Implement API calls
* Implement data fetching

Only build the dashboard shell and navigation experience.

---

# Completion Criteria

This task is complete when:

✓ Commissioner is the default font

✓ Breadcrumb component is installed

✓ Dashboard layout exists

✓ Sidebar is collapsible

✓ Sidebar is responsive

✓ Search action opens a centered modal

✓ Sidebar footer profile button exists

✓ Breadcrumb reflects the current route

✓ Breadcrumb remains visually centered

✓ Theme switcher is functional

✓ Light mode works

✓ Dark mode works

✓ System theme works

✓ All dashboard routes inherit the layout

✓ No business logic has been implemented

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Typography setup completion
* Breadcrumb installation
* Dashboard layout completion
* Sidebar completion
* Theme switcher completion
* Current project state
