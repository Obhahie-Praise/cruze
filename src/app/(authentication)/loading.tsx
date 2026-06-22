import { AuthLayout } from "@/components/auth/auth-layout";

/**
 * Route-level loading skeleton for all authentication pages.
 * Displayed by Next.js while the auth page (sign-in, sign-up, reset-password)
 * is loading. Renders the AuthLayout shell with a form skeleton placeholder.
 */
export default function AuthLoading() {
  return (
    <AuthLayout>
      <div className="flex w-full flex-col gap-6 animate-pulse">
        {/* Heading Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-9 w-36 bg-muted rounded-md" />
          <div className="h-4 w-64 bg-muted rounded" />
        </div>

        {/* OAuth Button Skeleton */}
        <div className="h-11 w-full bg-muted rounded-md" />

        {/* Divider Skeleton */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <div className="h-4 w-6 bg-muted rounded" />
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Form Fields Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-12 bg-muted rounded" />
            <div className="h-11 w-full bg-muted rounded-md" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-16 bg-muted rounded" />
            <div className="h-11 w-full bg-muted rounded-md" />
          </div>
        </div>

        {/* Remember me / Forgot Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-muted rounded" />
            <div className="h-4 w-28 bg-muted rounded" />
          </div>
          <div className="h-4 w-28 bg-muted rounded" />
        </div>

        {/* Submit Button Skeleton */}
        <div className="h-11 w-full bg-muted rounded-md mt-4" />

        {/* Footer Link Skeleton */}
        <div className="h-4 w-48 bg-muted rounded" />
      </div>
    </AuthLayout>
  );
}
