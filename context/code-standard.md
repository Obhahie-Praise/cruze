# Code Standards

## Purpose

This document defines the coding standards for the Ecommerce Platform.

All contributors, whether human or AI, must follow these standards to ensure consistency, maintainability, scalability, and long-term code quality.

These standards take precedence over personal preference.

---

# Core Principles

Code should be:

* Readable
* Predictable
* Maintainable
* Reusable
* Type-safe
* Consistent

Every implementation should prioritize long-term maintainability over short-term convenience.

---

# TypeScript Standards

TypeScript is mandatory throughout the project.

The codebase must remain fully type-safe.

---

## Type Safety

The use of `any` is prohibited.

Type assertions should be minimized.

Type safety should never be bypassed to silence errors.

---

## Type Definitions

Interfaces should be the primary method for defining object structures.

Types should be reserved for unions, compositions, and utility definitions.

All public functions, services, and components should have clearly defined types.

---

# Next.js Standards

The project uses the App Router architecture.

All routing, layouts, and data-fetching patterns must align with modern Next.js practices.

Server Components should be the default choice.

Client Components should only be used when interactivity requires them.

---

# Component Standards

Components should be:

* Focused
* Reusable
* Composable
* Easy to understand

Large, multi-purpose components should be avoided.

Before creating a new component, existing components should be evaluated for reuse.

---

# Styling Standards

The project uses:

* Tailwind CSS
* Shadcn UI
* Koko UI

No additional styling systems should be introduced.

---

## Design Consistency

Styling should rely on design tokens and theme variables rather than hardcoded values.

Components must support both light and dark themes.

Visual consistency should be maintained across all pages and features.

---

# Forms Standards

All forms should follow a consistent validation and error-handling strategy.

Every form must provide:

* Validation feedback
* Loading states
* Error states
* Success states

---

# State Management

State should remain as close as possible to where it is needed.

Global state should only be introduced when necessary.

Server state and URL state should be preferred over unnecessary client-side state.

---

# Database Standards

The database schema is the single source of truth.

Database access should remain consistent throughout the application.

Schema modifications must be intentional and documented.

---

# Security Standards

Security considerations are mandatory for every feature.

Authentication, authorization, validation, and error handling must never be skipped.

User input should always be treated as untrusted.

---

# Accessibility Standards

All interfaces should be accessible by default.

Components should support:

* Keyboard navigation
* Semantic structure
* Screen readers

Accessibility is a requirement, not an enhancement.

---

# Performance Standards

Implementations should avoid unnecessary complexity, duplication, and excessive client-side processing.

Performance improvements should never compromise readability or maintainability.

---

# Reusability Standards

Before introducing new:

* Components
* Hooks
* Utilities
* Services

existing solutions should be evaluated first.

Duplication should be avoided whenever possible.

---

# Forbidden Practices

The following practices are prohibited:

* Using any
* Bypassing type safety
* Introducing unapproved dependencies
* Duplicating existing functionality
* Hardcoding theme values
* Ignoring validation requirements
* Ignoring error handling
* Creating oversized, multi-purpose components
* Circumventing established architecture

---

# Definition of Good Code

Good code is:

✓ Consistent

✓ Type-safe

✓ Readable

✓ Reusable

✓ Accessible

✓ Secure

✓ Maintainable

✓ Aligned with project architecture

---

# Guiding Statement

Every new file, component, service, and feature should feel like a natural extension of the existing system.

The project should appear as though it was designed and implemented by a single, disciplined engineering team.
