"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gem, Crown, Sparkles, Heart, Star, ArrowRight } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
  itemCount: number;
  badge?: string;
  isNew?: boolean;
}

export const FeaturedCollections: React.FC = () => {
  const collections: Collection[] = [
    {
      id: 1,
      name: "Engagement Rings",
      description: "Begin your forever with our stunning collection of engagement rings, featuring ethically sourced diamonds and precious metals.",
      image: "/api/placeholder/600/400",
      href: "/shop/category/rings?collection=engagement",
      itemCount: 156,
      badge: "Most Popular",
    },
    {
      id: 2,
      name: "Wedding Bands",
      description: "Symbolize your eternal love with our exquisite wedding bands, crafted to perfection in various styles and metals.",
      image: "/api/placeholder/600/400",
      href: "/shop/category/rings?collection=wedding",
      itemCount: 98,
    },
    {
      id: 3,
      name: "Luxury Necklaces",
      description: "Elegant necklaces that add sophistication to any occasion, from delicate chains to statement pendants.",
      image: "/api/placeholder/600/400",
      href: "/shop/category/necklaces",
      itemCount: 234,
      isNew: true,
    },
    {
      id: 4,
      name: "Vintage Timepieces",
      description: "Rare and exceptional vintage watches and timepieces from renowned manufacturers, each with its own story.",
      image: "/api/placeholder/600/400",
      href: "/collection/vintage",
      itemCount: 45,
      badge: "Limited Edition",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="luxury-badge mb-4">Featured Collections</Badge>
          <h2 className="luxury-heading-bold text-3xl md:text-5xl mb-4">
            Discover Our
            <span className="luxury-accent-text"> Exquisite Collections</span>
          </h2>
          <p className="luxury-text text-lg text-muted-foreground max-w-3xl mx-auto">
            From timeless classics to contemporary designs, each collection is carefully curated to celebrate
            the art of fine jewellery craftsmanship.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`group relative overflow-hidden rounded-2xl luxury-card hover:shadow-2xl transition-all duration-500 ${
                index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
              }`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden">
                {/* Placeholder image */}
                <div className="w-full h-full bg-gradient-to-br from-muted to-primary/10" />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 animate-float">
                  <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {index % 2 === 0 ? (
                      <Gem className="h-6 w-6 text-primary" />
                    ) : (
                      <Crown className="h-6 w-6 text-primary" />
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {collection.badge && (
                    <Badge className="luxury-badge bg-primary/90 text-primary-foreground">
                      {collection.badge}
                    </Badge>
                  )}
                  {collection.isNew && (
                    <Badge className="luxury-badge bg-accent text-accent-foreground">
                      New Arrival
                    </Badge>
                  )}
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.9</span>
                      <span className="text-sm opacity-75">({collection.itemCount} pieces)</span>
                    </div>
                    <h3 className="luxury-heading-bold text-2xl mb-2">
                      {collection.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="luxury-text text-muted-foreground mb-6">
                  {collection.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{collection.itemCount} pieces</span>
                    <span>•</span>
                    <span>Free shipping</span>
                  </div>

                  <Link href={collection.href}>
                    <Button
                      variant="outline"
                      className="luxury-button-secondary group/btn"
                    >
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h3 className="luxury-heading-bold text-2xl md:text-3xl mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="luxury-text text-muted-foreground mb-8">
              Our master craftsmen can create a bespoke piece that's uniquely yours.
              From initial design to final creation, we'll work closely with you to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/custom-design">
                <Button size="lg" className="luxury-button-primary group">
                  <Gem className="mr-2 h-4 w-4" />
                  Start Custom Design
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/book-appointment">
                <Button variant="outline" size="lg" className="luxury-button-secondary">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;