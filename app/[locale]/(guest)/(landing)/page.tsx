import { Button } from "@/components/ui/button";
import { ReviewList } from "@/components/reviews/ReviewList";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0">
          <Image
            src="/images/layered-necklace.jpg"
            alt="Luxury Jewellery Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-6" style={{ letterSpacing: '0.3em' }}>
            <h2 className="text-sm md:text-base font-light">EXQUISITE CRAFTSMANSHIP</h2>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            TIMELESS ELEGANCE
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover our collection of handcrafted jewellery, where tradition meets modern design
          </p>
          <Link href="/custom-design">
            <Button size="lg" className="px-8 py-6 text-lg">
              DISCOVER
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">MUST HAVES</h2>
            <p className="text-gray-600">Our most coveted pieces</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group cursor-pointer">
              <Link href="/jewellery">
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
                  <Image
                    src="/images/rings-ribbon.jpg"
                    alt="Elegant Rings"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-center">Signature Rings</h3>
              </Link>
            </div>

            <div className="group cursor-pointer">
              <Link href="/jewellery">
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
                  <Image
                    src="/images/diamond-necklace-gold-cloth.jpg"
                    alt="Diamond Necklaces"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-center">Diamond Collection</h3>
              </Link>
            </div>

            <div className="group cursor-pointer">
              <Link href="/jewellery">
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
                  <Image
                    src="/images/model-small-earrings.jpg"
                    alt="Delicate Earrings"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-center">Elegant Earrings</h3>
              </Link>
            </div>

            <div className="group cursor-pointer">
              <Link href="/jewellery">
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
                  <Image
                    src="/images/model-wire-hoop.jpg"
                    alt="Modern Hoops"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-center">Designer Hoops</h3>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/jewellery">
              <Button variant="outline" size="lg">
                View All Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">OUR SERVICES</h2>
            <p className="text-gray-600">Excellence in every detail</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-2xl">
                ✦
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
              <p className="text-gray-600 mb-4">
                Bring your vision to life with our bespoke jewellery design service
              </p>
              <Link href="/custom-design">
                <Button variant="link">Learn More →</Button>
              </Link>
            </div>

            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-2xl">
                ⚒
              </div>
              <h3 className="text-xl font-semibold mb-2">Repairs & Services</h3>
              <p className="text-gray-600 mb-4">
                Expert repair, resizing, and maintenance for your precious pieces
              </p>
              <Link href="/jewellery-repairs">
                <Button variant="link">Learn More →</Button>
              </Link>
            </div>

            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-2xl">
                ◈
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Our Stores</h3>
              <p className="text-gray-600 mb-4">
                Experience our collections in person at our locations
              </p>
              <Link href="/stores">
                <Button variant="link">Find a Store →</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">WHAT OUR CUSTOMERS SAY</h2>
            <p className="text-gray-600">Real experiences from our valued clients</p>
          </div>

          <ReviewList limit={6} featuredOnly={false} />

          <div className="text-center mt-8">
            <Link href="/custom-design">
              <Button variant="outline">Share Your Experience</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
