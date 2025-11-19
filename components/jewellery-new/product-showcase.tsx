"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Gem,
  Crown,
  Sparkles,
  Star,
  Heart,
  ShoppingBag,
  Expand,
  Play,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Eye,
  Shield,
  Award,
  Info
} from 'lucide-react';

interface ProductShowcaseProps {
  product: {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    images: string[];
    category: string;
    materials: string[];
    gemstone?: string;
    carat?: number;
    dimensions?: string;
    weight?: string;
    description: string;
    features: string[];
    certification?: string;
    isNew?: boolean;
    isLimited?: boolean;
  };
  className?: string;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  product,
  className = ''
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentPrice = product.salePrice || product.price;
  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden group ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-jewellery-gold/10 to-jewellery-silk p-6 border-b border-jewellery-gold/20">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="jewellery-badge mb-3">
              {product.category}
            </Badge>
            <h2 className="jewellery-title-bold text-3xl mb-2">{product.name}</h2>
            <p className="jewellery-text text-gray-600 max-w-2xl">
              {product.description}
            </p>
          </div>
          <div className="flex gap-3">
            {product.isNew && (
              <Badge className="jewellery-badge bg-jewellery-emerald">
                New Arrival
              </Badge>
            )}
            {product.isLimited && (
              <Badge className="jewellery-badge bg-jewellery-ruby">
                Limited Edition
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="jewellery-badge bg-jewellery-ruby">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-96 bg-jewellery-silk overflow-hidden">
          <div className="jewellery-image-container w-full h-full flex items-center justify-center">
            <Gem className="h-32 w-32 text-jewellery-gold/20" />
          </div>

          {/* Image Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white">
              <div className="flex gap-3">
                <button
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <Expand className="h-5 w-5" />
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-jewellery-ruby' : ''}`} />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sparkle Effects */}
          <div className="jewellery-sparkles">
            <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '20%', left: '10%' }}></div>
            <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '70%', left: '80%', animationDelay: '0.5s' }}></div>
            <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '40%', left: '50%', animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {product.images.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-lg border-2 transition-all ${
                  currentImageIndex === index
                    ? 'border-jewellery-gold bg-jewellery-silk'
                    : 'border-gray-200 hover:border-jewellery-gold/50'
                }`}
              >
                <div className="w-full h-full bg-jewellery-silk rounded flex items-center justify-center">
                  <Gem className="h-6 w-6 text-jewellery-gold/30" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 space-y-6">
        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="jewellery-price text-3xl">
                ${currentPrice.toLocaleString()}
              </span>
              {product.salePrice && (
                <span className="jewellery-price-original text-xl">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>
            <p className="jewellery-text text-sm text-gray-500 mt-1">
              Free shipping & lifetime warranty
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-jewellery-gold text-jewellery-gold"
              />
            ))}
            <span className="jewellery-text text-sm text-gray-500 ml-2">
              (5.0) • 127 reviews
            </span>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="jewellery-subtitle mb-4">Specifications</h3>
            <div className="space-y-3">
              {product.gemstone && (
                <div className="flex items-center gap-3">
                  <Gem className="h-5 w-5 text-jewellery-gold" />
                  <div>
                    <p className="jewellery-text text-sm font-medium">Gemstone</p>
                    <p className="jewellery-text text-sm text-gray-600">{product.gemstone}</p>
                  </div>
                </div>
              )}
              {product.carat && (
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-jewellery-gold" />
                  <div>
                    <p className="jewellery-text text-sm font-medium">Carat Weight</p>
                    <p className="jewellery-text text-sm text-gray-600">{product.carat} carats</p>
                  </div>
                </div>
              )}
              {product.materials && (
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-jewellery-gold" />
                  <div>
                    <p className="jewellery-text text-sm font-medium">Materials</p>
                    <p className="jewellery-text text-sm text-gray-600">
                      {product.materials.join(', ')}
                    </p>
                  </div>
                </div>
              )}
              {product.weight && (
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-jewellery-gold" />
                  <div>
                    <p className="jewellery-text text-sm font-medium">Weight</p>
                    <p className="jewellery-text text-sm text-gray-600">{product.weight}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="jewellery-subtitle mb-4">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-jewellery-gold rounded-full"></div>
                  <span className="jewellery-text text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certification */}
        {product.certification && (
          <div className="bg-jewellery-silk p-4 rounded-lg border border-jewellery-gold/20">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-jewellery-gold" />
              <div>
                <p className="jewellery-text text-sm font-medium">
                  Certified by {product.certification}
                </p>
                <p className="jewellery-text text-xs text-gray-600">
                  Authenticity and quality guaranteed
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-jewellery-silk px-3 py-2 rounded-lg">
            <Shield className="h-4 w-4 text-jewellery-gold" />
            <span className="jewellery-text text-xs">Lifetime Warranty</span>
          </div>
          <div className="flex items-center gap-2 bg-jewellery-silk px-3 py-2 rounded-lg">
            <Award className="h-4 w-4 text-jewellery-gold" />
            <span className="jewellery-text text-xs">GIA Certified</span>
          </div>
          <div className="flex items-center gap-2 bg-jewellery-silk px-3 py-2 rounded-lg">
            <Gem className="h-4 w-4 text-jewellery-gold" />
            <span className="jewellery-text text-xs">Ethically Sourced</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-jewellery-gold/20">
          <button className="flex-1 btn-jewellery-primary">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
          <button className="btn-jewellery-secondary">
            <Heart className="h-5 w-5 mr-2" />
            Wishlist
          </button>
          <button className="btn-jewellery-secondary">
            <Eye className="h-5 w-5 mr-2" />
            Try On
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;