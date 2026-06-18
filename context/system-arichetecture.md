# Architecture

## Purpose

This document defines the technical architecture of the Ecommerce Platform.

It serves as the source of truth for how the system is structured, how components interact, and which technologies are approved for use.

All development decisions must align with this architecture.

When implementing features, AI agents and developers should consult this document before introducing new technologies, patterns, or system designs.

---

# Architecture Principles

The platform should be:

* Scalable
* Maintainable
* Secure
* Reusable
* Performance-focused
* Easy to extend

Architectural consistency is prioritized over individual preferences.

---

# Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

---

## UI System

* Shadcn UI
* Koko UI
* Hugeicons

---

## Backend

* Next.js Route Handlers
* TypeScript

---

## Database

* PostgreSQL

---

## ORM

* Prisma

---

## Authentication

* Better auth

---

## Payments

* Paystack

---

## File Storage

* UploadThing

---

## Form Management

* React Hook Form
* Zod

---

## State Management

* React Query
* React State
* URL State

Global state should only be introduced when necessary.

---

## Deployment

* Vercel

---

# System Structure

The platform consists of four primary systems:

---

## Storefront

Customer-facing ecommerce experience.

Responsibilities:

* Product browsing
* Product search
* Product filtering
* Cart management
* Checkout
* Customer accounts

---

## Admin Portal

Administrative control center.

Responsibilities:

* Product management
* Category management
* Collection management
* Order management
* Customer management
* Content management
* Analytics

---

## Commerce Engine

Core business logic.

Responsibilities:

* Product handling
* Inventory management
* Order processing
* Coupon validation
* Payment processing

---

## Shared Systems

Reusable functionality used across the application.

Responsibilities:

* Authentication
* Validation
* Uploads
* Notifications
* Logging
* Utilities

---

# Application Architecture

The application follows a layered architecture.

User Interface

↓

Business Logic

↓

Data Access

↓

Database

Each layer should have a clear responsibility.

Business logic should not exist inside UI components.

Database logic should not exist inside presentation layers.

---

# Routing Architecture

The application uses the Next.js App Router.

Primary route groups:

* Storefront
* Authentication
* Account
* Portal
* API

Route organization should remain consistent throughout the application.

---

# Component Architecture

Components should be organized around features and reusability.

Preference order:

1. Existing project components
2. Shadcn UI components
3. Koko UI components
4. New custom components

New components should only be created when necessary.

---

# Data Architecture

The database serves as the single source of truth.

All data access should flow through Prisma.

Database structures should be defined and maintained through the database schema.

Business logic should not rely on assumptions about data structures.

---

# Security Architecture

Security must be considered at every layer.

Core security responsibilities include:

* Authentication
* Authorization
* Validation
* Input handling
* Secret management

Frontend permissions must never be trusted.

All sensitive operations must be verified on the server.

---

# Theme Architecture

The platform supports:

* Light Mode
* Dark Mode
* System Theme

Theme support is required across all features and components.

No implementation should assume a single theme.

---

# Scalability Strategy

The platform is designed as a reusable ecommerce foundation.

Future projects should be able to:

* Replace branding
* Replace content
* Replace products
* Replace business data

without requiring architectural changes.

Features should be designed with reuse in mind.

---

# AI Usage Guidelines

Before implementing any feature, AI agents should:

1. Read this document.
2. Verify the feature aligns with approved technologies.
3. Verify the feature aligns with existing architecture.
4. Reuse existing systems whenever possible.
5. Avoid introducing alternative solutions when an approved solution already exists.

---

## AI Restrictions

AI agents must not:

* Introduce new databases.
* Introduce new authentication providers.
* Introduce new UI frameworks.
* Introduce new styling systems.
* Introduce new ORMs.
* Introduce new state management solutions.

unless explicitly approved and documented.

---

# Definition of Architectural Success

The architecture is considered successful when:

✓ Features remain easy to add.

✓ Business logic remains organized.

✓ Systems remain loosely coupled.

✓ Components remain reusable.

✓ Security remains consistent.

✓ New developers can understand the structure quickly.

✓ Future ecommerce projects can reuse the platform with minimal changes.

---

# Guiding Statement

The architecture should provide a stable foundation that allows the platform to evolve without requiring fundamental rewrites.

Every implementation should strengthen the system rather than introduce unnecessary complexity.
