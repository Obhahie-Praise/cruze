import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Routes that require authentication
const AUTH_REQUIRED_PATHS = ["/profile", "/checkout", "/support"];

// Routes that require ADMIN role
const ADMIN_ONLY_PATHS = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if path requires any protection
  const requiresAuth =
    AUTH_REQUIRED_PATHS.some((p) => pathname.startsWith(p)) ||
    ADMIN_ONLY_PATHS.some((p) => pathname.startsWith(p));

  if (!requiresAuth) {
    return NextResponse.next();
  }

  // Fetch session from Better Auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Not authenticated — redirect to sign-in
  if (!session) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Admin-only route protection
  const isAdminPath = ADMIN_ONLY_PATHS.some((p) => pathname.startsWith(p));
  if (isAdminPath && session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     * - public folder assets
     * - api routes (handled separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
