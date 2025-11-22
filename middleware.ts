import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { publicRoutes, adminRoutes } from "@/lib/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configure i18n middleware
const intlMiddleware = createMiddleware(routing);

// Create matchers for public and admin routes
const isPublicRoute = createRouteMatcher(publicRoutes);
const isAdminRoute = createRouteMatcher(adminRoutes);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Skip intl middleware for API and TRPC routes
  if (
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname.startsWith("/trpc")
  ) {
    return NextResponse.next();
  }

  // Handle locale routing first - let next-intl handle the locale detection and redirect
  // The intlMiddleware will redirect paths like "/jewellery" to "/en/jewellery"
  // and "/" to "/en"
  const intlResponse = intlMiddleware(req);

  // If intlMiddleware returns a response (redirect or rewrite), return it
  if (intlResponse) {
    return intlResponse;
  }

  // Check if route is an admin route
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      // Redirect to sign-in if not authenticated
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Check if user has admin role
    const role = sessionClaims?.metadata?.role as string | undefined;

    if (role !== "admin") {
      // Redirect to home if not admin
      const locale = routing.defaultLocale;
      const homeUrl = new URL(`/${locale}`, req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (!isPublicRoute(req)) {
    await auth.protect(); // Protect private routes
  }

  return NextResponse.next();
});

// Define config for the middleware
export const config = {
  matcher: [
    // Match all pathnames except for:
    // - files with extensions (e.g., .svg, .png, .jpg, .css, .js)
    // - _next folder
    // - static folder
    "/((?!_next|static|.*\\..*).*)",
    // Include API and TRPC routes
    "/(api|trpc)(.*)",
  ],
};
