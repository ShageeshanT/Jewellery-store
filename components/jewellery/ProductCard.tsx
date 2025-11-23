"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  mainImage: string;
  categoryName?: string;
  inStock?: boolean;
  featured?: boolean;
  className?: string;
}

export const ProductCard = memo(function ProductCard({
  id,
  name,
  slug,
  price,
  compareAtPrice,
  mainImage,
  categoryName,
  inStock = true,
  featured = false,
  className
}: ProductCardProps) {
  const { hasDiscount, discountPercentage } = useMemo(() => {
    const hasDiscount = compareAtPrice && compareAtPrice > price;
    const discountPercentage = hasDiscount
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : 0;
    return { hasDiscount, discountPercentage };
  }, [price, compareAtPrice]);

  return (
    <div className={cn("group relative", className)}>
      <Link href={`/product/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
          <Image
            src={mainImage || "/images/placeholder-product.jpg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {featured && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded">
                FEATURED
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
            {!inStock && (
              <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                OUT OF STOCK
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {categoryName && (
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              {categoryName}
            </p>
          )}
          <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              LKR {price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                LKR {compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick View Button (appears on hover) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/product/${slug}`;
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
});
