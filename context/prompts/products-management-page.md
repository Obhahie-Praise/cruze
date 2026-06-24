# products-management-page.md

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

Build the Products Management page.

Route:

/dashboard/products

This page serves as the primary inventory and catalog management center.

All data must come from the database.

Do not use mock data.

Maintain the existing dashboard design language.

Extensive use of Shadcn UI components is required.

---

# Database Audit

Before implementation:

Audit all product-related schemas.

Determine whether the database currently supports:

* Product categories
* Inventory tracking
* Product worth calculations
* Product cart tracking
* Product analytics

If required fields or models are missing:

Update the schema.

Generate migrations.

Update architecture documentation.

---

# Category Architecture

Categories must be first-class database entities.

Create a dedicated Category model if one does not exist.

A category should support:

* Name
* Description
* Target Audience
* Occasion
* Season
* Material
* Created Date
* Updated Date

Products should reference categories.

Do not store category names directly on products if relational architecture is possible.

---

# Page Layout

Use the same structure used by:

/dashboard/overview

and

/dashboard/orders

Content container:

max-w-7xl

Centered layout.

Neutral design system.

---

# Metrics Section

Display four metric cards.

Use the exact same design and styling used on all existing dashboard metric cards.

Metrics:

* Total Products
* Out of Stock
* Total Inventory Worth
* Total In Customer Cart

All metrics must use real database data.

Implement loading states.

Implement caching.

---

# Category Tabs

Below the metrics create category tabs.

The design must match the Orders page tabs exactly.

---

# Tabs

Display:

All

[Dynamic Category Tabs]

Add Category

Categories should be generated from the database.

---

# Tab Styling

Must exactly match:

/dashboard/orders

Selected:

* White background

Unselected:

* Transparent background
* No border

---

# Category Counts

Display product count on each category tab.

Use muted badge styling.

Counts must come from the database.

---

# Add Category Tab

The final tab item should be:

Add Category

Clicking it opens a modal.

Use:

Shadcn Dialog

---

# Add Category Modal

Header:

Left:

Add Category

Right:

Cancel Button

---

# Form Fields

Category Name

Component:

Input

Required.

---

Category Description

Component:

Textarea

Required.

---

Target Audience

Component:

Input

Required.

Examples:

* Men
* Women
* Unisex
* Teenagers
* Corporate Professionals

---

Occasion

Component:

Select

Options:

* Wedding
* Birthday Party
* Office Party
* Corporate
* Casual
* Street
* Other

---

Season

Component:

Select

Options:

* Dry Season
* Rainy Season
* Sunny Season

---

Material

Component:

Select

Options:

* Cotton
* Linen
* Denim
* Leather
* Silk
* Wool
* Senator
* Polyester
* Jersey
* Other

---

Images

Not required.

Do not include image upload.

---

Finish Button

Position:

Bottom-right

Requirements:

Disabled until all required fields are valid.

On click:

Persist category to database.

Refresh category tabs.

Update counts.

---

# Products Table Section

Below the tabs display the Products Data Table.

Use the Shadcn Data Table pattern.

---

# Table Toolbar

Above the table.

Outside the table container.

---

Left Side

Search Input

Requirements:

Search products by:

* Name
* SKU
* Category

Debounced search preferred.

---

Right Side

Filter Dropdown

Use:

Dropdown Menu

Suggested Filters:

* In Stock
* Out Of Stock
* Low Stock
* In Cart
* Ordered
* Featured
* Active
* Archived

All filters should be database driven.

---

# Table Columns

Include:

Selection

Product

Category

SKU

Price

Stock Quantity

In Customer Cart

Orders

Status

Updated

Actions

---

# Selection Column

First column.

Use Shadcn Checkbox.

Support:

* Individual selection
* Select all

---

# Product Column

Display:

Product Image

Product Name

Variant Summary

Use existing design language.

---

# Status Column

Display:

* In Stock
* Low Stock
* Out Of Stock

Use Shadcn Badge.

---

# Actions Column

Final column.

Use Dropdown Menu.

Actions:

* Edit Product
* Delete Product
* Move Category

---

# Bulk Actions

When rows are selected:

Display bulk actions toolbar.

Use Shadcn components.

Support:

* Delete Selected
* Change Category
* Archive Products

Bulk actions must operate on selected rows.

---

# Table Footer

Outside the table.

Not visually attached to the table.

---

# Left Side

Default:

[Total Product Count] Products

When rows selected:

[X of Y row(s) selected]

Must update dynamically.

---

# Right Side

Pagination Controls

Use:

Shadcn Pagination

Requirements:

* Previous
* Next
* Page Numbers

Database-driven pagination preferred.

---

# Loading States

Implement:

Metric Skeletons

Tab Skeletons

Table Skeletons

Toolbar Skeletons

Pagination Skeletons

Use the existing skeleton infrastructure.

---

# Error Handling

Handle:

* Missing products
* Missing categories
* Invalid category assignment
* Database failures
* Bulk action failures

Display meaningful feedback.

---

# Shadcn Components Required

Use:

* Card
* Tabs
* Dialog
* Input
* Textarea
* Select
* Badge
* Data Table
* Dropdown Menu
* Checkbox
* Pagination
* Skeleton
* Tooltip
* Button
* Separator
* Scroll Area

Do not introduce custom alternatives.

---

# Analytics Preparation

If missing from schema, evaluate and add support for:

* Product Views
* Product Orders
* Product Cart Count
* Inventory Worth

These fields will support future analytics pages.

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Products page completion
* Category model implementation
* Table implementation
* Database updates
* Analytics preparation
* Current project state

---

# Definition Of Done

✓ Product metrics work

✓ Categories work

✓ Dynamic category tabs work

✓ Add Category modal works

✓ Categories persist to database

✓ Search works

✓ Filters work

✓ Table works

✓ Bulk actions work

✓ Pagination works

✓ Loading states exist

✓ Error handling exists

✓ Database persistence works

✓ Progress tracker updated

The Products page should function as a complete inventory and catalog management center.
