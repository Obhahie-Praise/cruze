# Final System Setup

You are responsible for performing the initial system setup for this project.

Before making any changes, read:

1. AGENTS.md
2. context/project-vision.md
3. context/architecture.md
4. context/ui-context.md
5. context/code-standards.md
6. context/ai-workflow-rules.md
7. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Prepare the project for development by establishing the complete UI foundation, theme system, component system, and utility setup required by the architecture and UI context.

This task should be completed before implementing any application features.

---

# Shadcn UI Setup

Install and configure Shadcn UI according to the project's UI Context.

Requirements:

* Use the latest stable Shadcn setup.
* Configure Tailwind integration correctly.
* Configure component aliases correctly.
* Configure App Router compatibility.
* Ensure compatibility with TypeScript strict mode.

---

# Required Shadcn Components

Install the following components:

* Button
* Sidebar
* Navigation Menu
* Tabs
* Textarea
* Scroll Area
* Input
* Dialog
* Card
* Data Table
* Dropdown Menu
* Field
* Hover Card
* Label
* Pagination
* Progress
* Skeleton
* Switch

Verify all components install successfully.

---

# Component Protection Rule

After installation:

Do not modify any files inside:

components/ui/*

These files should be treated as vendor-managed components.

Project customization should occur through wrappers, composition, variants, layouts, and feature-specific components outside the ui directory.

---

# Utility Setup

Create:

lib/utils.ts

Requirements:

* Create a reusable cn() utility.
* Support Tailwind class merging.
* Support conditional class composition.
* Make the utility available throughout the application.

The utility should become the standard method for merging classes across the project.

---

# Theme System

Implement the theme system defined in the UI Context.

Requirements:

* Light Theme
* Dark Theme
* System Theme

Use:

* next-themes

Configure theme persistence across sessions.

---

# Global Styling

Configure globals.css as the source of theme tokens.

Requirements:

* Define light theme variables.
* Define dark theme variables.
* Use semantic design tokens.
* Ensure compatibility with Shadcn components.
* Ensure compatibility with future client branding.

Do not hardcode brand colors.

The project should remain brand-agnostic.

---

# Theme Compatibility

Verify every installed Shadcn component works correctly with:

* Light Mode
* Dark Mode

Ensure:

* Backgrounds render correctly.
* Borders render correctly.
* Text remains readable.
* Interactive states remain visible.

No component should assume a single theme.

---

# Folder Validation

Verify the following folders exist and are correctly structured:

* src/app
* src/components
* src/components/ui
* src/components/shared
* src/components/storefront
* src/components/portal
* src/lib
* src/hooks
* src/types
* src/server

Create missing folders if necessary.

---

# Quality Checks

Before completing this task:

Verify:

* Shadcn is installed correctly.
* All required components are installed.
* Theme switching works.
* Light mode works.
* Dark mode works.
* System theme works.
* cn() utility exists.
* TypeScript passes.
* Build passes.
* No modifications were made to components/ui/* after installation.

---

# Progress Tracker Update

After completing the setup:

Update:

context/progress-tracker.md

Document:

* Setup completion
* Installed systems
* Theme configuration
* Component configuration
* Utility configuration

Update the project's current state accordingly.

---

# Definition of Done

This setup is complete only when:

✓ Shadcn UI is fully configured

✓ Required components are installed

✓ Theme switching works

✓ Light mode works

✓ Dark mode works

✓ System theme works

✓ globals.css contains theme tokens

✓ cn() utility exists

✓ Folder structure is validated

✓ TypeScript passes

✓ Build passes

✓ Progress tracker is updated

The project should be ready for feature development immediately after completion.
