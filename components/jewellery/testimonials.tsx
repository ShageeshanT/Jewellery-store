"use client";

import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  avatar: string;
  productPurchased?: string;
}

export const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Mitchell",
      location: "New York, NY",
      rating: 5,
      title: "Absolutely Stunning Engagement Ring",
      content: "From the moment I walked into Luxuria, I knew I was in expert hands. The team helped me find the perfect engagement ring that captured everything I envisioned. The craftsmanship is flawless and the diamond is breathtaking. My fiancée said yes instantly!",
      date: "2 weeks ago",
      verified: true,
      avatar: "/api/placeholder/60/60",
      productPurchased: "Round Diamond Solitaire Engagement Ring"
    },
    {
      id: 2,
      name: "David Chen",
      location: "San Francisco, CA",
      rating: 5,
      title: "Custom Wedding Band Exceeded Expectations",
      content: "I worked with Luxuria to design a custom wedding band to match my partner's engagement ring. The attention to detail and craftsmanship was extraordinary. They listened to every request and delivered beyond my expectations. The customer service was exceptional throughout.",
      date: "1 month ago",
      verified: true,
      avatar: "/api/placeholder/60/60",
      productPurchased: "Custom Platinum Wedding Band"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Los Angeles, CA",
      rating: 5,
      title: "Vintage Necklace Restoration Masterpiece",
      content: "I inherited my grandmother's vintage necklace that needed serious restoration. Luxuria's artisans brought it back to life with such care and expertise. They preserved the original character while making it wearable again. It's like carrying a piece of history.",
      date: "3 weeks ago",
      verified: true,
      avatar: "/api/placeholder/60/60",
      productPurchased: "Vintage Necklace Restoration"
    },
    {
      id: 4,
      name: "Michael Thompson",
      location: "Chicago, IL",
      rating: 5,
      title: "Anniversary Surprise Perfectly Executed",
      content: "For our 10th anniversary, I wanted something special. Luxuria created a custom pendant incorporating elements from our wedding. The design process was collaborative and the final piece brought tears to my wife's eyes. Worth every penny!",
      date: "2 months ago",
      verified: true,
      avatar: "/api/placeholder/60/60",
      productPurchased: "Custom Anniversary Pendant"
    },
    {
      id: 5,
      name: "Jessica Williams",
      location: "Boston, MA",
      rating: 5,
      title: "Exceptional Service and Quality",
      content: "I've been a loyal customer for years and Luxuria never disappoints. Whether it's regular maintenance or new purchases, their service is consistently outstanding. The staff is knowledgeable, patient, and genuinely cares about customer satisfaction.",
      date: "1 week ago",
      verified: true,
      avatar: "/api/placeholder/60/60",
      productPurchased: "Multiple Purchases & Services"
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setAutoPlay(false);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="luxury-badge mb-4">Customer Stories</Badge>
          <h2 className="luxury-heading-bold text-3xl md:text-5xl mb-4">
            What Our
            <span className="luxury-accent-text"> Customers Say</span>
          </h2>
          <p className="luxury-text text-lg text-muted-foreground max-w-3xl mx-auto">
            Real experiences from customers who have trusted us with their most precious moments.
            Each story reflects our commitment to excellence and customer satisfaction.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Quote className="h-8 w-8 text-primary" />
            </div>

            <div className="bg-background rounded-2xl shadow-xl p-8 md:p-12 border border-border">
              {/* Testimonial Content */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(currentTestimonialData.rating)}
                  {currentTestimonialData.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Purchase
                    </Badge>
                  )}
                </div>

                <h3 className="luxury-heading text-xl md:text-2xl mb-4">
                  {currentTestimonialData.title}
                </h3>

                <p className="luxury-text text-lg leading-relaxed text-muted-foreground">
                  "{currentTestimonialData.content}"
                </p>
              </div>

              {/* Customer Info */}
              <div className="flex items-center justify-between border-t border-border pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-playfair text-lg">
                      {currentTestimonialData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="luxury-heading font-medium">{currentTestimonialData.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonialData.location} • {currentTestimonialData.date}
                    </p>
                    {currentTestimonialData.productPurchased && (
                      <p className="text-xs text-primary mt-1">
                        Purchased: {currentTestimonialData.productPurchased}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentTestimonial === index
                  ? 'bg-primary w-8'
                  : 'bg-muted hover:bg-muted/70'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
            <div className="flex justify-center mt-1">
              {renderStars(5)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Years of Service</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="luxury-text text-muted-foreground mb-6">
            Join thousands of satisfied customers who have made Luxuria their trusted jeweller
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="luxury-button-primary">
              Read More Reviews
            </Button>
            <Button variant="outline" size="lg" className="luxury-button-secondary">
              Share Your Experience
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;