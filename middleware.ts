import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "@/lib/config/locales";
import { publicRoutes, adminRoutes } from "@/lib/routes";
import { NextResponse } from "next/server";

// Configure i18n middleware
const intlMiddleware = createMiddleware({
  locales: locales.values,
  defaultLocale: locales.default,
});

// Create matchers for public and admin routes
const isPublicRoute = createRouteMatcher(publicRoutes);
const isAdminRoute = createRouteMatcher(adminRoutes);

export default clerkMiddleware(async (auth, req) => {
  // Redirect "/" to default or user-selected locale
  if (req.nextUrl.pathname === "/") {
    const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
    const locale =
      cookieLocale && locales.values.includes(cookieLocale)
        ? cookieLocale
        : locales.default;

    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
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
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (!isPublicRoute(req)) {
    await auth.protect(); // Protect private routes
  }

  if (
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname.startsWith("/trpc")
  ) {
    return NextResponse.next();
  }

  const intlResponse = intlMiddleware(req);

  return intlResponse;
});

// Define config for the middleware
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
