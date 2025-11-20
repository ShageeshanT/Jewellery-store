import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Roboto } from "next/font/google";

import "./globals.css";
import { locales } from "@/lib/config/locales";
import SEO_CONFIG from "@/lib/config/seo.config";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  ...SEO_CONFIG,
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value ?? "";
  const lang = locales.values.includes(cookieLocale)
    ? cookieLocale
    : locales.default;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
