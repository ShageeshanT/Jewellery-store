"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/cart-utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  images: Array<{ url: string; altText: string; isPrimary: boolean }>;
  category: string;
  categoryName?: string;
  sku: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isOutOfStock?: boolean;
  isLowStock?: boolean;
  rating?: number;
  reviewCount?: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  showQuickActions?: boolean;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  showQuickActions = true,
  onQuickView
}) => {
  const { addItem, isItemInCart, getItemQuantity } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Get primary image or first image
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const currentPrice = product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;
  const discountPercentage = calculateDiscountPercentage(product.price, currentPrice);
  const isInCart = isItemInCart(product._id);
  const cartQuantity = getItemQuantity(product._id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.isOutOfStock) return;

    setIsAddingToCart(true);
    try {
      await addItem({
        id: product._id,
        productId: product._id,
        product: {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          salePrice: product.salePrice,
          images: product.images,
          category: product.category,
          sku: product.sku
        },
        quantity: 1
      }, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    // TODO: Implement favorite functionality
  };

  return (
    <div className={`luxury-product-card group relative ${className}`}>
      {/* Product Image */}
      <Link href={`/shop/product/${product.slug}`} className="block">
        <div className="luxury-product-image relative aspect-square overflow-hidden rounded-lg">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText || product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

          {/* Status badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="luxury-badge bg-primary/90 text-primary-foreground">
                New
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="luxury-badge bg-primary/90 text-primary-foreground">
                Featured
              </Badge>
            )}
            {product.isOutOfStock && (
              <Badge className="luxury-badge bg-red-500 text-white">
                Out of Stock
              </Badge>
            )}
            {product.isLowStock && !product.isOutOfStock && (
              <Badge className="luxury-badge bg-yellow-500 text-white">
                Low Stock
              </Badge>
            )}
          </div>

          {/* Discount badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2">
              <Badge className="luxury-badge bg-red-500 text-white">
                -{discountPercentage}%
              </Badge>
            </div>
          )}

          {/* Quick actions */}
          {showQuickActions && (
            <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700 rounded-full"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700 rounded-full"
                onClick={handleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          )}

          {/* Cart status indicator */}
          {isInCart && (
            <div className="absolute bottom-2 left-2">
              <Badge className="luxury-badge bg-primary text-primary-foreground">
                {cartQuantity} in cart
              </Badge>
            </div>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="mt-4 space-y-2">
        {/* Category and Rating */}
        <div className="flex items-center justify-between">
          <span className="luxury-subheading text-xs">
            {product.categoryName || product.category}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">
                {product.rating.toFixed(1)}
                {product.reviewCount && `(${product.reviewCount})`}
              </span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/shop/product/${product.slug}`} className="block">
          <h3 className="luxury-heading font-medium text-sm leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="luxury-price text-lg font-playfair">
            {formatCurrency(currentPrice)}
          </span>
          {discountPercentage > 0 && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        {/* SKU */}
        <div className="text-xs text-gray-500">
          SKU: {product.sku}
        </div>

        {/* Add to Cart Button */}
        <Button
          className={`luxury-button-primary w-full ${
            product.isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90'
          }`}
          size="sm"
          disabled={product.isOutOfStock || isAddingToCart}
          onClick={handleAddToCart}
        >
          {isAddingToCart ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </span>
          ) : product.isOutOfStock ? (
            'Out of Stock'
          ) : isInCart ? (
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Update Cart ({cartQuantity})
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;