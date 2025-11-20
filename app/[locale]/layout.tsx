import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwindIndicator";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/scroll-top";
import Script from "next/script";

async function getMessages(locale: string) {
  try {
    return (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Missing translation file for locale: ${locale}, falling back to 'en'.`);
    }
    try {
      return (await import(`@/locales/en.json`)).default;
    } catch (fallbackError) {
      if (process.env.NODE_ENV === "development") {
        console.error("Missing fallback 'en' translation file.");
      }
      return {};
    }
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const messages = await getMessages(resolvedParams.locale);

  return (
    <ClerkProvider>
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
      <NextIntlClientProvider
        locale={resolvedParams.locale}
        messages={messages}
      >
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
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
