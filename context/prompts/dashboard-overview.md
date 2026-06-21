# Dashboard Overview Page

Before making any changes, read:

1. AGENTS.md
2. context/architecture.md
3. context/features.md
4. context/user-flows.md
5. context/ui-context.md
6. context/code-standards.md
7. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Build the Dashboard Overview page.

Route:

/dashboard/overview

This page should display real business metrics using data fetched from the database.

The page should be production ready and optimized for performance.

---

# Required Dependencies

Install:

* Recharts
* Shadcn Badge

Use existing Shadcn components whenever possible.

Do not modify files inside:

components/ui/*

after installation.

---

# Data Source

Use real database data.

Do not use mock data.

Do not use hardcoded values.

Metrics should be generated from actual records.

---

# Performance Requirements

Dashboard analytics should use cached server-side queries.

Requirements:

* Use Server Components when possible.
* Cache expensive analytics queries.
* Optimize repeated page visits.
* Minimize unnecessary database requests.

The dashboard should feel fast on repeated visits.

---

# Layout Requirements

The main content area should use:

max-w-7xl

and remain centered within the dashboard content area.

Use consistent spacing throughout the page.

Maintain the project's neutral design system.

---

# Metrics Section

At the top of the page create:

4 metric cards

Metrics:

* Total Revenue
* Orders
* Customers
* Support Tickets

Requirements:

* Use Shadcn Card components.
* Display real values.
* Maintain consistent sizing.
* Responsive on all screen sizes.

---

# Revenue Statistics Section

Create a large analytics card below the metric cards.

This card should span the content width.

---

## Header Layout

Left:

Three-dot menu button

Right:

Revenue Statistics

Use Shadcn Dropdown Menu.

---

## Filter Menu

The menu should contain:

Filter

which opens a submenu.

Available filters:

* Daily
* Weekly
* Monthly

Default:

Monthly

---

## Revenue Modes

Additional filter options:

* Show Total Revenue
* Show New Customer Revenue

Users should be able to switch between views.

---

## Revenue Summary

Above the chart display:

Current Revenue Total

This value should reflect the selected filter.

Examples:

* Daily Revenue
* Weekly Revenue
* Monthly Revenue

depending on the active selection.

---

## Chart Requirements

Use:

Recharts

Create a dual-line chart.

Line 1:

Revenue Trend

Line 2:

New Customer Revenue Trend

Requirements:

* Responsive
* Smooth rendering
* Theme compatible
* Light mode compatible
* Dark mode compatible

Maintain neutral styling.

Avoid excessive colors.

The chart should feel professional and enterprise-grade.

---

# Top Products Section

Below the revenue chart create:

Top Products

Use:

Shadcn Data Table

Requirements:

* Real database data
* Server-side data source
* Sorting support
* Pagination support

Suggested columns:

* Product
* Revenue
* Orders
* Stock
* Status

Use badges where appropriate.

---

# Recent Products Section

Create a second data table below:

Recent Products

Use the same visual conventions as Top Products.

Requirements:

* Real database data
* Pagination support
* Sorting support

Suggested columns:

* Product
* Category
* Price
* Stock
* Created Date
* Status

Use badges where appropriate.

---

# Empty States

Provide meaningful empty states for:

* Metrics
* Revenue Chart
* Top Products
* Recent Products

Users should always understand why data is unavailable.

---

# Loading States

Implement loading states for:

* Metrics
* Revenue Statistics
* Product Tables

Use Shadcn Skeleton components.

---

# Error Handling

Handle:

* Database failures
* Analytics failures
* Missing data

Display clear user-friendly feedback.

Do not expose technical errors.

---

# Theme Compatibility

Verify:

* Light Theme
* Dark Theme
* System Theme

All charts, tables, cards, badges, and dropdowns must render correctly.

---

# Restrictions

Do not:

* Create mock analytics
* Use placeholder values
* Hardcode revenue figures
* Introduce custom chart libraries

Use:

* Prisma
* Recharts
* Shadcn Components

only.

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Overview page completion
* Analytics implementation
* Revenue chart implementation
* Product table implementation
* Caching implementation
* Current project state

---

# Definition of Done

This task is complete only when:

✓ Real database data is displayed

✓ Metrics cards work

✓ Revenue chart works

✓ Filters work

✓ Revenue modes work

✓ Data is cached

✓ Top Products table works

✓ Recent Products table works

✓ Empty states exist

✓ Loading states exist

✓ Error states exist

✓ Responsive design works

✓ Theme support works

✓ Progress tracker is updated
