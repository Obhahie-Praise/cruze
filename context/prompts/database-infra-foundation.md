# Infrastructure Foundation

Before making any changes, read:

1. AGENTS.md
2. context/project-vision.md
3. context/architecture.md
4. context/features.md
5. context/user-flows.md
6. context/ui-context.md
7. context/code-standards.md
8. context/ai-workflow-rules.md
9. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Build the project's foundational infrastructure.

This implementation establishes:

* Database architecture
* Better Auth infrastructure
* UploadThing infrastructure
* Dashboard route architecture updates
* Search command infrastructure

This work must be completed before feature development begins.

---

# Dashboard Route Updates

Ensure the dashboard contains the following routes:

* /dashboard/overview
* /dashboard/orders
* /dashboard/products
* /dashboard/customers
* /dashboard/deals
* /dashboard/support
* /dashboard/analytics

---

# Dashboard Sidebar Updates

Update the dashboard sidebar navigation.

Navigation order must be:

1. Search
2. Overview
3. Orders
4. Products
5. Customers
6. Deals
7. Support
8. Analytics

---

# Search Command

The Search navigation item should:

* Open the dashboard search dialog
* Use the existing dashboard search modal
* Display the keyboard shortcut

Required keyboard shortcut:

* Ctrl + L
* Cmd + L

The search button must visually display a KBD indicator showing the shortcut.

Requirements:

* Clicking Search opens the dialog
* Ctrl + L opens the dialog
* Cmd + L opens the dialog
* Prevent browser conflicts where appropriate
* Search functionality is not required
* Only the command palette infrastructure should exist

The command palette should be designed for future navigation actions.

---

# Database Setup

Install and configure:

* Prisma
* PostgreSQL

Configure Prisma Client correctly.

Create the initial migration.

Generate Prisma Client.

---

# Database Models

Create the following models.

---

## User

Fields should support:

* Better Auth integration
* Customer analytics
* Customer lifecycle tracking
* Administrative permissions

Include:

* identity data
* profile data
* verification status
* customer metrics
* role information
* timestamps

Roles:

* ADMIN
* CUSTOMER

---

## Address

Store customer addresses.

Support:

* multiple addresses
* default address selection

---

## Product

Store:

* product information
* pricing
* inventory
* SEO metadata
* profitability data
* publishing status

Include:

* cost price
* selling price
* compare price
* stock tracking
* SKU
* slug

---

## ProductImage

Store product image relationships.

Support:

* multiple images
* image ordering

---

## Category

Store:

* category information
* category images
* SEO information

---

## Collection

Store:

* collection information
* collection banners
* SEO information

---

## ProductCollection

Create a junction table.

Support:

* many-to-many relationships between products and collections

---

## Cart

Store:

* customer cart information
* abandoned cart information
* activity tracking

---

## CartItem

Store:

* cart product relationships
* quantity
* pricing information

---

## Order

Store:

* complete order information
* shipping information
* payment information
* order lifecycle information

Statuses should support:

* Pending
* Paid
* Processing
* Shipped
* Delivered
* Cancelled
* Refunded

---

## OrderItem

Store:

* historical product information
* quantity
* pricing snapshots

Order items should remain historically accurate even if products change later.

---

## PaymentTransaction

Required for Paystack.

Store:

* payment references
* gateway responses
* transaction status
* payment verification data
* payment timestamps

The system must never rely solely on Paystack records.

---

## Deal

Store:

* promotional campaigns
* deal banners
* active periods
* performance tracking

Include:

* views
* clicks

for future analytics.

---

## Coupon

Store:

* discount rules
* expiration
* usage limits
* redemption metrics

---

## SupportTicket

Store:

* customer support requests
* priority
* status
* ticket lifecycle information

---

## SupportMessage

Store:

* ticket conversations
* message history
* attachments

---

## ProductView

Track product views.

Used for analytics.

---

## SearchEvent

Track search activity.

Used for analytics.

---

## CartEvent

Track cart activity.

Used for analytics.

---

## CheckoutEvent

Track checkout progression.

Used for analytics.

---

## SiteEvent

Store platform-wide events.

Examples include:

* Product Views
* Add To Cart
* Checkout Started
* Orders Created
* Payments Successful
* Deal Clicks

This table will power future analytics dashboards.

---

# Relationships

Implement proper relationships for all models.

Requirements:

* Foreign keys
* Indexes
* Unique constraints
* Cascade rules
* Query optimization

Relationships must be intentional and production ready.

---

# Better Auth Setup

Install and configure:

* Better Auth

Configure all required environment variables.

---

# Authentication Strategy

Guests can:

* Browse products
* Browse collections
* Browse categories
* View deals
* Search products

Guests cannot:

* Checkout
* Access profile
* Create support tickets
* Access dashboard

---

# Checkout Authentication Flow

Allow:

Browse
↓
Add To Cart
↓
Cart
↓
Checkout

Authentication should occur only when checkout begins.

After authentication:

Return user to checkout automatically.

---

# User Synchronization

Better Auth users must be synchronized with the internal User table.

The database remains the application's source of truth.

Authentication data should not exist exclusively inside Better Auth.

---

# Route Protection

Protect:

* /dashboard/*
* /profile
* /checkout
* /support

---

# Role Protection

Only users with:

ADMIN

may access:

* /dashboard/*

Unauthorized users should be redirected appropriately.

---

# UploadThing Setup

Install and configure UploadThing.

Create the following upload routes.

---

## productImageUploader

Purpose:

Product images

Access:

Admin only

---

## dealPosterUploader

Purpose:

Deal posters

Access:

Admin only

---

## categoryImageUploader

Purpose:

Category images

Access:

Admin only

---

## collectionBannerUploader

Purpose:

Collection banners

Access:

Admin only

---

## homepageBannerUploader

Purpose:

Homepage banners

Access:

Admin only

---

## avatarUploader

Purpose:

Customer profile images

Access:

Authenticated users

---

## supportAttachmentUploader

Purpose:

Support ticket attachments

Access:

Authenticated users

---

# Upload Requirements

Each route must define:

* accepted file types
* file size limits
* authentication requirements
* metadata handling
* upload validation

Only infrastructure should be created.

Do not build upload interfaces.

---

# Restrictions

Do not:

* Build CRUD pages
* Build storefront pages
* Build checkout UI
* Build support UI
* Build analytics UI
* Build product management UI
* Build order management UI
* Build payment UI

Only establish infrastructure.

---

# Quality Checks

Verify:

* Prisma compiles
* Better Auth compiles
* UploadThing compiles
* Migrations succeed
* Types generate correctly
* Relationships are valid
* Protected routes work
* Dashboard routes exist
* Search shortcut works
* Search dialog opens correctly

---

# Progress Tracker

After completion:

Update:

context/progress-tracker.md

Record:

* Database infrastructure completion
* Better Auth setup completion
* UploadThing setup completion
* Dashboard route updates
* Search command updates
* Architectural decisions made
* Current project state

---

# Definition of Done

This task is complete only when:

✓ Database schema exists

✓ Relationships are configured

✓ Initial migration succeeds

✓ Prisma Client is generated

✓ Better Auth is configured

✓ User synchronization is configured

✓ Route protection exists

✓ UploadThing is configured

✓ Upload routes exist

✓ Dashboard routes include Deals and Support

✓ Sidebar includes Deals and Support

✓ Search button displays shortcut

✓ Ctrl + L opens search

✓ Cmd + L opens search

✓ Progress tracker has been updated

The project should be ready for feature implementation immediately after completion.
