"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Filter,
  Grid,
  List,
  Search,
  ChevronDown,
  Heart,
  ShoppingBag,
  Gem,
  Star,
  Clock,
  Sparkles
} from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  featured?: boolean;
  isNew?: boolean;
  tags?: string[];
}

interface CollectionGalleryProps {
  collections: Collection[];
  viewMode?: 'grid' | 'list';
  enableFiltering?: boolean;
  className?: string;
}

export const CollectionGallery: React.FC<CollectionGalleryProps> = ({
  collections,
  viewMode = 'grid',
  enableFiltering = true,
  className = ''
}) => {
  const [currentViewMode, setCurrentViewMode] = useState<'grid' | 'list'>(viewMode);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

  const categories = [
    { value: 'all', label: 'All Collections' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'modern', label: 'Modern' },
    { value: 'bridal', label: 'Bridal' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name' },
    { value: 'newest', label: 'Newest' }
  ];

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          collection.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' ||
                          collection.tags?.includes(selectedCategory);

    const matchesPrice = collection.priceRange.min <= priceRange.max &&
                          collection.priceRange.max >= priceRange.min;

    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'price-low':
        return a.priceRange.min - b.priceRange.min;
      case 'price-high':
        return b.priceRange.max - a.priceRange.max;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-jewellery-gold/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="jewellery-title-bold text-3xl mb-2">Our Collections</h2>
            <p className="jewellery-text text-gray-600">
              Discover our curated collections, each telling a unique story of craftsmanship and elegance.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentViewMode('grid')}
              className={`p-2 rounded-lg border ${
                currentViewMode === 'grid'
                  ? 'border-jewellery-gold bg-jewellery-silk'
                  : 'border-gray-200 hover:border-jewellery-gold/50'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentViewMode('list')}
              className={`p-2 rounded-lg border ${
                currentViewMode === 'list'
                  ? 'border-jewellery-gold bg-jewellery-silk'
                  : 'border-gray-200 hover:border-jewellery-gold/50'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {enableFiltering && (
        <div className="p-6 border-b border-jewellery-gold/20 bg-jewellery-silk">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none px-4 py-2 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20 bg-white"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-4 py-2 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20 bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Results */}
            <div className="flex items-center justify-between">
              <span className="jewellery-text text-sm text-gray-600">
                {filteredCollections.length} collections
              </span>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="col-span-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="jewellery-text text-sm">Price Range</span>
              <div className="flex items-center gap-2">
                <span className="jewellery-text text-sm">${priceRange.min.toLocaleString()}</span>
                <span className="text-gray-400">-</span>
                <span className="jewellery-text text-sm">${priceRange.max.toLocaleString()}</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Collections Grid/List */}
      <div className={`p-6 ${
        currentViewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }`}>
        {filteredCollections.map((collection) => (
          <div
            key={collection.id}
            className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
              currentViewMode === 'list' ? 'flex' : ''
            }`}
          >
            {/* Image */}
            <div className={`${
              currentViewMode === 'list' ? 'w-64 h-48' : 'h-64'
            } relative overflow-hidden bg-jewellery-silk`}>
              <div className="jewellery-image-container w-full h-full flex items-center justify-center">
                <Gem className="h-16 w-16 text-jewellery-gold/20" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {collection.featured && (
                  <Badge className="jewellery-badge bg-jewellery-gold">
                    Featured
                  </Badge>
                )}
                {collection.isNew && (
                  <Badge className="jewellery-badge bg-jewellery-emerald">
                    New
                  </Badge>
                )}
              </div>

              {/* Hover Actions */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="btn-jewellery-secondary text-xs px-3 py-1">
                  <Heart className="h-4 w-4 mr-1" />
                  Save
                </button>
                <button className="btn-jewellery-secondary text-xs px-3 py-1">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Shop
                </button>
              </div>

              {/* Sparkle Effect */}
              <div className="jewellery-sparkles">
                <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '20%', left: '10%' }}></div>
                <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '60%', left: '80%', animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Content */}
            <div className={`p-6 ${currentViewMode === 'list' ? 'flex-1' : ''}`}>
              <h3 className="jewellery-title text-xl mb-2 group-hover:text-jewellery-gold transition-colors">
                {collection.name}
              </h3>
              <p className="jewellery-text text-sm text-gray-600 mb-4 line-clamp-2">
                {collection.description}
              </p>

              {/* Tags */}
              {collection.tags && collection.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {collection.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-jewellery-silk text-jewellery-gold border-jewellery-gold/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Price and Items */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="jewellery-text text-sm text-gray-500">Price Range</p>
                  <p className="jewellery-price text-lg">
                    ${collection.priceRange.min.toLocaleString()} - ${collection.priceRange.max.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="jewellery-text text-sm text-gray-500">Pieces</p>
                  <p className="jewellery-text text-lg font-semibold">
                    {collection.itemCount}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button className="btn-jewellery-primary w-full group">
                Explore Collection
                <Sparkles className="ml-2 h-4 w-4 group-hover:animate-jewellery-sparkle" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCollections.length === 0 && (
        <div className="text-center py-12">
          <Gem className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="jewellery-title text-xl mb-2">No collections found</h3>
          <p className="jewellery-text text-gray-500 mb-6">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSortBy('featured');
              setPriceRange({ min: 0, max: 50000 });
            }}
            className="btn-jewellery-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Load More */}
      {filteredCollections.length > 0 && (
        <div className="p-6 border-t border-jewellery-gold/20 text-center">
          <button className="btn-jewellery-secondary">
            Load More Collections
          </button>
        </div>
      )}
    </div>
  );
};

export default CollectionGallery;