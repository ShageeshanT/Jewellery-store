export const publicRoutes = [
  // Auth Routes
  "/:locale/sign-in(.*)",
  "/sign-in(.*)",
  "/:locale/sign-up(.*)",
  "/sign-up(.*)",

  // Landing Page Routes
  "/:locale",
  "/",
  "/:locale/blog(.*)",
  "/blog(.*)",

  // Jewellery Store Guest Routes
  "/:locale/jewellery(.*)",
  "/jewellery(.*)",
  "/:locale/product(.*)",
  "/product(.*)",
  "/:locale/services(.*)",
  "/services(.*)",
  "/:locale/stores(.*)",
  "/stores(.*)",
  "/:locale/contact(.*)",
  "/contact(.*)",
  "/:locale/cart(.*)",
  "/cart(.*)",
  "/:locale/checkout(.*)",
  "/checkout(.*)",
  "/:locale/order-confirmation(.*)",
  "/order-confirmation(.*)",
  "/:locale/custom-design(.*)",
  "/custom-design(.*)",

  // Legal Routes
  "/terms(.*)",
  "/:locale/terms(.*)",
  "/privacy(.*)",
  "/:locale/privacy(.*)",

  // Public API Routes
  "/api/webhook(.*)",
  "/api/public(.*)",
  "/api/payments/lemonsqueezy/create-checkout(.*)",
];

// Admin routes that require admin role
export const adminRoutes = [
  "/:locale/admin(.*)",
  "/admin(.*)",
  "/api/admin(.*)",
];
