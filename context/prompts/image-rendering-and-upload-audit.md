# image-rendering-and-upload-audit.md

Before making any changes, read:

1. AGENTS.md
2. context/architecture.md
3. context/code-standards.md
4. context/features.md
5. context/progress-tracker.md

Follow all project standards and workflows.

---

# Objective

Stop all feature development.

Switch into debugging and stabilization mode.

The goal of this task is to completely audit the application's image upload, preview, rendering, and display pipeline.

There are currently issues affecting:

* Product image uploads
* Product image previews
* Next.js Image rendering
* Customer profile image rendering

Do not implement new features.

Do not redesign the UI.

Focus exclusively on identifying and fixing the underlying causes.

---

# Part 1 — Product Upload Audit

Audit the complete Add Product workflow.

Inspect every step from image selection through database persistence.

Verify:

* UploadThing configuration
* Upload route
* Client uploader
* Upload response
* Local component state
* Preview generation
* Database persistence
* Product retrieval
* Product display

Do not assume the problem exists in only one location.

---

# Part 2 — Image Preview

Current Issue

After selecting images, no previews are displayed.

The preview area remains empty.

---

## Required Behavior

Immediately after image selection:

* Generate previews locally.
* Display every selected image.
* Preserve upload order.
* Allow image removal.
* Allow cover image selection.
* Update the preview immediately after changes.

The preview must work before the form is submitted.

---

# Part 3 — Cover Image

Verify the selected cover image updates correctly.

Changing the cover image should immediately update the preview state.

Only one image may be marked as the cover image.

---

# Part 4 — Next.js Image Audit

Current Issue

An error is being thrown by the Next.js Image component.

Audit every usage of the Image component.

Verify:

* src is never undefined
* src is never null
* src is never an empty string
* width and height requirements are satisfied where applicable
* fill usage is correct
* parent containers are correctly positioned
* objectFit usage is appropriate
* remote domains are configured correctly
* Image is only rendered when a valid source exists

Do not suppress errors.

Identify and correct the root cause.

---

# Part 5 — Customer Page Audit

Current Issue

The Customer page fails to render because of:

customer.image

Audit every location where customer images are rendered.

Determine whether:

* image is nullable
* image is optional
* image is missing from the database
* image URLs are invalid
* image domains are not configured
* incorrect assumptions are being made during rendering

---

# Required Behavior

Customer pages must never crash because a profile image is unavailable.

If a customer has:

* no profile image
* null image
* undefined image
* empty image

display a Shadcn Avatar fallback instead.

Use:

* Customer initials
* Neutral styling

The page must continue functioning normally.

---

# Part 6 — Image Component Safety

Audit every Next.js Image component in the project.

Every Image component should:

* Validate its source before rendering.
* Render graceful fallbacks when necessary.
* Never throw runtime errors because of invalid data.

Image rendering should be resilient throughout the application.

---

# Part 7 — Database Audit

Verify image-related fields.

Products:

* Cover Image
* Additional Images

Customers:

* Profile Image

Ensure the database schema matches the application's expectations.

If inconsistencies exist:

Correct the implementation rather than forcing invalid data.

---

# Part 8 — UploadThing Audit

Audit:

* Upload routes
* Upload callbacks
* Returned URLs
* Client uploader
* Server uploader
* Upload errors

Confirm uploaded image URLs are:

* persisted correctly
* returned correctly
* displayed correctly

---

# Part 9 — Runtime Verification

Verify:

Product Upload

✓ Images preview immediately

✓ Images upload successfully

✓ Cover image selection works

✓ Database stores images correctly

✓ Product renders correctly after creation

Customer Page

✓ Loads successfully

✓ Customer image displays when available

✓ Avatar fallback displays when unavailable

✓ No runtime exceptions occur

---

# Error Handling

Gracefully handle:

* Missing images
* Failed uploads
* Invalid image URLs
* Empty image arrays
* UploadThing failures
* Database inconsistencies

The application should never crash because an image is unavailable.

---

# Validation

Before completion verify:

* npm run lint
* npm run build
* TypeScript compilation

All must pass.

There should be:

* Zero runtime image errors
* Zero Image component errors
* Zero UploadThing errors
* Zero customer image crashes

---

# Progress Tracker

Update:

context/progress-tracker.md

Record:

* Image pipeline audited
* Upload preview fixed
* Customer image rendering fixed
* UploadThing verified
* Validation completed

---

# Definition of Done

✓ Product image previews display immediately after selection

✓ Multiple image previews function correctly

✓ Cover image selection works

✓ Uploaded images persist correctly

✓ Customer page loads without crashing

✓ Missing customer images display Avatar fallbacks

✓ Next.js Image components render safely

✓ UploadThing integration verified

✓ Lint passes

✓ Build passes

✓ Progress tracker updated

The application's image handling pipeline should now be resilient, fault-tolerant, and fully functional across uploads, previews, and rendering.
