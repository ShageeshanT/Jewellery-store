import { Button } from "@/components/ui/button";
import { routing } from "@/i18n/routing";

export default function NotFound() {
  const locale = routing.defaultLocale;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/20 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-extralight text-gray-900 mb-4">404</h1>
        <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 tracking-tight mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 font-light">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`/${locale}`}>
            <Button
              size="lg"
              className="px-10 py-7 text-sm tracking-wider bg-black hover:bg-gray-900 transition-all duration-500"
            >
              GO TO HOMEPAGE
            </Button>
          </a>
          <a href={`/${locale}/jewellery`}>
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-7 text-sm tracking-wider border-2 border-black hover:bg-black hover:text-white transition-all duration-500"
            >
              BROWSE COLLECTION
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
