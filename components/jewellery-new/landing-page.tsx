"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Gem,
  Crown,
  Sparkles,
  Star,
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronRight,
  Play,
  Phone,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Pinterest,
  ChevronLeft,
  ChevronDown
} from 'lucide-react';

export const JewelleryLandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const heroSlides = [
    {
      id: 1,
      title: "Timeless Elegance",
      subtitle: "Handcrafted Luxury Since 1975",
      description: "Discover our exquisite collection of fine jewellery, where every piece tells a story of love and craftsmanship.",
      image: "/api/placeholder/1200/600",
      cta: "Explore Collection"
    },
    {
      id: 2,
      title: "Custom Designs",
      subtitle: "Your Vision, Our Creation",
      description: "Our master craftsmen will bring your unique vision to life with bespoke jewellery tailored to your style.",
      image: "/api/placeholder/1200/600",
      cta: "Start Designing"
    },
    {
      id: 3,
      title: "Vintage Treasures",
      subtitle: "Historic Beauty, Modern Appeal",
      description: "Rare vintage pieces that carry the elegance and craftsmanship of bygone eras.",
      image: "/api/placeholder/1200/600",
      cta: "Discover Vintage"
    }
  ];

  const categories = [
    {
      id: 'engagement',
      name: 'Engagement Rings',
      icon: Gem,
      color: 'from-rose-400 to-rose-600',
      itemCount: 156,
      description: 'Begin your forever story'
    },
    {
      id: 'wedding',
      name: 'Wedding Bands',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      itemCount: 98,
      description: 'Symbol of eternal love'
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      icon: Sparkles,
      color: 'from-purple-400 to-purple-600',
      itemCount: 234,
      description: 'Elegance around your neck'
    },
    {
      id: 'earrings',
      name: 'Earrings',
      icon: Star,
      color: 'from-blue-400 to-blue-600',
      itemCount: 189,
      description: 'Frame your beauty'
    },
    {
      id: 'bracelets',
      name: 'Bracelets',
      icon: Gem,
      color: 'from-green-400 to-green-600',
      itemCount: 78,
      description: 'Wrist-worthy elegance'
    },
    {
      id: 'watches',
      name: 'Watches',
      icon: Clock,
      color: 'from-gray-600 to-gray-800',
      itemCount: 45,
      description: 'Timeless timepieces'
    }
  ];

  const featuredProducts = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Luxury ${['Diamond Solitaire', 'Pearl Strand', 'Emerald Cut', 'Sapphire Halo', 'Ruby Cluster', 'Platinum Tennis'][i]}`,
    price: [8500, 4200, 12000, 7800, 6500, 15000][i],
    salePrice: i % 2 === 0 ? [6800, 3360, 9600, 6240, 5200, 12000][i] : undefined,
    category: ['rings', 'necklaces', 'rings', 'rings', 'necklaces', 'bracelets'][i],
    image: "/api/placeholder/400/400",
    isFeatured: true,
    isNew: i < 2
  }));

  const testimonials = [
    {
      id: 1,
      name: "Isabella Martinez",
      rating: 5,
      title: "Absolutely Perfect",
      content: "My engagement ring exceeded all expectations. The craftsmanship is exceptional and the customer service was outstanding.",
      location: "Beverly Hills, CA"
    },
    {
      id: 2,
      name: "William Chen",
      rating: 5,
      title: "Master Craftsmanship",
      content: "They restored my grandmother's vintage necklace to its original glory. The attention to detail was remarkable.",
      location: "New York, NY"
    },
    {
      id: 3,
      name: "Sophia Thompson",
      rating: 5,
      title: "Dream Wedding Set",
      content: "Created the perfect wedding band set to match my engagement ring. The design process was collaborative and beautiful.",
      location: "San Francisco, CA"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-jewellery-marble">
      {/* Navigation */}
      <nav className="jewellery-nav px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-jewellery-gold rounded-full flex items-center justify-center animate-jewellery-glow">
                <Gem className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-jewellery-gold-shimmer rounded-full animate-jewellery-sparkle"></div>
            </div>
            <div>
              <h1 className="jewellery-title-bold text-2xl">LUXARIA</h1>
              <p className="text-xs text-gray-600">Fine Jewellery</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="#collections" className="jewellery-nav-link">Collections</Link>
            <Link href="#engagement" className="jewellery-nav-link">Engagement</Link>
            <Link href="#wedding" className="jewellery-nav-link">Wedding</Link>
            <Link href="#custom" className="jewellery-nav-link">Custom Design</Link>
            <Link href="#vintage" className="jewellery-nav-link">Vintage</Link>
            <Link href="#about" className="jewellery-nav-link">About</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-jewellery-gold transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-jewellery-gold transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-jewellery-gold transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-jewellery-ruby rounded-full"></span>
            </button>
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-jewellery-gold/20 mt-4 py-6">
            <div className="flex flex-col space-y-4">
              <Link href="#collections" className="jewellery-nav-link">Collections</Link>
              <Link href="#engagement" className="jewellery-nav-link">Engagement</Link>
              <Link href="#wedding" className="jewellery-nav-link">Wedding</Link>
              <Link href="#custom" className="jewellery-nav-link">Custom Design</Link>
              <Link href="#vintage" className="jewellery-nav-link">Vintage</Link>
              <Link href="#about" className="jewellery-nav-link">About</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Sparkles */}
        <div className="absolute inset-0 bg-gradient-to-br from-jewellery-silk to-white">
          <div className="jewellery-sparkles">
            <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
            <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '60%', left: '80%', animationDelay: '0.5s' }}></div>
            <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '30%', left: '60%', animationDelay: '1s' }}></div>
            <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '70%', left: '30%', animationDelay: '1.5s' }}></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Badge className="jewellery-badge mb-6">Since 1975</Badge>
          <h1 className="jewellery-title-bold text-5xl md:text-7xl mb-6">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="jewellery-subtitle text-xl md:text-2xl mb-4 text-jewellery-gold">
            {heroSlides[currentSlide].subtitle}
          </p>
          <p className="jewellery-text text-lg mb-8 max-w-2xl mx-auto text-gray-600">
            {heroSlides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-jewellery-primary">
              {heroSlides[currentSlide].cta}
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="btn-jewellery-secondary flex items-center">
              <Play className="mr-2 h-5 w-5" />
              Watch Video
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-full transition-all ${
                currentSlide === index
                  ? 'bg-jewellery-gold w-16'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section id="collections" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="jewellery-badge">Our Collections</Badge>
            <h2 className="jewellery-title-bold text-4xl md:text-6xl mb-6">
              Discover
              <span className="text-jewellery-gold"> Excellence</span>
            </h2>
            <p className="jewellery-text text-lg text-gray-600 max-w-3xl mx-auto">
              Each piece in our collection is crafted with meticulous attention to detail,
              using only the finest materials and gemstones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="jewellery-card group cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="relative overflow-hidden">
                    <div className={`h-64 bg-gradient-to-br ${category.color} opacity-10`}>
                      <div className="flex items-center justify-center h-full">
                        <Icon className="h-16 w-16 text-white opacity-20 group-hover:opacity-30 transition-opacity" />
                      </div>
                    </div>
                    <div className="jewellery-sparkle absolute top-4 right-4">
                      <div className="w-2 h-2 bg-jewellery-gold-shimmer rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="jewellery-title text-xl mb-2">{category.name}</h3>
                    <p className="jewellery-text text-sm text-gray-600 mb-4">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{category.itemCount} pieces</span>
                      <ChevronRight className="h-5 w-5 text-jewellery-gold group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="jewellery-badge">Featured Pieces</Badge>
            <h2 className="jewellery-title-bold text-4xl md:text-6xl mb-6">
              Curated
              <span className="text-jewellery-gold"> Selection</span>
            </h2>
            <p className="jewellery-text text-lg text-gray-600 max-w-3xl mx-auto">
              Handpicked masterpieces that showcase the pinnacle of jewellery craftsmanship
              and design excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="jewellery-card group">
                <div className="relative">
                  <div className="jewellery-image-container h-80">
                    <div className="jewellery-image-shimmer"></div>
                    <div className="flex items-center justify-center h-full">
                      <Gem className="h-16 w-16 text-jewellery-gold/20" />
                    </div>
                  </div>
                  {product.isNew && (
                    <Badge className="jewellery-badge absolute top-4 left-4">
                      New
                    </Badge>
                  )}
                  {product.isFeatured && (
                    <Badge className="jewellery-badge absolute top-4 right-4">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="btn-jewellery-secondary text-xs px-3 py-1">
                      <Heart className="h-4 w-4 mr-1" />
                      Wishlist
                    </button>
                    <button className="btn-jewellery-secondary text-xs px-3 py-1">
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="jewellery-heading text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className={`jewellery-price ${product.salePrice ? 'jewellery-price-sale' : ''}`}>
                        ${product.salePrice || product.price.toLocaleString()}
                      </span>
                      {product.salePrice && (
                        <span className="jewellery-price-original ml-2">
                          ${product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-jewellery-gold text-jewellery-gold" />
                      <Star className="h-4 w-4 fill-jewellery-gold text-jewellery-gold" />
                      <Star className="h-4 w-4 fill-jewellery-gold text-jewellery-gold" />
                      <Star className="h-4 w-4 fill-jewellery-gold text-jewellery-gold" />
                      <Star className="h-4 w-4 fill-jewellery-gold text-jewellery-gold" />
                    </div>
                  </div>
                  <button className="btn-jewellery-primary w-full">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="btn-jewellery-primary">
              View All Collections
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-jewellery-silk">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="jewellery-badge">Customer Stories</Badge>
            <h2 className="jewellery-title-bold text-4xl md:text-6xl mb-6">
              Trusted by
              <span className="text-jewellery-gold"> Thousands</span>
            </h2>
            <p className="jewellery-text text-lg text-gray-600 max-w-3xl mx-auto">
              Real experiences from customers who have chosen us for their most precious moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-jewellery-gold text-jewellery-gold"
                    />
                  ))}
                </div>
                <h3 className="jewellery-title text-lg mb-3">{testimonial.title}</h3>
                <p className="jewellery-text text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="jewellery-heading font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-jewellery-velvet text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Gem className="h-16 w-16 mx-auto mb-8 text-jewellery-gold animate-jewellery-glow" />
          <h2 className="jewellery-title-bold text-4xl md:text-6xl mb-6">
            Ready to Find Your
            <span className="text-jewellery-gold"> Perfect Piece?</span>
          </h2>
          <p className="jewellery-text text-lg text-gray-300 mb-8">
            Schedule a consultation with our jewellery experts and let us help you find the perfect piece for your special occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-jewellery-primary bg-jewellery-gold text-jewellery-velvet hover:bg-jewellery-gold-dark">
              Book Consultation
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="btn-jewellery-secondary border-white text-white hover:bg-white hover:text-jewellery-velvet">
              View Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-jewellery-velvet text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="jewellery-title-bold text-xl mb-4">LUXARIA</h3>
              <p className="jewellery-text text-gray-400 mb-4">
                Fine jewellery crafted with passion and precision since 1975.
              </p>
              <div className="flex space-x-4">
                <Instagram className="h-5 w-5 text-jewellery-gold hover:text-jewellery-gold-light cursor-pointer" />
                <Facebook className="h-5 w-5 text-jewellery-gold hover:text-jewellery-gold-light cursor-pointer" />
                <Pinterest className="h-5 w-5 text-jewellery-gold hover:text-jewellery-gold-light cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="jewellery-subtitle mb-4">Collections</h4>
              <div className="space-y-2">
                <Link href="#" className="block jewellery-text text-gray-400 hover:text-jewellery-gold transition-colors">Engagement Rings</Link>
                <Link href="#" className="block jewellery-text text-gray-400 hover:text-jewellery-gold transition-colors">Wedding Bands</Link>
                <Link href="#" className="block jewellery-text text-gray-400 hover:text-jewellery-gold transition-colors">Necklaces</Link>
                <Link href="#" className="block jewellery-text text-gray-400 hover:text-jewellery-gold transition-colors">Earrings</Link>
              </div>
            </div>

            <div>
              <h4 className="jewellery-subtitle mb-4">Services</h4>
              <div className="space-y-2">
                <Link href="#" className="block jewellery-text text-gray-400 hover:text-jewellery-gold transition-colors">Custom Design</Link>
                <Link href="#" className="block jewellery-text text-gray-400 hover:text-jewellery-gold transition-colors">Repairs & Restoration</Link>
                <Link href="#" className="block jewellery-text text-gray-400 hover:text-jewellery-gold transition-colors">Appraisal</Link>
                <Link href="#" className="block jewellery-text text-gray-400 hover:text-jewellery-gold transition-colors">Cleaning</Link>
              </div>
            </div>

            <div>
              <h4 className="jewellery-subtitle mb-4">Contact</h4>
              <div className="space-y-2 jewellery-text text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-jewellery-gold" />
                  <span>1-800-JEWELRY</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-jewellery-gold" />
                  <span>hello@luxuria.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-jewellery-gold" />
                  <span>Rodeo Drive, Beverly Hills</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="jewellery-text text-gray-400">
              © 2024 Luxuria Fine Jewellery. All rights reserved. Member of American Gem Society.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JewelleryLandingPage;