"use client";

import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  mainImage: string;
  categoryName?: string;
  inStock?: boolean;
  featured?: boolean;
}

interface ProductGridProps {
  products: Product[];
  className?: string;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  className,
  emptyMessage = "No products found"
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
