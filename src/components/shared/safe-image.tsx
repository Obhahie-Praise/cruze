"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * SafeImage — a drop-in wrapper around Next.js `<Image>` that gracefully
 * handles missing / empty / broken image sources.
 *
 * - If `src` is falsy, renders the `fallback` (defaults to a placeholder).
 * - Passes `unoptimized` by default so external URLs (UploadThing, etc.)
 *   are served without the Next.js image proxy (avoids domain-config errors).
 * - Accepts all standard Next.js Image props plus a few convenience ones.
 */
export function SafeImage({
  src,
  alt = "",
  fallback,
  fallbackClassName,
  className,
  fill,
  width,
  height,
  unoptimized = true,
  ...rest
}: {
  src?: string | null;
  alt?: string;
  fallback?: React.ReactNode;
  fallbackClassName?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  unoptimized?: boolean;
} & Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground text-xs",
          fallbackClassName
        )}
      >
        {fallback ?? "No image"}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      unoptimized={unoptimized}
      className={className}
      {...rest}
    />
  );
}
