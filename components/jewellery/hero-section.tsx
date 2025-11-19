"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Play, Sparkles, Gem, Crown } from 'lucide-react';
import Image from 'next/image';

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Timeless Elegance",
      subtitle: "Discover Our New Collection",
      description: "Handcrafted with precision and passion, each piece tells a unique story of luxury and love.",
      cta: "Explore Collection",
      ctaLink: "/shop/new-arrivals",
      secondaryCta: "Watch Video",
      image: "/api/placeholder/1200/600",
      background: "bg-gradient-to-r from-primary/10 to-accent/10",
      badge: "New Collection"
    },
    {
      id: 2,
      title: "Bespoke Creations",
      subtitle: "Design Your Dream Jewellery",
      description: "Our master craftsmen will bring your vision to life with custom designs that reflect your unique style.",
      cta: "Start Designing",
      ctaLink: "/services/custom-design",
      secondaryCta: "Book Consultation",
      image: "/api/placeholder/1200/600",
      background: "bg-gradient-to-r from-accent/10 to-primary/10",
      badge: "Custom Service"
    },
    {
      id: 3,
      title: "Vintage Treasures",
      subtitle: "Historic Pieces, Timeless Beauty",
      description: "Explore our curated collection of vintage and antique jewellery, each with a rich history and exceptional craftsmanship.",
      cta: "View Vintage",
      ctaLink: "/collection/vintage",
      secondaryCta: "Learn More",
      image: "/api/placeholder/1200/600",
      background: "bg-gradient-to-r from-primary/20 to-muted/20",
      badge: "Exclusive"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-screen md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full bg-muted">
          {/* Placeholder for hero image - in production, use actual hero images */}
          <div className={`w-full h-full ${currentSlideData.background}`} />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Badge */}
            <Badge className="luxury-badge mb-6 animate-fade-in">
              {currentSlideData.badge}
            </Badge>

            {/* Title */}
            <h1 className="luxury-heading-bold text-4xl md:text-5xl lg:text-7xl text-foreground mb-6 animate-slide-up">
              {currentSlideData.title}
            </h1>

            {/* Subtitle */}
            <h2 className="luxury-subheading text-xl md:text-2xl text-primary mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {currentSlideData.subtitle}
            </h2>

            {/* Description */}
            <p className="luxury-text text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {currentSlideData.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link href={currentSlideData.ctaLink}>
                <Button size="lg" className="luxury-button-primary group">
                  {currentSlideData.cta}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="luxury-button-secondary group">
                <Play className="mr-2 h-4 w-4" />
                {currentSlideData.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-1 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-primary w-16'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronRight className="h-6 w-6 rotate-180" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 animate-float">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
          <Gem className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
          <Crown className="h-6 w-6 text-accent" />
        </div>
      </div>
      <div className="absolute top-1/2 right-32 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;