# UI Context

## Purpose

This document defines the visual system, component strategy, design principles, and user experience guidelines for the Ecommerce Platform Template.

All UI decisions, component generation, layouts, and design implementations should reference this document before creating new interfaces.

The goal is to maintain a consistent, modern, scalable, and reusable design system across the entire platform.

---

# Design Philosophy

The platform should feel:

* Modern
* Premium
* Minimal
* Professional
* Fast
* Trustworthy

The interface should prioritize clarity and usability over visual complexity.

The user should never feel overwhelmed by the interface.

Every UI decision should improve usability, discoverability, or conversion.

---

# Design Principles

## Simplicity First

Prefer simple interfaces over complex interfaces.

Avoid unnecessary visual elements.

Avoid decorative elements that do not improve usability.

---

## Content Over Decoration

Products should be the primary visual focus.

UI elements should support the content rather than compete with it.

---

## Consistency

Spacing, typography, layouts, buttons, forms, cards, and interactions should follow consistent patterns throughout the application.

---

## Accessibility

Interfaces should remain usable for all users regardless of device, screen size, or theme preference.

All components should support keyboard navigation and proper semantic HTML.

---

## Responsive By Default

Every component and layout must function correctly across:

* Mobile devices
* Tablets
* Laptops
* Desktop screens

Mobile experience should be considered before desktop enhancements.

---

# Design System

## Component Library

Primary Component System:

* Shadcn UI

Secondary Component System:

* Koko UI

Custom components should only be created when no suitable component exists within the approved libraries.

---

# Theme System

The application must support theme switching from the beginning of development.

Supported Themes:

* Light
* Dark
* System

Theme switching should be available globally.

Theme preference should persist between sessions.

---

## Theme Provider

Use:

* next-themes

Theme state should be available throughout the application.

---

# Color Strategy

No hardcoded brand colors should exist within the core template.

The template should remain brand-agnostic.

---

## Base Theme

Use Shadcn Neutral Theme.

The design system should rely primarily on semantic tokens:

* Background
* Foreground
* Card
* Border
* Primary
* Secondary
* Muted
* Accent
* Destructive

---

## Future Branding

Future client projects should be able to apply branding by modifying theme variables rather than editing component code.

---

# Typography

Typography should prioritize readability and professionalism.

---

## Font Characteristics

Preferred traits:

* Clean
* Modern
* Neutral
* Highly readable

Avoid:

* Decorative fonts
* Script fonts
* Novelty fonts

---

## Type Hierarchy

Use a consistent hierarchy:

### Display

Hero sections and marketing content.

### Heading

Section titles.

### Subheading

Supporting section titles.

### Body

Primary content.

### Caption

Secondary information.

---

# Icon System

## Icon Library

Use:

* Hugeicons

as the primary icon system.

---

## Guidelines

Icons should:

* Support comprehension
* Improve navigation
* Enhance visual hierarchy

Icons should not be added solely for decoration.

---

## Consistency

Do not mix multiple icon libraries.

All icons should originate from Hugeicons whenever possible.

---

# Layout System

Use a predictable layout structure.

---

## Storefront Layout

Structure:

Header

↓

Main Content

↓

Footer

---

## Dashboard Layout

Structure:

Sidebar

↓

Content Area

↓

Optional Detail Panel

---

# Navigation

Navigation should be simple and predictable.

---

## Storefront Navigation

Primary Navigation:

* Home
* Shop
* Collections
* Categories

Secondary Navigation:

* Search
* Cart
* Account

---

## Dashboard Navigation

Primary Sections:

* Overview
* Products
* Categories
* Collections
* Orders
* Customers
* Coupons
* Content
* Settings

---

# Component Guidelines

## Buttons

Use Shadcn Button component.

Button variants should remain consistent throughout the application.

Avoid creating custom button styles without strong justification.

---

## Forms

Use:

* React Hook Form
* Zod Validation

All forms should provide:

* Validation feedback
* Loading states
* Error states
* Success states

---

## Tables

Use Shadcn Table components.

Tables should support:

* Sorting
* Filtering
* Pagination

where appropriate.

---

## Dialogs

Use Shadcn Dialog components.

Dialogs should be reserved for:

* Confirmations
* Critical actions
* Short workflows

Avoid placing large forms inside dialogs.

---

## Cards

Cards should be used extensively throughout:

* Product displays
* Analytics widgets
* Dashboard modules
* Collection displays

Cards should remain visually lightweight.

---

# Loading States

Every asynchronous operation must have a loading state.

Use:

* Skeletons
* Loading indicators

Avoid blank screens whenever possible.

---

# Empty States

Every list or data view should support an empty state.

Examples:

* No products
* No orders
* No customers

Empty states should provide clear guidance on the next action.

---

# Error States

Every major user interaction should handle failures gracefully.

Examples:

* Upload failure
* Payment failure
* Network failure

Users should always understand what happened and what to do next.

---

# Ecommerce Experience Guidelines

## Product Pages

Prioritize:

* Product images
* Product title
* Price
* Variants
* Add-to-cart action

Above the fold.

---

## Product Images

Images should be large and high quality.

Image galleries should support:

* Zoom
* Multiple images
* Mobile swiping

---

## Cart Experience

Cart interactions should feel immediate.

Users should receive instant feedback when adding or removing items.

---

## Checkout Experience

Checkout should minimize friction.

Reduce unnecessary fields.

Reduce unnecessary steps.

Maintain clear progress indicators.

---

# Dashboard Experience Guidelines

The dashboard should feel:

* Fast
* Professional
* Data-focused

The goal is operational efficiency rather than visual impressiveness.

---

# Reusable UI Philosophy

Every page should be composed from reusable components.

Avoid page-specific implementations whenever possible.

Reusable systems should be prioritized over one-off solutions.

---

# AI Instructions

When generating UI:

1. Use Shadcn UI first.
2. Use Koko UI when appropriate.
3. Use Hugeicons for icons.
4. Support light and dark mode.
5. Follow existing component patterns.
6. Maintain responsive behavior.
7. Prioritize usability over visual complexity.
8. Reuse components before creating new ones.
9. Avoid hardcoded colors.
10. Preserve design consistency across the application.

---

# Guiding Statement

The interface should feel like a modern SaaS product combined with a premium ecommerce experience.

Every component should be simple, reusable, responsive, and aligned with the overall design system.
