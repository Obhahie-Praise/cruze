<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

# Purpose

This document defines the mandatory workflow for all AI agents contributing to this project.

Before making any architectural decision, writing code, modifying files, refactoring existing systems, or reviewing implementations, every AI agent must follow the process defined in this document.

This file serves as the entry point into the project's documentation system.

---

# Core Responsibility

The AI agent's responsibility is not simply to generate code.

The AI agent is responsible for:

- Understanding project goals
- Following established architecture
- Maintaining consistency
- Preserving code quality
- Respecting existing decisions
- Updating project progress

Every implementation should strengthen the project rather than introduce unnecessary complexity.

---

# Required Reading Order

Before performing any implementation task, read the following files in order:

1. `context/project-vision.md`
2. `context/architecture.md`
3. `context/features.md`
4. `context/user-flows.md`
5. `context/ui-context.md`
6. `context/code-standards.md`
7. `context/ai-workflow-rules.md`
8. `context/progress-tracker.md`

No implementation should begin before reviewing these files.

---

### Building a Feature

Read:

- Relevant feature specification
- Relevant user flow
- Relevant design document

### Building UI

Read:

- UI Context
- Relevant design document
- Relevant user flow

### Building Backend Logic

Read:

- Architecture
- Relevant specification
- Relevant feature requirements

### Reviewing Existing Code

Read:

- Code Standards
- Architecture
- Relevant feature specification

---

# Mandatory Workflow

For every task, follow this sequence:

## Step 1 — Understand

Identify:

- Feature requirements
- User flow requirements
- Architectural constraints
- Existing patterns

Do not make assumptions.

---

## Step 2 — Analyze

Review:

- Existing code
- Existing components
- Existing services
- Existing utilities

Reuse existing solutions whenever possible.

Avoid duplication.

---

## Step 3 — Plan

Before implementation, determine:

- Files affected
- Components affected
- Database impact
- API impact
- Potential risks

Implement intentionally.

---

## Step 4 — Build

Implement the smallest complete solution that satisfies requirements.

Avoid overengineering.

Avoid speculative features.

Build only what is required.

---

## Step 5 — Review

Validate implementation against:

- Architecture
- Features
- User Flows
- Code Standards
- UI Context

Confirm the implementation satisfies all requirements.

---

## Step 6 — Update Progress

After every meaningful implementation change, update:

`context/progress-tracker.md`

The progress tracker must always reflect the current state of the project.

Update:

- Current Goal
- Completed
- In Progress
- Next Up
- Open Questions
- Architecture Decisions
- Session Notes
- Project Health

as appropriate.

Do not leave completed work undocumented.

---

# Definition of Complete

A task should not be considered complete until:

- Requirements are satisfied
- User flows are satisfied
- Error handling exists
- Validation exists
- Responsive behavior is considered
- Theme support is considered
- Code follows project standards
- Progress tracker has been updated

---

# Restrictions

AI agents must not:

- Ignore project documentation
- Bypass architecture decisions
- Introduce unapproved technologies
- Duplicate existing functionality
- Ignore validation requirements
- Ignore error handling requirements
- Circumvent established workflows

When uncertain, prefer consistency with the existing system.

---

# Progress Tracker Rule

The progress tracker is the project's active memory.

Every AI agent must review it before beginning work and update it after completing meaningful work.

The tracker should always answer:

- What has been completed?
- What is currently being worked on?
- What should happen next?
- What decisions have been made?
- What questions remain unresolved?

---

# Guiding Principle

Read first.
Understand second.
Plan third.
Build fourth.
Review fifth.
Update progress last.

Consistency, maintainability, and project alignment should always take precedence over speed.