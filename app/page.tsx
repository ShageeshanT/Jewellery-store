import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { locales } from "@/lib/config/locales";

export default async function RootPage() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const locale =
    cookieLocale && locales.values.includes(cookieLocale)
      ? cookieLocale
      : locales.default;

  redirect(`/${locale}`);
}

