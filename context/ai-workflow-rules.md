# AI Workflow Rules

## Purpose

This document defines the mandatory rules and procedures that all AI agents, assistants, copilots, and automated development systems must follow while contributing to this project.

These rules take precedence over convenience, speed, and assumptions.

No feature should be implemented without following this workflow.

---

# Core Principle

The AI is not a code generator.

The AI is a software engineer operating within an established system.

The AI must respect:

* Existing architecture
* Existing patterns
* Existing decisions
* Existing requirements

before generating code.

---

# Required Context

Before implementing any feature, the AI MUST read:

1. Project Vision
2. Requirements
3. Architecture
4. Database Schema
5. Features Specification
6. Decisions Log
7. UI Context
8. Existing Code

The AI must never assume information that is not present within these sources.

---

# Feature Development Process

Every feature must follow the same sequence.

---

## Step 1

Understand the feature.

Review:

* Feature specification
* Requirements
* Database relationships
* Existing architecture

The AI must identify:

* Inputs
* Outputs
* Dependencies
* Security requirements

before generating code.

---

## Step 2

Search for existing implementations.

The AI must determine:

* Does this already exist?
* Can an existing component be reused?
* Can an existing service be extended?

The AI should prefer extending existing systems over creating new systems.

---

## Step 3

Create an implementation plan.

Before coding, the AI must describe:

* Files affected
* Components required
* Database changes
* API changes
* Risks

No code should be generated until a plan exists.

---

## Step 4

Implement the smallest complete solution.

Avoid overengineering.

Avoid speculative features.

Build only what is required by the feature specification.

---

## Step 5

Review implementation.

Validate against:

* Acceptance Criteria
* Completion State
* Existing architecture

Only then consider the feature complete.

---

# Architecture Rules

The AI must never introduce new technologies without explicit approval.

Approved technologies are defined in Architecture.md.

---

## Forbidden Behavior

Do not introduce:

* New databases
* New authentication systems
* New state management libraries
* New styling systems
* New UI frameworks

unless explicitly approved.

---

# Component Rules

All UI development must follow UI Context.

---

## Component Priority

1. Existing project components
2. Shadcn UI components
3. Koko UI components
4. New custom components

New components should only be created when necessary.

---

## Styling Rules

Use:

* Tailwind
* Shadcn design tokens
* Existing utility classes

Do not use inline styles.

Do not hardcode colors.

Do not hardcode theme values.

---

## Theme Rules

All UI must support:

* Light Mode
* Dark Mode

from initial implementation.

No component should be built for a single theme.

---

# Icon Rules

Use Hugeicons.

Do not introduce additional icon libraries.

---

# API Rules

Every API route must include:

* Validation
* Authentication (when required)
* Authorization (when required)
* Error handling
* Typed responses

---

## Validation

Use Zod.

Validation is required for:

* Requests
* Forms
* API inputs
* Query parameters

---

## Error Handling

Every endpoint must return:

* Success state
* Failure state
* Helpful error messages

Avoid silent failures.

---

# Database Rules

The database schema is the source of truth.

---

## Schema Changes

Before modifying schema:

* Identify impact
* Update database documentation
* Update affected services

Schema changes should be minimal and intentional.

---

## Queries

Prefer:

* Efficient queries
* Explicit selections
* Pagination where appropriate

Avoid unnecessary database requests.

---

# Security Rules

Security is mandatory.

---

## Authentication

Protected routes must verify authentication.

---

## Authorization

Protected resources must verify permissions.

Never trust frontend permissions.

---

## Secrets

Never expose:

* API keys
* Database URLs
* Secret tokens

to client-side code.

---

## Input Handling

Treat all user input as untrusted.

Validate and sanitize inputs.

---

# Forms Rules

Every form must include:

* Validation
* Loading State
* Error State
* Success State

No form should submit without feedback.

---

# Loading Rules

Every asynchronous operation must provide:

* Loading indicators
  or
* Skeleton states

Blank screens are prohibited.

---

# Empty State Rules

Every list or data-driven page must support:

* No data state
* First-use state

The user should always understand what to do next.

---

## Infrastructure Rule

Authentication bugs must never be assumed to originate from Better Auth.

Always verify:

1. Database connectivity
2. Prisma health
3. Session storage
4. Middleware behavior

before modifying authentication logic.

# Accessibility Rules

All interfaces must support:

* Keyboard navigation
* Semantic HTML
* Accessible labels

Accessibility is not optional.

---

# Reusability Rules

Before creating:

* Component
* Hook
* Service
* Utility

the AI must check whether one already exists.

Prefer reuse over duplication.

---

# Folder Rules

New files must follow existing folder structure.

Do not create alternative organizational patterns.

Maintain consistency.

---

# Naming Rules

Names should be:

* Descriptive
* Predictable
* Consistent

Avoid abbreviations.

Avoid ambiguous names.

---

# Documentation Rules

When implementing a feature:

Update:

* Relevant docs
* Decisions log
* Tasks file

if changes affect them.

---

# Testing Rules

Every feature should include:

* Happy path testing
* Error path testing
* Edge case testing

The AI must actively attempt to break its own implementation.

---

# Review Rules

Before declaring a feature complete:

Verify:

* Acceptance criteria satisfied
* Completion state satisfied
* Types pass
* Lint passes
* Build passes

A feature is not complete simply because it compiles.

---

# Definition of Done

A feature is considered complete only when:

✓ Requirements satisfied

✓ Acceptance criteria satisfied

✓ Completion state satisfied

✓ Responsive behavior verified

✓ Theme support verified

✓ Validation implemented

✓ Error handling implemented

✓ Security considered

✓ Types pass

✓ Lint passes

✓ Build passes

✓ No duplicated logic introduced

✓ Existing architecture respected

---

# Final Rule

The AI must optimize for:

1. Maintainability
2. Consistency
3. Security
4. Scalability
5. Performance
6. Developer Experience

Speed is important, but never at the expense of quality.
