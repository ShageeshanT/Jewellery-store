"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Grid,
  List,
  Filter,
  Search,
  Heart,
  ShoppingBag,
  Star,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
  Gem,
  Crown,
  Shield
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  materials: string[];
  gemstone?: string;
  carat?: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isLimited?: boolean;
  description?: string;
}

interface ShoppingPageProps {
  category?: string;
  products: Product[];
  className?: string;
}

export const ShoppingPage: React.FC<ShoppingPageProps> = ({
  category = 'all',
  products,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedGemstones, setSelectedGemstones] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'rings', label: 'Rings', count: 156 },
    { value: 'necklaces', label: 'Necklaces', count: 98 },
    { value: 'earrings', label: 'Earrings', count: 143 },
    { value: 'bracelets', label: 'Bracelets', count: 67 },
    { value: 'brooches', label: 'Brooches', count: 34 },
    { value: 'sets', label: 'Jewellery Sets', count: 29 }
  ];

  const materials = [
    { value: 'gold-18k', label: '18K Gold', count: 234 },
    { value: 'gold-14k', label: '14K Gold', count: 156 },
    { value: 'platinum', label: 'Platinum', count: 89 },
    { value: 'silver', label: 'Sterling Silver', count: 178 },
    { value: 'rose-gold', label: 'Rose Gold', count: 98 }
  ];

  const gemstones = [
    { value: 'diamond', label: 'Diamond', count: 267 },
    { value: 'sapphire', label: 'Sapphire', count: 89 },
    { value: 'ruby', label: 'Ruby', count: 76 },
    { value: 'emerald', label: 'Emerald', count: 54 },
    { value: 'pearl', label: 'Pearl', count: 93 }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category === 'all' || product.category === category;

    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

    const matchesMaterials = selectedMaterials.length === 0 ||
                             selectedMaterials.some(material => product.materials.includes(material));

    const matchesGemstones = selectedGemstones.length === 0 ||
                             (product.gemstone && selectedGemstones.includes(product.gemstone));

    return matchesSearch && matchesCategory && matchesPrice && matchesMaterials && matchesGemstones;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.isLimited ? 1 : 0) - (a.isLimited ? 1 : 0);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const currentCategoryInfo = categories.find(cat => cat.value === category);

  return (
    <div className={`min-h-screen bg-jewellery-silk ${className}`}>
      {/* Header */}
      <div className="bg-white border-b border-jewellery-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Crown className="h-8 w-8 text-jewellery-gold" />
                <h1 className="jewellery-title-bold text-4xl capitalize">
                  {currentCategoryInfo?.label || 'All Jewellery'}
                </h1>
                <Badge className="jewellery-badge">
                  {filteredProducts.length} items
                </Badge>
              </div>
              <p className="jewellery-text text-gray-600 max-w-2xl">
                Discover our exquisite collection of handcrafted jewellery,
                where timeless elegance meets modern design.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-jewellery-gold/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-jewellery-gold text-white'
                      : 'bg-white text-jewellery-gold hover:bg-jewellery-silk'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-jewellery-gold text-white'
                      : 'bg-white text-jewellery-gold hover:bg-jewellery-silk'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Sort Bar */}
      <div className="bg-white border-b border-jewellery-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for jewellery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20 bg-white pr-10"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-jewellery-gold/20 rounded-lg hover:border-jewellery-gold transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span className="jewellery-text font-medium">Filters</span>
                {(selectedMaterials.length > 0 || selectedGemstones.length > 0) && (
                  <Badge className="jewellery-badge bg-jewellery-ruby text-white">
                    {selectedMaterials.length + selectedGemstones.length}
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="jewellery-subtitle text-lg">Filters</h3>
                  <button
                    onClick={() => {
                      setSelectedMaterials([]);
                      setSelectedGemstones([]);
                      setPriceRange({ min: 0, max: 50000 });
                    }}
                    className="jewellery-text text-sm text-jewellery-gold hover:text-jewellery-gold-dark"
                  >
                    Clear All
                  </button>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="jewellery-text font-medium mb-4">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="jewellery-text text-sm">${priceRange.min.toLocaleString()}</span>
                      <span className="jewellery-text text-sm">${priceRange.max.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                      className="w-full accent-jewellery-gold"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="jewellery-text font-medium mb-4">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => window.location.href = `/shop/${cat.value}`}
                        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-jewellery-silk transition-colors text-left"
                      >
                        <span className="jewellery-text">{cat.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {cat.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h4 className="jewellery-text font-medium mb-4">Materials</h4>
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <label key={material.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMaterials(prev => [...prev, material.value]);
                            } else {
                              setSelectedMaterials(prev => prev.filter(m => m !== material.value));
                            }
                          }}
                          className="w-4 h-4 text-jewellery-gold border-gray-300 rounded focus:ring-jewellery-gold/20"
                        />
                        <div className="flex-1">
                          <span className="jewellery-text">{material.label}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {material.count}
                        </Badge>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gemstones */}
                <div>
                  <h4 className="jewellery-text font-medium mb-4">Gemstones</h4>
                  <div className="space-y-2">
                    {gemstones.map((gemstone) => (
                      <label key={gemstone.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedGemstones.includes(gemstone.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedGemstones(prev => [...prev, gemstone.value]);
                            } else {
                              setSelectedGemstones(prev => prev.filter(g => g !== gemstone.value));
                            }
                          }}
                          className="w-4 h-4 text-jewellery-gold border-gray-300 rounded focus:ring-jewellery-gold/20"
                        />
                        <div className="flex-1">
                          <span className="jewellery-text">{gemstone.label}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {gemstone.count}
                        </Badge>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          <div className={`flex-1 ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }`}>
            {filteredProducts.map((product) => {
              const currentPrice = product.salePrice || product.price;
              const discountPercentage = product.salePrice
                ? Math.round(((product.price - product.salePrice) / product.price) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative overflow-hidden bg-jewellery-silk ${
                    viewMode === 'list' ? 'w-48 h-48' : 'h-64'
                  }`}>
                    <div className="jewellery-image-container w-full h-full flex items-center justify-center">
                      <Gem className="h-16 w-16 text-jewellery-gold/20" />
                    </div>

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <button className="flex-1 bg-white/90 backdrop-blur-sm text-jewellery-gold py-2 px-3 rounded-lg text-sm font-medium hover:bg-white transition-colors">
                          <ShoppingBag className="h-4 w-4 inline mr-1" />
                          Quick Add
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm text-jewellery-ruby p-2 rounded-lg hover:bg-white transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="jewellery-badge bg-jewellery-emerald">New</Badge>
                      )}
                      {product.isLimited && (
                        <Badge className="jewellery-badge bg-jewellery-ruby">Limited</Badge>
                      )}
                      {discountPercentage > 0 && (
                        <Badge className="jewellery-badge bg-jewellery-ruby">-{discountPercentage}%</Badge>
                      )}
                    </div>

                    {/* Sparkle Effect */}
                    <div className="jewellery-sparkles">
                      <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '20%', left: '10%' }}></div>
                      <div className="jewellery-sparkle animate-jewellery-sparkle" style={{ top: '60%', left: '80%', animationDelay: '0.5s' }}></div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="jewellery-title font-semibold mb-2 group-hover:text-jewellery-gold transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-jewellery-gold text-jewellery-gold'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="jewellery-text text-sm text-gray-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Materials */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.materials.slice(0, 2).map((material, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-jewellery-silk text-jewellery-gold"
                        >
                          {material}
                        </Badge>
                      ))}
                      {product.gemstone && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-jewellery-silk text-jewellery-gold"
                        >
                          {product.gemstone}
                        </Badge>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="jewellery-price text-lg">
                        ${currentPrice.toLocaleString()}
                      </span>
                      {product.salePrice && (
                        <span className="jewellery-price-original text-sm line-through text-gray-400">
                          ${product.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button className="btn-jewellery-primary w-full text-sm">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <Gem className="h-20 w-20 text-gray-300 mx-auto mb-6" />
          <h3 className="jewellery-title text-2xl mb-3">No jewellery found</h3>
          <p className="jewellery-text text-gray-500 mb-6 max-w-md mx-auto">
            Try adjusting your filters or search terms to find the perfect piece.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedMaterials([]);
              setSelectedGemstones([]);
              setPriceRange({ min: 0, max: 50000 });
              setSortBy('featured');
            }}
            className="btn-jewellery-secondary"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingPage;