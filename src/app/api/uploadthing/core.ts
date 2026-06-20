import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const f = createUploadthing();

// ─── Auth helpers ──────────────────────────────────────────────────────────

async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new UploadThingError("Unauthorized");
  return session.user;
}

async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "ADMIN") throw new UploadThingError("Forbidden");
  return user;
}

// ─── File Router ───────────────────────────────────────────────────────────

export const ourFileRouter = {
  /**
   * Product images — Admin only
   * Accepts up to 10 images, max 8 MB each
   */
  productImageUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      const user = await requireAdmin();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),

  /**
   * Deal poster — Admin only
   * Accepts 1 image, max 4 MB
   */
  dealPosterUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await requireAdmin();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),

  /**
   * Category image — Admin only
   * Accepts 1 image, max 4 MB
   */
  categoryImageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await requireAdmin();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),

  /**
   * Collection banner — Admin only
   * Accepts 1 image, max 6 MB (banners tend to be wider/larger)
   */
  collectionBannerUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await requireAdmin();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),

  /**
   * Homepage banner — Admin only
   * Accepts 1 image, max 8 MB
   */
  homepageBannerUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await requireAdmin();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),

  /**
   * Avatar — Authenticated users
   * Accepts 1 image, max 2 MB
   */
  avatarUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const user = await requireAuth();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),

  /**
   * Support ticket attachments — Authenticated users
   * Accepts up to 5 files (images or PDFs), max 8 MB each
   */
  supportAttachmentUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 5 },
    pdf: { maxFileSize: "8MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const user = await requireAuth();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
