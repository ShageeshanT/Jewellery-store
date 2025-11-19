"use client";

import React from 'react';
import HeroSection from './hero-section';
import FeaturedCollections from './featured-collections';
import TestimonialsSection from './testimonials';
import ProductGrid from '@/components/shop/product-grid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Gem, Crown, Sparkles, Shield, Truck, Award, Heart, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const JewelleryHomepage: React.FC = () => {
  // Placeholder products data - in production, this would come from API
  const featuredProducts = Array.from({ length: 8 }, (_, i) => ({
    _id: `product-${i + 1}`,
    name: `Luxury ${['Diamond Ring', 'Pearl Necklace', 'Gold Bracelet', 'Emerald Earrings', 'Sapphire Pendant', 'Platinum Watch', 'Ruby Ring', 'Diamond Tennis Bracelet'][i]}`,
    slug: `luxury-${['diamond-ring', 'pearl-necklace', 'gold-bracelet', 'emerald-earrings', 'sapphire-pendant', 'platinum-watch', 'ruby-ring', 'diamond-tennis-bracelet'][i]}`,
    price: [2500, 1200, 1800, 3200, 2800, 8500, 4200, 5500][i],
    salePrice: i % 3 === 0 ? [2000, 960, 1440, 2560, 2240, 6800, 3360, 4400][i] : undefined,
    images: [
      {
        url: `/api/placeholder/400/400`,
        altText: `Luxury ${['Diamond Ring', 'Pearl Necklace', 'Gold Bracelet', 'Emerald Earrings'][i]}`,
        isPrimary: true
      }
    ],
    category: ['rings', 'necklaces', 'bracelets', 'earrings'][i % 4],
    sku: `LUX-${String(i + 1).padStart(4, '0')}`,
    isNew: i < 3,
    isFeatured: i >= 3,
    isOutOfStock: false,
    isLowStock: i === 2,
    rating: 4.5 + (i % 5) * 0.1,
    reviewCount: 15 + i * 3
  }));

  const categories = [
    { slug: 'rings', name: 'Rings', productCount: 156 },
    { slug: 'necklaces', name: 'Necklaces', productCount: 234 },
    { slug: 'earrings', name: 'Earrings', productCount: 189 },
    { slug: 'bracelets', name: 'Bracelets', productCount: 98 },
    { slug: 'watches', name: 'Watches', productCount: 67 },
    { slug: 'accessories', name: 'Accessories', productCount: 45 }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Lifetime Warranty",
      description: "All our jewellery comes with a lifetime craftsmanship warranty"
    },
    {
      icon: Truck,
      title: "Free Insured Shipping",
      description: "Complimentary secure shipping on orders over $500"
    },
    {
      icon: Award,
      title: "Certified Authentic",
      description: "GIA certified diamonds and ethically sourced materials"
    },
    {
      icon: Heart,
      title: "Expert Craftsmanship",
      description: "50+ years of master jeweller experience"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Bar */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-primary-foreground/80">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge className="luxury-badge mb-4">Featured Products</Badge>
            <h2 className="luxury-heading-bold text-3xl md:text-5xl mb-4">
              Discover Our
              <span className="luxury-accent-text"> Curated Selection</span>
            </h2>
            <p className="luxury-text text-lg text-muted-foreground max-w-3xl mx-auto">
              Handpicked pieces that showcase the finest in jewellery design and craftsmanship,
              perfect for any occasion or celebration.
            </p>
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={featuredProducts}
            categories={categories}
            onQuickView={(product) => console.log('Quick view:', product)}
            className="mb-12"
          />

          {/* View All Products */}
          <div className="text-center">
            <Link href="/shop">
              <Button size="lg" className="luxury-button-primary group">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="luxury-badge mb-4">Our Process</Badge>
            <h2 className="luxury-heading-bold text-3xl md:text-5xl mb-4">
              Crafted with
              <span className="luxury-accent-text"> Precision & Passion</span>
            </h2>
            <p className="luxury-text text-lg text-muted-foreground max-w-3xl mx-auto">
              From concept to creation, every piece of jewellery goes through our meticulous
              process to ensure exceptional quality and beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Design",
                description: "Our designers create detailed sketches and 3D renderings of your jewellery piece",
                icon: Gem
              },
              {
                number: "02",
                title: "Craftsmanship",
                description: "Master jewellers handcraft each piece using traditional techniques and modern technology",
                icon: Crown
              },
              {
                number: "03",
                title: "Quality Control",
                description: "Rigorous inspection ensures every piece meets our exacting standards",
                icon: Shield
              },
              {
                number: "04",
                title: "Presentation",
                description: "Each piece is beautifully packaged and presented with documentation and care instructions",
                icon: Sparkles
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto border-2 border-primary shadow-lg group-hover:scale-105 transition-transform">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="luxury-heading text-lg mb-3">{step.title}</h3>
                  <p className="luxury-text text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-6" />
          <h2 className="luxury-heading-bold text-3xl md:text-4xl mb-4">
            Stay Connected with Luxuria
          </h2>
          <p className="luxury-text text-lg mb-8 text-primary-foreground/90">
            Join our exclusive community for early access to new collections, private events,
            and personalized jewellery recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
            />
            <Button size="lg" className="bg-background text-primary hover:bg-background/90 font-playfair tracking-wide">
              Subscribe Now
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/70 mt-4">
            Join 50,000+ jewellery enthusiasts. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="luxury-heading-bold text-3xl md:text-4xl mb-4">
              Follow Our
              <span className="luxury-accent-text"> Instagram Journey</span>
            </h2>
            <p className="luxury-text text-lg text-muted-foreground">
              @luxuriafinejewellery
            </p>
          </div>

          {/* Instagram Grid Placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden group relative">
                <div className="w-full h-full bg-gradient-to-br from-muted to-primary/10" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="luxury-button-secondary">
              Follow Us on Instagram
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JewelleryHomepage;