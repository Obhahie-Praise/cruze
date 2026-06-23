# Orders Management System

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

Build the Orders Management page.

Route:

/dashboard/orders

This page should serve as the operational center for order management.

Use real database data.

Do not use mock data.

---

# Database Audit

Before implementation:

Audit all order-related database models.

Determine whether existing schemas can support:

- Order metrics
- Order statuses
- Refund tracking
- Product snapshots
- Variant snapshots
- Operational workflows

If required fields are missing:

Update the schema.

Generate migrations.

Update architecture documentation.

---

# Order Lifecycle

Support:

NEW
↓
PENDING
↓
READY
↓
DELIVERED

Alternative states:

CANCELLED
REFUNDED

Status changes must persist to the database.

---

# Page Layout

The page should follow the same design conventions used on:

/dashboard/overview

Content container:

max-w-7xl

Centered layout.

Maintain the neutral design system.

---

# Metrics Section

Use the exact metric card styling used on the Overview page.

Metrics:

- Total Orders (All Time)
- Orders This Month
- Total Delivered
- Average Profit Per Order

Use real database data.

Implement loading states.

Implement caching.

---

# Orders Section

Below the metrics create the Orders Management section.

---

# Order Tabs

Create pill-style tabs.

Horizontal layout.

Tabs:

- All
- New
- Cancelled / Returned
- Pending
- Ready
- Delivered
- Promotional

---

# Tab Styling

Selected:

- White background
- High contrast text

Unselected:

- Transparent background
- No border

Use the existing design language.

---

# Order Counts

Each tab should display:

- Status name
- Order count

The count should appear on the right side.

Use a muted badge style.

Display real counts.

---

# Filtering Logic

Switching tabs should filter the displayed orders.

Filtering must be powered by database data.

Do not filter only on the client if server filtering is possible.

---

# Order Cards

Below the tabs display order cards.

List layout.

---

# Card Structure

Left:

Order image

Requirements:

- Full card height
- Product image
- Rounded corners consistent with project styling

---

# Order Information

Display:

Product Name

Category

Variant Information

Examples:

- Size
- Color
- Material

Maintain clear spacing.

---

# Price Information

Display:

Total Order Price

Requirements:

- Large
- Bold
- High visibility

---

# Quantity

Display:

Quantity Purchased

Align to the right side.

---

# Status Badge

Display:

Order Status Badge

Position:

Top-right area of the card.

Use Shadcn Badge.

---

# Order Detail Modal

Clicking an order opens:

A wide detail modal.

Use:

Shadcn Dialog

---

# Modal Content

Display:

Order Information

Customer Information

Shipping Information

Product Information

Variant Information

Order Timeline

Payment Information

Order Status

Order Notes

Use a professional administrative layout.

Design should feel enterprise-grade.

---

# Actions Section

At the bottom of the modal display:

Actions

---

# Available Actions

Mark as Ready

Mark as Delivered

Refund

---

# Mark As Ready

Requirements:

- Persist to database
- Irreversible
- Update order status

After completion:

Disable action permanently.

Display:

Already Marked Ready

in a disabled state.

---

# Mark As Delivered

Requirements:

- Persist to database
- Update status
- Update analytics

---

# Refund Action

Clicking Refund should open:

A secondary confirmation dialog.

---

# Refund Dialog

Require:

Refund Reason

Use:

Textarea

The administrator must provide a reason.

Store reason in database.

---

# Final Confirmation

Before any action executes:

Display a warning.

Message should clearly communicate:

This action cannot be reversed.

Administrator must confirm.

---

# Finish Button

Display:

Finish

Bottom-right of modal.

Action executes only after confirmation.

---

# Analytics Updates

Order actions should update:

- Order metrics
- Revenue metrics
- Dashboard analytics

Persist all changes.

---

# Caching

Use the same caching strategy implemented for Overview.

Requirements:

- Fast page loads
- Efficient database access
- Fresh operational data

---

# Loading States

Implement:

- Metrics skeletons
- Tab skeletons
- Order card skeletons
- Modal skeletons

Use existing reusable skeleton infrastructure.

---

# Error Handling

Handle:

- Missing orders
- Missing products
- Invalid status transitions
- Refund failures
- Database failures

Display user-friendly feedback.

---

# Shadcn Usage

Extensive use of Shadcn components is required.

Use:

- Card
- Badge
- Tabs
- Dialog
- Alert Dialog
- Dropdown Menu
- Separator
- Scroll Area
- Skeleton
- Tooltip
- Button
- Textarea

Reuse existing project patterns.

---

# Restrictions

Do not:

- Use mock data
- Hardcode counts
- Fake analytics
- Skip database persistence

Everything must be connected to the database.

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

- Orders page completion
- Database changes
- Status workflow implementation
- Refund workflow implementation
- Metrics implementation
- Current project state

---

# Definition of Done

✓ Orders metrics work

✓ Order tabs work

✓ Counts display correctly

✓ Order filtering works

✓ Order cards display correctly

✓ Status badges work

✓ Order detail modal works

✓ Mark Ready works

✓ Mark Delivered works

✓ Refund workflow works

✓ Refund reasons are stored

✓ Database persistence works

✓ Loading states exist

✓ Caching exists

✓ Error handling exists

✓ Progress tracker updated

The Orders page should function as a complete operational order management center.