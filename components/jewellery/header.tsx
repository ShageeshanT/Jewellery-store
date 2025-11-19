"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  User,
  Heart,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Gem,
  Crown,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import { CartSidebar } from '@/components/shop/cart-sidebar';

export const JewelleryHeader: React.FC = () => {
  const { state: cartState } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Navigation categories
  const jewelleryCategories = [
    { name: 'Rings', slug: 'rings', icon: Gem },
    { name: 'Necklaces', slug: 'necklaces', icon: Sparkles },
    { name: 'Bracelets', slug: 'bracelets', icon: Crown },
    { name: 'Earrings', slug: 'earrings', icon: Gem },
    { name: 'Watches', slug: 'watches', icon: Clock },
    { name: 'Accessories', slug: 'accessories', icon: Sparkles },
  ];

  const collections = [
    { name: 'Engagement', slug: 'engagement' },
    { name: 'Wedding', slug: 'wedding' },
    { name: 'Fine Jewellery', slug: 'fine-jewellery' },
    { name: 'Vintage', slug: 'vintage' },
    { name: 'Custom Design', slug: 'custom-design' },
  ];

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Bar - Contact Info */}
      <div className="bg-primary text-primary-foreground text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1-800-JEWELRY</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Visit Our Boutique</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Mon-Sat: 10AM-7PM</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/services/repair" className="hover:opacity-80 transition-opacity">
                Repair Services
              </Link>
              <Link href="/services/custom-design" className="hover:opacity-80 transition-opacity">
                Custom Design
              </Link>
              <Link href="/book-appointment" className="hover:opacity-80 transition-opacity">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`bg-background border-b border-border transition-all duration-300 ${
          isScrolled ? 'shadow-lg py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Gem className="h-6 w-6 text-primary-foreground" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="luxury-heading-bold text-2xl text-primary">
                  Luxuria
                </h1>
                <p className="text-xs text-muted-foreground">Fine Jewellery</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`luxury-subheading uppercase tracking-wide text-sm ${
                      pathname.startsWith('/shop') ? 'text-primary' : 'text-foreground'
                    } hover:text-primary transition-colors`}
                  >
                    Shop
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {jewelleryCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <DropdownMenuItem key={category.slug} asChild>
                        <Link
                          href={`/shop/category/${category.slug}`}
                          className="flex items-center gap-3 py-3"
                        >
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Explore our {category.name.toLowerCase()} collection
                            </div>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Collections */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`luxury-subheading uppercase tracking-wide text-sm ${
                      pathname.startsWith('/collection') ? 'text-primary' : 'text-foreground'
                    } hover:text-primary transition-colors`}
                  >
                    Collections
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {collections.map((collection) => (
                    <DropdownMenuItem key={collection.slug} asChild>
                      <Link href={`/collection/${collection.slug}`}>
                        {collection.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Direct Links */}
              <Link
                href="/shop/new-arrivals"
                className={`luxury-subheading uppercase tracking-wide text-sm ${
                  isActiveLink('/shop/new-arrivals') ? 'text-primary' : 'text-foreground'
                } hover:text-primary transition-colors`}
              >
                New Arrivals
              </Link>

              <Link
                href="/shop/featured"
                className={`luxury-subheading uppercase tracking-wide text-sm ${
                  isActiveLink('/shop/featured') ? 'text-primary' : 'text-foreground'
                } hover:text-primary transition-colors`}
              >
                Featured
              </Link>

              <Link
                href="/services"
                className={`luxury-subheading uppercase tracking-wide text-sm ${
                  isActiveLink('/services') ? 'text-primary' : 'text-foreground'
                } hover:text-primary transition-colors`}
              >
                Services
              </Link>

              <Link
                href="/about"
                className={`luxury-subheading uppercase tracking-wide text-sm ${
                  isActiveLink('/about') ? 'text-primary' : 'text-foreground'
                } hover:text-primary transition-colors`}
              >
                About
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <CartSidebar>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartState.itemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartState.itemCount}
                    </Badge>
                  )}
                </Button>
              </CartSidebar>

              {/* User Account */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/service-requests">Service Requests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/sign-in">Sign In</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Categories */}
              <div className="space-y-3">
                <h3 className="luxury-subheading uppercase tracking-wide text-primary">
                  Shop by Category
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {jewelleryCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.slug}
                        href={`/shop/category/${category.slug}`}
                        className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Collections */}
              <div className="space-y-3">
                <h3 className="luxury-subheading uppercase tracking-wide text-primary">
                  Collections
                </h3>
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <Link
                      key={collection.slug}
                      href={`/collection/${collection.slug}`}
                      className="block py-2 text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Links */}
              <div className="space-y-2">
                <Link
                  href="/shop/new-arrivals"
                  className="block py-2 text-sm hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link
                  href="/shop/featured"
                  className="block py-2 text-sm hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Featured
                </Link>
                <Link
                  href="/services"
                  className="block py-2 text-sm hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/about"
                  className="block py-2 text-sm hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>1-800-JEWELRY</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Visit Our Boutique</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Mon-Sat: 10AM-7PM</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default JewelleryHeader;