"use client";

import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from './product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Filter,
  Search,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  Sparkles
} from 'lucide-react';

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

interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: string;
  featured?: boolean;
  isNew?: boolean;
  collections?: string[];
  tags?: string[];
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters?: FilterOptions;
  categories?: Array<{ slug: string; name: string; productCount?: number }>;
  onFilterChange?: (filters: FilterOptions) => void;
  onPageChange?: (page: number) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  pagination,
  filters = {},
  categories = [],
  onFilterChange,
  onPageChange,
  onQuickView,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  // Price range state
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || '',
    max: filters.maxPrice || ''
  });

  // Sync local filters with props
  useEffect(() => {
    setLocalFilters(filters);
    setPriceRange({
      min: filters.minPrice || '',
      max: filters.maxPrice || ''
    });
  }, [filters]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFilterChange) {
        onFilterChange({
          ...localFilters,
          minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
          maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, priceRange, localFilters, onFilterChange]);

  const handleFilterChange = useCallback((newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...localFilters, ...newFilters };
    setLocalFilters(updatedFilters);

    if (onFilterChange) {
      onFilterChange({
        ...updatedFilters,
        minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
        maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined
      });
    }
  }, [localFilters, priceRange.min, priceRange.max, onFilterChange]);

  const handleClearFilters = () => {
    setLocalFilters({});
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  const hasActiveFilters = Object.keys(localFilters).some(key =>
    localFilters[key as keyof FilterOptions] !== undefined &&
    localFilters[key as keyof FilterOptions] !== '' &&
    localFilters[key as keyof FilterOptions] !== false
  ) || priceRange.min || priceRange.max;

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="luxury-card">
          <CardContent className="p-4">
            <Skeleton className="aspect-square w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search jewellery..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 luxury-input"
          />
        </div>

        {/* View Mode and Filters */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <Select
            value={localFilters.sortBy || 'createdAt'}
            onValueChange={(value) => handleFilterChange({ sortBy: value })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
            </SelectContent>
          </Select>

          {/* Quick Filters */}
          <div className="flex gap-2">
            <Button
              variant={localFilters.featured ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange({ featured: !localFilters.featured })}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Featured
            </Button>
            <Button
              variant={localFilters.isNew ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange({ isNew: !localFilters.isNew })}
            >
              New
            </Button>
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center">
                •
              </Badge>
            )}
          </Button>

          {/* View Mode */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="luxury-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="luxury-heading text-lg">Filters</h3>
              <div className="flex gap-2">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearFilters}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear All
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="luxury-subheading text-sm font-medium mb-2 block">
                  Category
                </label>
                <Select
                  value={localFilters.category || ''}
                  onValueChange={(value) => handleFilterChange({ category: value || undefined })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                        {category.productCount && ` (${category.productCount})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="luxury-subheading text-sm font-medium mb-2 block">
                  Price Range
                </label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="luxury-input"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="luxury-input"
                  />
                </div>
              </div>

              {/* Sort Order */}
              <div>
                <label className="luxury-subheading text-sm font-medium mb-2 block">
                  Sort Order
                </label>
                <Select
                  value={localFilters.sortOrder || 'desc'}
                  onValueChange={(value) => handleFilterChange({ sortOrder: value as 'asc' | 'desc' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {localFilters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categories.find(c => c.slug === localFilters.category)?.name || localFilters.category}
              <button
                onClick={() => handleFilterChange({ category: undefined })}
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {priceRange.min && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Min: ${priceRange.min}
              <button
                onClick={() => setPriceRange(prev => ({ ...prev, min: '' }))}
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {priceRange.max && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Max: ${priceRange.max}
              <button
                onClick={() => setPriceRange(prev => ({ ...prev, max: '' }))}
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {localFilters.featured && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Featured
              <button
                onClick={() => handleFilterChange({ featured: false })}
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {localFilters.isNew && (
            <Badge variant="secondary" className="flex items-center gap-1">
              New
              <button
                onClick={() => handleFilterChange({ isNew: false })}
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      {pagination && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {products.length} of {pagination.totalProducts} products
          </p>
        </div>
      )}

      {/* Products Grid/List */}
      {loading ? (
        <LoadingSkeleton />
      ) : products.length === 0 ? (
        <Card className="luxury-card text-center py-12">
          <CardContent>
            <div className="text-gray-500">
              <Filter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="luxury-heading text-lg mb-2">No products found</h3>
              <p className="text-sm mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onQuickView={onQuickView}
              className={viewMode === 'list' ? 'flex' : ''}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPreviousPage}
              onClick={() => onPageChange?.(pagination.currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {/* Generate page numbers */}
              {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === pagination.currentPage;

                // Handle cases where we should show ellipsis
                if (pagination.totalPages > 5) {
                  if (pageNumber === 3 && pagination.currentPage > 4) {
                    return <span key="ellipsis-start" className="px-2">...</span>;
                  }
                  if (pageNumber === 3 && pagination.currentPage < pagination.totalPages - 3) {
                    return <span key="ellipsis-end" className="px-2">...</span>;
                  }
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    disabled={isActive}
                    onClick={() => onPageChange?.(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNextPage}
              onClick={() => onPageChange?.(pagination.currentPage + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;