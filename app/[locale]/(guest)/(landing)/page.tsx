import { Button } from "@/components/ui/button";
import { ReviewList } from "@/components/reviews/ReviewList";
import Link from "next/link";
import Image from "next/image";
import LiquidEther from "@/components/animations/LiquidEther";
import LogoLoop from "@/components/animations/LogoLoop";
import { Gem, Sparkles, Crown, Diamond } from "lucide-react";

export default function LandingPage() {
  const productLogos = [
    { node: <div className="flex items-center gap-2"><Gem className="w-8 h-8 text-amber-600" /><span className="text-sm font-medium">Rings</span></div>, title: "Signature Rings", href: "/jewellery" },
    { node: <div className="flex items-center gap-2"><Diamond className="w-8 h-8 text-amber-600" /><span className="text-sm font-medium">Diamonds</span></div>, title: "Diamond Collection", href: "/jewellery" },
    { node: <div className="flex items-center gap-2"><Sparkles className="w-8 h-8 text-amber-600" /><span className="text-sm font-medium">Earrings</span></div>, title: "Elegant Earrings", href: "/jewellery" },
    { node: <div className="flex items-center gap-2"><Crown className="w-8 h-8 text-amber-600" /><span className="text-sm font-medium">Necklaces</span></div>, title: "Luxury Necklaces", href: "/jewellery" },
  ];

  return (
    <>
      {/* Hero Section - Luxury Split Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={['#FFD700', '#C0C0C0', '#DAA520', '#F5DEB3']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-1" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-10 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
              <div className="space-y-6">
                <p className="text-xs md:text-sm tracking-[0.4em] text-gray-500 font-light uppercase">
                  Timeless Elegance Since 1998
                </p>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-gray-900 leading-none">
                  Discover
                  <br />
                  <span className="font-serif italic font-normal bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    Brilliance
                  </span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg font-light">
                Explore our curated collection of handcrafted jewellery, where artistry meets sophistication in every exquisite detail.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/jewellery" className="group">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-10 py-7 text-sm tracking-wider bg-black hover:bg-gray-900 transition-all duration-500 transform group-hover:scale-105"
                  >
                    EXPLORE COLLECTION
                  </Button>
                </Link>
                <Link href="/custom-design" className="group">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto px-10 py-7 text-sm tracking-wider border-2 border-black hover:bg-black hover:text-white transition-all duration-500 transform group-hover:scale-105"
                  >
                    CUSTOM DESIGN
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-light text-gray-900">25+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Years</p>
                </div>
                <div>
                  <p className="text-3xl font-light text-gray-900">1000+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-light text-gray-900">100%</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Handcrafted</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[500px] md:h-[600px] lg:h-[750px] opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-200/30 to-rose-200/30 rounded-2xl blur-2xl" />
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/layered-necklace.jpg"
                  alt="Luxury Jewellery Collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - MUST HAVES */}
      <section className="py-28 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <p className="text-xs tracking-[0.4em] text-gray-500 font-light uppercase">
              Curated Selection
            </p>
            <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 tracking-tight">
              MUST HAVES
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
              Discover our most coveted pieces, meticulously crafted for timeless appeal
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                image: "/images/rings-ribbon.jpg",
                name: "Signature Rings",
                price: "FROM RS 77,900.00",
                link: "/jewellery"
              },
              {
                image: "/images/diamond-necklace-gold-cloth.jpg",
                name: "Diamond Collection",
                price: "FROM RS 115,400.00",
                link: "/jewellery"
              },
              {
                image: "/images/model-small-earrings.jpg",
                name: "Elegant Earrings",
                price: "FROM RS 57,700.00",
                link: "/jewellery"
              },
              {
                image: "/images/model-wire-hoop.jpg",
                name: "Designer Hoops",
                price: "FROM RS 83,900.00",
                link: "/jewellery"
              }
            ].map((product, index) => (
              <Link
                key={index}
                href={product.link}
                className="group block opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-5">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-sm">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-[0.15em] group-hover:text-amber-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 tracking-wider font-light">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/jewellery" className="group inline-block">
              <Button
                variant="outline"
                size="lg"
                className="px-16 py-7 text-sm tracking-[0.2em] border-2 border-black hover:bg-black hover:text-white transition-all duration-500 transform group-hover:scale-105"
              >
                EXPLORE ALL
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories Loop */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-gray-500 font-light uppercase mb-4">
              Explore Our Collections
            </p>
          </div>
          <div className="h-20">
            <LogoLoop
              logos={productLogos}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={80}
              hoverSpeed={20}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Product categories"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-28 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-amber-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <p className="text-xs tracking-[0.4em] text-gray-500 font-light uppercase">
              Excellence in Every Detail
            </p>
            <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 tracking-tight">
              OUR SERVICES
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "✦",
                title: "Custom Design",
                description: "Bring your vision to life with our bespoke jewellery design service",
                link: "/services"
              },
              {
                icon: "⚒",
                title: "Repairs & Services",
                description: "Expert repair, resizing, and maintenance for your precious pieces",
                link: "/services"
              },
              {
                icon: "◈",
                title: "Visit Our Stores",
                description: "Experience our collections in person at our exclusive locations",
                link: "/stores"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mx-auto mb-6 text-3xl transform hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium mb-4 tracking-wide">{service.title}</h3>
                <p className="text-gray-600 mb-6 font-light leading-relaxed">
                  {service.description}
                </p>
                <Link href={service.link}>
                  <Button variant="link" className="text-black hover:text-amber-600 transition-colors duration-300">
                    Learn More →
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-28 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <p className="text-xs tracking-[0.4em] text-gray-500 font-light uppercase">
              Testimonials
            </p>
            <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 tracking-tight">
              WHAT OUR CLIENTS SAY
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto" />
          </div>

          <ReviewList limit={6} featuredOnly={false} />

          <div className="text-center mt-12">
            <Link href="/services" className="group inline-block">
              <Button
                variant="outline"
                className="px-12 py-6 text-sm tracking-[0.2em] border-2 border-black hover:bg-black hover:text-white transition-all duration-500 transform group-hover:scale-105"
              >
                SHARE YOUR EXPERIENCE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight">
            Begin Your Journey
          </h2>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Let us help you create a piece that tells your unique story
          </p>
          <div className="pt-6">
            <Link href="/custom-design" className="group inline-block">
              <Button
                size="lg"
                variant="outline"
                className="px-16 py-7 text-sm tracking-[0.2em] border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 transform group-hover:scale-105"
              >
                START YOUR DESIGN
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
