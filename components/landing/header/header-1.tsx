"use client";

import { useState, useEffect, useReducer, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import useSWR from "swr";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileMenu } from "@/components/landing/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { useAuth } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAppContext } from "@/context/app";
import AccountButton from "@/components/buttons/account-button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Jewellery", href: "/jewellery" },
  { title: "Services", href: "/services" },
  { title: "Stores", href: "/stores" },
  { title: "Contact", href: "/contact" },
];

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function Header1() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, toggleMenu] = useReducer((prev) => !prev, false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const scrollTicking = useRef(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("GuestHeader");

  const { setBilling, setUser } = useAppContext();
  const { isSignedIn, isLoaded } = useAuth();

  // Only fetch user data if signed in
  const { data, error } = useSWR(
    isSignedIn ? "/api/app" : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setBilling(data.billing);
      setUser(data.user);
    }
  }, [data, setBilling, setUser]);

  // Throttled scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTicking.current) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          scrollTicking.current = false;
        });
        scrollTicking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) toggleMenu(); // Only close if it's open
  }, [pathname]);

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search products
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(`/api/public/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
        const data = await response.json();
        setSearchResults(data.products || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Load cart count from localStorage
  useEffect(() => {
    const loadCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItemCount(cart.length);
    };

    loadCartCount();
    window.addEventListener("cartUpdated", loadCartCount);
    return () => window.removeEventListener("cartUpdated", loadCartCount);
  }, []);

  const scrollToSection = (id: string) => {
    if (!id.includes("#")) {
      router.push(id);
      return;
    }

    if (typeof window !== "undefined") {
      const element = document.getElementById(id.replace("#", ""));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-200",
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-screen-xl px-5 md:px-5 lg:px-10 2xl:px-0">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-6">
              {navItems.map(({ title, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-amber-600",
                    pathname === href ? "text-amber-600" : "text-muted-foreground"
                  )}
                >
                  {title}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search Bar - Desktop */}
              <div className="hidden md:block relative" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(true);
                    }}
                    onFocus={() => setShowSearchResults(true)}
                    className="pl-9 pr-8 w-64 transition-all focus:w-80"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b last:border-b-0"
                      >
                        {product.mainImage && (
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={product.mainImage}
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                              sizes="48px"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">
                            LKR {product.price.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Auth Buttons / Profile */}
              {isSignedIn ? (
                <AccountButton />
              ) : isLoaded ? (
                <>
                  <Link className="hidden md:flex" href="/sign-in">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link className="hidden md:flex" href="/sign-up">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              ) : null}

              {/* Mobile Menu Toggle */}
              <div className="flex lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle Menu"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            isOpen={isOpen}
            onClose={toggleMenu}
            navItems={navItems}
          />
        )}
      </AnimatePresence>
    </>
  );
}
