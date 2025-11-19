import { Playfair_Display } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwindIndicator";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/scroll-top";
import Script from "next/script";
import SEO_CONFIG from "@/lib/config/seo.config";

const playfairDisplay = Playfair_Display({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-playfair-display"
});

export const metadata = {
  ...SEO_CONFIG,
};

async function getMessages(locale: string) {
  try {
    return (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Missing translation file for locale: ${locale}`);
    }
    return {};
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const messages = await getMessages(resolvedParams.locale);

  return (
    <ClerkProvider>
      <html lang={resolvedParams.locale} suppressHydrationWarning>
        <head>
          <meta name="robots" content="index, follow" />
          {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual Google Analytics ID */}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              />
              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
                }}
              />
            </>
          )}
        </head>
        <NextIntlClientProvider
          locale={resolvedParams.locale}
          messages={messages}
        >
          <body className={roboto.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <ScrollToTop />
              {children}
              <Toaster />
              {process.env.NODE_ENV === "development" && <TailwindIndicator />}
            </ThemeProvider>
          </body>
        </NextIntlClientProvider>
      </html>
    </ClerkProvider>
  );
}
