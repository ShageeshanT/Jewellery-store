"use client";

import React from 'react';
import Link from 'next/link';
import {
  Gem,
  Crown,
  Sparkles,
  Phone,
  MapPin,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
  Youtube,
  Shield,
  Truck,
  Award,
  Heart
} from 'lucide-react';
import Image from 'next/image';

export const JewelleryFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const jewelleryCategories = [
    { name: 'Engagement Rings', href: '/shop/category/rings?collection=engagement' },
    { name: 'Wedding Bands', href: '/shop/category/rings?collection=wedding' },
    { name: 'Necklaces', href: '/shop/category/necklaces' },
    { name: 'Earrings', href: '/shop/category/earrings' },
    { name: 'Bracelets', href: '/shop/category/bracelets' },
    { name: 'Watches', href: '/shop/category/watches' },
    { name: 'Vintage Pieces', href: '/collection/vintage' },
    { name: 'Custom Design', href: '/services/custom-design' },
  ];

  const services = [
    { name: 'Jewellery Repair', href: '/services/repair' },
    { name: 'Custom Design', href: '/services/custom-design' },
    { name: 'Appraisal Services', href: '/services/appraisal' },
    { name: 'Cleaning & Polishing', href: '/services/cleaning' },
    { name: 'Engraving', href: '/services/engraving' },
    { name: 'Insurance Documentation', href: '/services/insurance' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about/story' },
    { name: 'Meet Our Team', href: '/about/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press & Media', href: '/press' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Blog', href: '/blog' },
  ];

  const support = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Find a Store', href: '/stores' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Shipping & Returns', href: '/shipping-returns' },
    { name: 'Care Instructions', href: '/care-instructions' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Pinterest, href: '#', label: 'Pinterest' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* Newsletter Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 max-w-xl">
              <h2 className="luxury-heading-bold text-2xl mb-4">
                Stay Sparkling with Luxuria
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Be the first to know about new collections, exclusive offers, and personalised jewellery tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="px-6 py-3 bg-background text-primary rounded-md font-playfair tracking-wide hover:bg-background/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">10K+</div>
                <div className="text-sm text-primary-foreground/80">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-sm text-primary-foreground/80">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm text-primary-foreground/80">Satisfaction Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Gem className="h-5 w-5 text-primary-foreground" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary" />
              </div>
              <div>
                <h3 className="luxury-heading-bold text-xl text-primary">
                  Luxuria
                </h3>
                <p className="text-xs text-muted-foreground">Fine Jewellery</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Crafting timeless elegance since 1975. Each piece tells a story of love, luxury, and exceptional craftsmanship.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>1-800-JEWELRY</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@luxuria.com</span>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="luxury-subheading uppercase tracking-wide text-primary mb-6">
              Shop by Category
            </h4>
            <ul className="space-y-3">
              {jewelleryCategories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="luxury-subheading uppercase tracking-wide text-primary mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="luxury-subheading uppercase tracking-wide text-primary mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="luxury-subheading uppercase tracking-wide text-primary mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-border">
          <div className="flex items-center gap-3 text-center">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <div className="font-semibold text-sm">Authenticity Guaranteed</div>
              <div className="text-xs text-muted-foreground">100% Genuine Jewellery</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <div className="font-semibold text-sm">Free Insured Shipping</div>
              <div className="text-xs text-muted-foreground">On Orders Over $500</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center">
            <Award className="h-8 w-8 text-primary" />
            <div>
              <div className="font-semibold text-sm">Lifetime Warranty</div>
              <div className="text-xs text-muted-foreground">Craftsmanship Guarantee</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center">
            <Heart className="h-8 w-8 text-primary" />
            <div>
              <div className="font-semibold text-sm">30-Day Returns</div>
              <div className="text-xs text-muted-foreground">No Questions Asked</div>
            </div>
          </div>
        </div>

        {/* Social Links and Legal */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Follow Us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>We Accept:</span>
                <div className="flex gap-1">
                  {/* Payment Icons */}
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs">VISA</div>
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs">MC</div>
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs">AMEX</div>
                  <div className="w-8 h-5 bg-muted rounded flex items-center justify-center text-xs">PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Luxuria Fine Jewellery. All rights reserved. |
            <Link href="/terms" className="hover:text-primary transition-colors"> Terms</Link> |
            <Link href="/privacy" className="hover:text-primary transition-colors"> Privacy</Link> |
            <Link href="/cookies" className="hover:text-primary transition-colors"> Cookies</Link>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Member of American Gem Society (AGS) • Jewelers Vigilance Committee (JVC)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default JewelleryFooter;