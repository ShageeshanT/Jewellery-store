"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Gift,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  Share2,
  Plus,
  Search,
  Filter,
  Star,
  Sparkles,
  Eye,
  ShoppingBag,
  Download,
  Crown,
  Bell,
  CheckCircle,
  Clock,
  Users,
  X,
  Edit,
  Copy
} from 'lucide-react';

interface RegistryItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  priority: 'high' | 'medium' | 'low';
  quantity: number;
  quantityPurchased: number;
  notes?: string;
  dateAdded: string;
}

interface GiftRegistry {
  id: string;
  title: string;
  occasion: string;
  date: string;
  recipientName: string;
  recipientEmail: string;
  description: string;
  items: RegistryItem[];
  isPublic: boolean;
  isPublished: boolean;
  shareUrl?: string;
  coverImage?: string;
  message: string;
  location?: string;
}

interface GiftRegistryProps {
  className?: string;
}

export const GiftRegistry: React.FC<GiftRegistryProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'my-registries' | 'browse' | 'create'>('my-registries');
  const [selectedRegistry, setSelectedRegistry] = useState<GiftRegistry | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOccasion, setFilterOccasion] = useState('all');

  const occasions = [
    { value: 'wedding', label: 'Wedding', icon: '💒', color: 'from-pink-500 to-rose-600' },
    { value: 'engagement', label: 'Engagement', icon: '💍', color: 'from-blue-500 to-purple-600' },
    { value: 'birthday', label: 'Birthday', icon: '🎂', color: 'from-yellow-500 to-orange-600' },
    { value: 'anniversary', label: 'Anniversary', icon: '💕', color: 'from-red-500 to-pink-600' },
    { value: 'graduation', label: 'Graduation', icon: '🎓', color: 'from-green-500 to-teal-600' },
    { value: 'baby-shower', label: 'Baby Shower', icon: '👶', color: 'from-purple-500 to-indigo-600' },
    { value: 'housewarming', label: 'Housewarming', icon: '🏠', color: 'from-cyan-500 to-blue-600' },
    { value: 'other', label: 'Other', icon: '🎁', color: 'from-gray-500 to-gray-600' }
  ];

  const myRegistries: GiftRegistry[] = [
    {
      id: '1',
      title: "Sarah & Michael's Wedding Registry",
      occasion: 'wedding',
      date: '2024-06-15',
      recipientName: 'Sarah Johnson',
      recipientEmail: 'sarah.j@email.com',
      description: 'Creating our forever with your love and blessings',
      items: [
        {
          id: '1',
          productId: 'ring-1',
          name: 'Diamond Wedding Bands Set',
          price: 12000,
          image: '/api/placeholder/300/300',
          priority: 'high',
          quantity: 2,
          quantityPurchased: 1,
          dateAdded: '2024-01-15'
        },
        {
          id: '2',
          productId: 'necklace-1',
          name: 'Pearl Anniversary Necklace',
          price: 3500,
          image: '/api/placeholder/300/300',
          priority: 'medium',
          quantity: 1,
          quantityPurchased: 0,
          dateAdded: '2024-01-20'
        }
      ],
      isPublic: true,
      isPublished: true,
      shareUrl: 'gift.jewellery-store.com/sarah-michael-2024',
      message: 'Thank you for being part of our special day!',
      location: 'Beverly Hills, CA'
    }
  ];

  const publicRegistries: GiftRegistry[] = [
    {
      id: '2',
      title: "Emma's 30th Birthday",
      occasion: 'birthday',
      date: '2024-03-10',
      recipientName: 'Emma Wilson',
      recipientEmail: 'emma.w@email.com',
      description: 'Celebrating three decades of joy and dreams',
      items: [
        {
          id: '3',
          productId: 'earrings-1',
          name: 'Diamond Stud Earrings',
          price: 2500,
          image: '/api/placeholder/300/300',
          priority: 'high',
          quantity: 1,
          quantityPurchased: 0,
          dateAdded: '2024-02-01'
        }
      ],
      isPublic: true,
      isPublished: true,
      shareUrl: 'gift.jewellery-store.com/emma-birthday-2024',
      message: 'Your presence is the greatest gift of all!',
      location: 'New York, NY'
    }
  ];

  const [newRegistry, setNewRegistry] = useState({
    title: '',
    occasion: '',
    date: '',
    recipientName: '',
    recipientEmail: '',
    description: '',
    message: '',
    location: '',
    isPublic: true
  });

  const filteredRegistries = (activeTab === 'my-registries' ? myRegistries : publicRegistries).filter(registry => {
    const matchesSearch = registry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          registry.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOccasion = filterOccasion === 'all' || registry.occasion === filterOccasion;
    return matchesSearch && matchesOccasion;
  });

  const copyShareUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // In a real app, you'd show a toast notification here
    alert('Link copied to clipboard!');
  };

  const createRegistry = () => {
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      setActiveTab('my-registries');
      setNewRegistry({
        title: '',
        occasion: '',
        date: '',
        recipientName: '',
        recipientEmail: '',
        description: '',
        message: '',
        location: '',
        isPublic: true
      });
    }, 2000);
  };

  const getOccasionInfo = (occasion: string) => {
    return occasions.find(o => o.value === occasion) || occasions[7];
  };

  const getProgress = (items: RegistryItem[]) => {
    if (items.length === 0) return 0;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const purchasedItems = items.reduce((sum, item) => sum + item.quantityPurchased, 0);
    return (purchasedItems / totalItems) * 100;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-jewellery-gold/10 to-jewellery-silk p-6 border-b border-jewellery-gold/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-jewellery-gold rounded-full flex items-center justify-center">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="jewellery-title-bold text-3xl">Gift Registry</h2>
              <p className="jewellery-text text-gray-600">
                Create and share your perfect jewellery wish list
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('create')}
            className="btn-jewellery-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Registry
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-jewellery-gold/20">
        <div className="flex space-x-1 p-6">
          <button
            onClick={() => setActiveTab('my-registries')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'my-registries'
                ? 'bg-jewellery-gold text-white'
                : 'text-gray-600 hover:text-jewellery-gold hover:bg-jewellery-silk'
            }`}
          >
            <Heart className="h-5 w-5 inline mr-2" />
            My Registries
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'browse'
                ? 'bg-jewellery-gold text-white'
                : 'text-gray-600 hover:text-jewellery-gold hover:bg-jewellery-silk'
            }`}
          >
            <Search className="h-5 w-5 inline mr-2" />
            Browse Registries
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'create'
                ? 'bg-jewellery-gold text-white'
                : 'text-gray-600 hover:text-jewellery-gold hover:bg-jewellery-silk'
            }`}
          >
            <Plus className="h-5 w-5 inline mr-2" />
            Create New
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'my-registries' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your registries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                />
              </div>
              <select
                value={filterOccasion}
                onChange={(e) => setFilterOccasion(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20 bg-white"
              >
                <option value="all">All Occasions</option>
                {occasions.map(occasion => (
                  <option key={occasion.value} value={occasion.value}>
                    {occasion.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Registries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRegistries.map((registry) => {
                const occasionInfo = getOccasionInfo(registry.occasion);
                const progress = getProgress(registry.items);

                return (
                  <div
                    key={registry.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Cover Image */}
                    <div className="relative h-48 bg-gradient-to-br from-jewellery-silk to-jewellery-gold/10 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Gift className="h-16 w-16 text-jewellery-gold/20" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="text-2xl">{occasionInfo.icon}</span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="jewellery-badge bg-white text-jewellery-gold">
                          {registry.items.length} items
                        </Badge>
                      </div>

                      {/* Progress Overlay */}
                      {registry.items.length > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
                          <div className="flex items-center justify-between text-white text-xs mb-1">
                            <span>{progress.toFixed(0)}% Funded</span>
                            <span>${registry.items.reduce((sum, item) => sum + (item.price * item.quantityPurchased), 0).toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-jewellery-gold h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-jewellery-silk text-jewellery-gold text-xs"
                        >
                          {occasionInfo.label}
                        </Badge>
                        {registry.isPublished ? (
                          <CheckCircle className="h-5 w-5 text-jewellery-emerald" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>

                      <h3 className="jewellery-title text-lg font-semibold mb-2 group-hover:text-jewellery-gold transition-colors">
                        {registry.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{registry.recipientName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(registry.date).toLocaleDateString()}</span>
                        </div>
                        {registry.location && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{registry.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="jewellery-text text-sm text-gray-600 mb-4 line-clamp-2">
                        {registry.description}
                      </p>

                      {/* Actions */}
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedRegistry(registry)}
                            className="flex-1 btn-jewellery-primary text-sm"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </button>
                          <button className="flex-1 btn-jewellery-secondary text-sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyShareUrl(registry.shareUrl || '')}
                            className="flex-1 flex items-center justify-center gap-2 p-2 border border-gray-200 rounded-lg hover:border-jewellery-gold/50 transition-colors text-sm"
                          >
                            <Copy className="h-4 w-4" />
                            Share
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 p-2 border border-gray-200 rounded-lg hover:border-jewellery-gold/50 transition-colors text-sm">
                            <Download className="h-4 w-4" />
                            Export
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredRegistries.length === 0 && (
              <div className="text-center py-12">
                <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="jewellery-title text-xl mb-2">No registries found</h3>
                <p className="jewellery-text text-gray-500 mb-6">
                  Create your first registry to get started
                </p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="btn-jewellery-primary"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Registry
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'browse' && (
          <div className="space-y-6">
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
              <h3 className="jewellery-subtitle text-lg mb-3">Browse Public Registries</h3>
              <p className="jewellery-text text-gray-600 mb-4">
                Find and contribute to special occasions for friends and family
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search by name or occasion..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                />
                <select
                  value={filterOccasion}
                  onChange={(e) => setFilterOccasion(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20 bg-white"
                >
                  <option value="all">All Occasions</option>
                  {occasions.map(occasion => (
                    <option key={occasion.value} value={occasion.value}>
                      {occasion.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Browse Registries Grid - Similar to My Registries but read-only */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicRegistries.map((registry) => {
                const occasionInfo = getOccasionInfo(registry.occasion);

                return (
                  <div
                    key={registry.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Similar structure to My Registries but with different actions */}
                    <div className="relative h-48 bg-gradient-to-br from-jewellery-silk to-jewellery-gold/10 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Gift className="h-16 w-16 text-jewellery-gold/20" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="text-2xl">{occasionInfo.icon}</span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="jewellery-badge bg-white text-jewellery-gold">
                          {registry.items.length} items
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-jewellery-silk text-jewellery-gold text-xs"
                        >
                          {occasionInfo.label}
                        </Badge>
                      </div>

                      <h3 className="jewellery-title text-lg font-semibold mb-2 group-hover:text-jewellery-gold transition-colors">
                        {registry.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{registry.recipientName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(registry.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <p className="jewellery-text text-sm text-gray-600 mb-4 line-clamp-2">
                        {registry.description}
                      </p>

                      <button
                        onClick={() => setSelectedRegistry(registry)}
                        className="w-full btn-jewellery-primary text-sm"
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        View Registry
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20 mb-6">
              <h3 className="jewellery-subtitle text-lg mb-3">Create Your Gift Registry</h3>
              <p className="jewellery-text text-gray-600">
                Set up a beautiful registry to share with your friends and family
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); createRegistry(); }} className="space-y-6">
              {/* Registry Details */}
              <div>
                <label className="jewellery-text font-medium mb-2 block">Registry Title *</label>
                <input
                  type="text"
                  required
                  value={newRegistry.title}
                  onChange={(e) => setNewRegistry(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                  placeholder="e.g., Sarah & Michael's Wedding Registry"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="jewellery-text font-medium mb-2 block">Occasion *</label>
                  <select
                    required
                    value={newRegistry.occasion}
                    onChange={(e) => setNewRegistry(prev => ({ ...prev, occasion: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20 bg-white"
                  >
                    <option value="">Select an occasion</option>
                    {occasions.map(occasion => (
                      <option key={occasion.value} value={occasion.value}>
                        {occasion.icon} {occasion.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="jewellery-text font-medium mb-2 block">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={newRegistry.date}
                    onChange={(e) => setNewRegistry(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="jewellery-text font-medium mb-2 block">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={newRegistry.recipientName}
                    onChange={(e) => setNewRegistry(prev => ({ ...prev, recipientName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                    placeholder="Name of the recipient"
                  />
                </div>

                <div>
                  <label className="jewellery-text font-medium mb-2 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newRegistry.recipientEmail}
                    onChange={(e) => setNewRegistry(prev => ({ ...prev, recipientEmail: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                    placeholder="recipient@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="jewellery-text font-medium mb-2 block">Description</label>
                <textarea
                  value={newRegistry.description}
                  onChange={(e) => setNewRegistry(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                  placeholder="Tell us about this special occasion..."
                />
              </div>

              <div>
                <label className="jewellery-text font-medium mb-2 block">Personal Message</label>
                <textarea
                  value={newRegistry.message}
                  onChange={(e) => setNewRegistry(prev => ({ ...prev, message: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                  placeholder="A message for your gift givers..."
                />
              </div>

              <div>
                <label className="jewellery-text font-medium mb-2 block">Event Location (Optional)</label>
                <input
                  type="text"
                  value={newRegistry.location}
                  onChange={(e) => setNewRegistry(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                  placeholder="City, State or Venue"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newRegistry.isPublic}
                  onChange={(e) => setNewRegistry(prev => ({ ...prev, isPublic: e.target.checked }))}
                  className="w-4 h-4 text-jewellery-gold border-gray-300 rounded focus:ring-jewellery-gold/20"
                />
                <label htmlFor="isPublic" className="jewellery-text">
                  Make this registry public and discoverable
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('my-registries')}
                  className="btn-jewellery-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="btn-jewellery-primary flex-1"
                >
                  {isCreating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Registry...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 mr-2" />
                      Create Registry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftRegistry;