import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "@/lib/config/locales";
import { publicRoutes } from "@/lib/routes";
import { NextResponse } from "next/server";

// Configure i18n middleware
const intlMiddleware = createMiddleware({
  locales: locales.values,
  defaultLocale: locales.default,
});

// Create a matcher for public routes
const isPublicRoute = createRouteMatcher(publicRoutes);

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
