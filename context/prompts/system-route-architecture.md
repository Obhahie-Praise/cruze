# System Route Architecture

Before making any changes, read:

1. AGENTS.md
2. context/architecture.md
3. context/features.md
4. context/user-flows.md
5. context/code-standards.md
6. context/progress-tracker.md

---

# Objective

Establish the application's route structure.

This task is for route creation only.

Do not implement features.

Do not implement business logic.

Do not implement API routes.

Do not implement forms.

Do not implement data fetching.

Do not implement authentication logic.

Only create the route structure required by the project.

---

# Required Routes

Create the following routes:

## Dashboard

/dashboard

/dashboard/overview

/dashboard/orders

/dashboard/products

/dashboard/customers

/dashboard/analytics

---

## Authentication

/signin

/signup

---

## Storefront

/

/product/[slug]

/category/[slug]

/collection/[slug]

/cart

/checkout

/support

/profile

---

# Dashboard Layout

Create a dedicated dashboard layout.

Requirements:

* The dashboard layout must be shared by all dashboard routes.
* Child routes must inherit this layout automatically.
* The layout should be reusable and scalable.
* Only create the layout structure.
* Do not implement dashboard functionality.

---

# Route Placeholders

Each page should contain only:

* The route name
* A minimal placeholder page

Example:

Page Title

Route Name

Nothing else.

Do not create feature implementations.

Do not create UI systems.

Do not create business logic.

---

# Dynamic Product Route

The product page route should be dynamic.

Requirements:

* Use a dynamic route segment.
* Prepare the route for future product pages.
* Do not fetch data.
* Do not build product functionality.

Only create the route structure.

---

# Restrictions

Do not:

* Build components
* Build forms
* Build authentication
* Build dashboard widgets
* Build checkout
* Build cart functionality
* Build product pages
* Build analytics

Only establish route architecture.

---

# Completion Criteria

This task is complete when:

✓ All routes exist

✓ Dashboard layout exists

✓ Dynamic product route exists

✓ All routes render placeholder content

✓ No business logic has been implemented

✓ No feature implementation has been started

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Route architecture completion
* Dashboard layout creation
* Dynamic route creation
* Current project state
