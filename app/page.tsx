import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Root page that redirects to the default locale
 * This handles requests to "/" and redirects to "/en"
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
