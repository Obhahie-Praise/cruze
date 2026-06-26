# customers-management-page.md

Before making any changes, read:

1. AGENTS.md
2. context/architecture.md
3. context/features.md
4. context/ui-context.md
5. context/user-flows.md
6. context/code-standards.md
7. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Build the Customer Management page.

Route:

/dashboard/customers

This page is the central location for customer management and customer analytics.

All data must come from the database.

Do not use mock data.

Maintain the existing dashboard design language.

Use Shadcn UI components exclusively.

---

# Database Audit

Before implementation:

Audit the current database schema.

Determine whether sufficient customer analytics data exists.

If required fields are missing, strategically extend the schema while preserving existing functionality.

Potential missing analytics include:

* Total Spend
* Total Orders
* Average Order Value
* Last Purchase Date
* Last Login Date
* Cart Value
* Promotional Purchases
* Account Creation Date

Update the architecture documentation if schema changes are required.

---

# Page Layout

Follow the exact layout used by:

* /dashboard/overview
* /dashboard/orders
* /dashboard/products

Content container:

max-w-7xl

Centered layout.

Neutral theme.

---

# Metrics Section

Display four metric cards.

Use the exact same metric card component already used throughout the dashboard.

Metrics:

* New Users This Month
* Total Users
* Users With At Least One Purchase
* Users With Multiple Purchases

All metrics must come from the database.

Implement server-side caching and skeleton loading states using the existing project conventions.

---

# Customer Tabs

Below the metrics, create tabs using the exact same design used on the Orders and Products pages.

Selected tab:

* White background

Unselected tabs:

* Transparent background
* No border

Maintain complete visual consistency.

---

# Tabs

Display:

* All
* This Month
* Paying Users
* Users With Items In Cart
* Multiple Purchases
* Promotional Purchases
* High Value Customers
* Inactive Customers

Each tab should display its corresponding customer count using the existing muted badge convention.

Tab counts must come from the database.

---

# Customer Table

Below the tabs, display a Shadcn Data Table.

Maintain the existing table design language used throughout the dashboard.

---

# Table Toolbar

Above the table.

Outside the table container.

Left:

Search Input

Search by:

* Name
* Email

Right:

Filter Dropdown

Suggested filters:

* Active
* Inactive
* Paying
* New
* Promotional
* Cart Abandoned
* Multiple Purchases
* High Value

Filters should use database data where possible.

---

# Table Columns

Include the following columns:

* Selection
* Customer
* Total Orders
* Total Spend
* Last Purchase
* Cart Value
* Account Status

---

# Customer Column

Display:

Profile Picture

↓

Full Name

↓

Email Address

Maintain the same spacing convention used elsewhere in the dashboard.

---

# Total Orders

Display the customer's lifetime order count.

---

# Total Spend

Display the customer's lifetime spend.

Format as currency.

---

# Last Purchase

Display:

* Relative time
* Exact date on hover tooltip

If no purchases exist, display an appropriate placeholder.

---

# Cart Value

Display the current monetary value of items remaining in the customer's cart.

If empty:

Display ₦0.

---

# Account Status

Use Shadcn Badge.

Possible values include:

* Active
* New
* Returning
* Inactive

Determine status using available customer data.

---

# Row Interaction

Do not include an Actions column.

Instead:

The entire row should be clickable.

Clicking a customer opens a detailed customer modal.

Use Shadcn Dialog.

---

# Customer Details Modal

Use a wide dialog.

Maintain the existing responsive modal behavior.

Desktop:

Reasonable maximum width.

Mobile:

Optimized and scrollable.

---

# Modal Header

Left:

Customer Name

Email underneath.

Right:

Desktop:

Cancel Button

Mobile:

X Button

Maintain existing dialog conventions.

---

# Customer Overview Section

Display:

* Profile Picture
* Full Name
* Email
* Phone Number (if available)
* Customer Since
* Last Login
* Account Status

---

# Customer Analytics

Present analytics using Shadcn Cards in a responsive grid.

Include:

* Lifetime Spend
* Lifetime Orders
* Average Order Value
* Current Cart Value
* Promotional Orders
* Wishlist Count (if available)

All analytics must come from the database.

---

# Purchase History

Below the analytics cards, display a table containing recent purchases.

Include:

* Order ID
* Order Date
* Items Purchased
* Total Amount
* Order Status

---

# Customer Addresses

If addresses exist, display them in a dedicated section.

Clearly indicate:

* Default Address
* Shipping Address
* Billing Address

---

# Current Cart

If the customer has products in their cart:

Display:

* Product Image
* Product Name
* Quantity
* Total Value

If the cart is empty:

Display an appropriate empty state.

---

# Promotions

If the customer has redeemed promotions:

Display:

* Promotion Name
* Discount Applied
* Redemption Date

---

# Loading States

Implement skeleton loading for:

* Metrics
* Tabs
* Customer Table
* Customer Modal
* Analytics Cards
* Purchase History

Use the project's existing skeleton infrastructure.

---

# Error Handling

Handle gracefully:

* Missing customer data
* Empty purchase history
* Empty cart
* Missing profile image
* Database failures

Provide meaningful empty states.

---

# Required Shadcn Components

Use:

* Card
* Badge
* Data Table
* Dialog
* Button
* Input
* Dropdown Menu
* Pagination
* Tooltip
* Avatar
* Skeleton
* Scroll Area
* Separator

Do not introduce custom alternatives.

---

# Build Validation

Before completion verify:

* npm run lint
* npm run build
* TypeScript compilation

All must pass successfully.

No warnings.

No TypeScript errors.

No lint errors.

---

# Progress Tracker

Update:

context/progress-tracker.md

Record:

* Customer page completed
* Database updates
* Analytics implementation
* Validation completed
* Current project state

---

# Definition of Done

✓ Metrics display real database data

✓ Customer tabs function correctly

✓ Search works

✓ Filters work

✓ Customer table functions correctly

✓ Customer modal displays comprehensive information

✓ Customer analytics display correctly

✓ Purchase history displays correctly

✓ Cart information displays correctly

✓ Responsive layout maintained

✓ Skeleton loading implemented

✓ Database persistence verified

✓ Lint passes

✓ Build passes

✓ Progress tracker updated

The Customer Management page should serve as a comprehensive customer analytics and customer relationship dashboard, allowing administrators to understand customer behavior, purchasing habits, and lifetime value while maintaining the project's existing design system and code quality standards.
