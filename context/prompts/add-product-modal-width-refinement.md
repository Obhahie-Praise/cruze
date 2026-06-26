# add-product-modal-width-refinement.md

Before making any changes, read:

1. AGENTS.md
2. context/ui-context.md
3. context/code-standards.md
4. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Refine the Add Product modal only.

Do not modify any functionality, validation, database logic, UploadThing integration, or form fields.

This is strictly a UI refinement.

---

# Issue

The Add Product modal is unnecessarily wide on desktop and large screens.

Although the form contains many fields, the current width makes the interface feel overwhelming.

---

# Required Changes

## Modal Width

Reduce the maximum width of the dialog.

The modal should resemble a professional dashboard form rather than a full-page editor.

Use a comfortable width that allows the form to be easily scanned without excessive horizontal space.

Maintain proper responsive behavior:

- Mobile: Full width with margins
- Tablet: Medium width
- Desktop: Reasonable fixed maximum width

The modal should never stretch across most of the screen.

---

## Form Layout

Keep the form simple and readable.

Group related fields together where appropriate.

Maintain consistent vertical spacing throughout the form.

Avoid large empty spaces.

Do not increase the number of columns simply because there is more width available.

Readability takes priority over fitting everything above the fold.

---

## Scrolling

If the content exceeds the viewport height:

- The dialog itself should remain fixed.
- Only the form body should become scrollable.
- Header and footer should remain visible.

This ensures the Finish and Cancel actions are always accessible.

---

## Preserve Existing Functionality

Do **not** modify:

- Image uploads
- Cover image selection
- Category selection
- Promotions
- Keywords
- Validation
- Database logic
- UploadThing integration

Only refine the presentation.

---

## Validation

Before completion verify:

- Responsive behavior remains intact.
- Modal remains accessible.
- No layout overflow occurs.
- Lint passes.
- Build passes.

---

## Progress Tracker

Update:

context/progress-tracker.md

Record the UI refinement after completion.

---

## Definition of Done

✓ Add Product modal width reduced

✓ Form remains responsive

✓ Header and footer remain visible

✓ Form body scrolls when necessary

✓ Existing functionality preserved

✓ Lint passes

✓ Build passes

✓ Progress tracker updated