"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Video,
  Download,
  Star,
  Clock,
  Shield,
  Award,
  Users,
  ChevronRight,
  Gem,
  Crown,
  Sparkles,
  Eye,
  Heart,
  ShoppingBag,
  GraduationCap,
  FileText,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

interface EducationCenterProps {
  className?: string;
}

export const EducationCenter: React.FC<EducationCenterProps> = ({
  className = ''
}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const educationCategories = [
    {
      id: 'basics',
      name: 'Jewellery Basics',
      description: 'Essential knowledge for jewellery enthusiasts',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      articles: 15
    },
    {
      id: 'diamonds',
      name: 'Diamond Education',
      description: 'Understanding the 4Cs and diamond quality',
      icon: Gem,
      color: 'from-blue-500 to-blue-600',
      articles: 12
    },
    {
      id: 'metals',
      name: 'Precious Metals',
      description: 'Gold, platinum, silver and their properties',
      icon: Crown,
      color: 'from-yellow-500 to-yellow-600',
      articles: 8
    },
    {
      id: 'care',
      name: 'Care & Maintenance',
      description: 'Keep your jewellery looking beautiful',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      articles: 10
    },
    {
      id: 'investment',
      name: 'Investment Guide',
      description: 'Building a valuable jewellery portfolio',
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      articles: 6
    },
    {
      id: 'vintage',
      name: 'Vintage & Antique',
      description: 'Understanding period jewellery',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      articles: 9
    }
  ];

  const featuredGuides = [
    {
      id: 1,
      title: 'The Complete Guide to Diamond Shopping',
      category: 'diamonds',
      readTime: '15 min read',
      rating: 4.9,
      views: 15420,
      author: 'Sarah Mitchell',
      expert: 'GIA Graduate Gemologist',
      description: 'Everything you need to know before buying a diamond',
      image: '/api/placeholder/400/250',
      isNew: true
    },
    {
      id: 2,
      title: 'Understanding Gold Purity: Karats Explained',
      category: 'metals',
      readTime: '8 min read',
      rating: 4.8,
      views: 8932,
      author: 'Michael Chen',
      expert: 'Master Goldsmith',
      description: 'A comprehensive guide to gold purity and karat systems',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Jewellery Care 101: Essential Maintenance Tips',
      category: 'care',
      readTime: '12 min read',
      rating: 4.7,
      views: 12105,
      author: 'Emily Rodriguez',
      expert: 'Jewellery Restoration Specialist',
      description: 'Professional tips for maintaining your precious jewellery',
      image: '/api/placeholder/400/250'
    }
  ];

  const allGuides = [
    {
      id: 1,
      title: 'The 4Cs of Diamonds: Cut, Color, Clarity, Carat',
      category: 'diamonds',
      readTime: '20 min read',
      rating: 4.9,
      views: 45623,
      author: 'Dr. James Wilson',
      expert: 'GIA Certified Gemologist',
      excerpt: 'Master the fundamentals of diamond evaluation with our comprehensive guide covering cut quality, color grades, clarity classifications, and carat weight.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      'title: 'Diamond Shapes Guide: Round, Princess, Emerald, and More',
      category: 'diamonds',
      readTime: '15 min read',
      rating: 4.8,
      views: 32187,
      author: 'Lisa Thompson',
      expert: 'Diamond Cutter',
      excerpt: 'Explore how different diamond shapes affect appearance, brilliance, and value with detailed comparisons and visual examples.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      'title: 'Gold vs. Platinum: Which Metal is Right for You?',
      category: 'metals',
      readTime: '12 min read',
      rating: 4.7,
      views: 28456,
      author: 'Robert Martinez',
      expert: 'Metallurgist',
      excerpt: 'Compare gold and platinum durability, value, and appearance to make an informed decision for your jewellery purchase.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'Understanding Gold Purity: 10K vs 14K vs 18K vs 24K',
      category: 'metals',
      readTime: '10 min read',
      rating: 4.8,
      views: 22341,
      author: 'Jennifer Lee',
      expert: 'Gold Refiner',
      excerpt: 'Learn the differences between gold purity levels and how to choose the right karat for your needs and budget.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'Silver Jewelry Care: Preventing Tarnish and Maintaining Shine',
      category: 'care',
      readTime: '8 min read',
      rating: 4.6,
      views: 19876,
      author: 'Maria Garcia',
      expert: 'Jewelry Care Specialist',
      excerpt: 'Professional techniques for cleaning and protecting your silver jewelry, including home remedies and storage tips.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      title: 'Fine Jewelry Maintenance: Professional vs. Home Care',
      category: 'care',
      readTime: '15 min read',
      rating: 4.7,
      views: 16543,
      author: 'David Chen',
      expert: 'Master Jeweler',
      excerpt: 'When to seek professional care versus what you can safely do at home to maintain your fine jewellery.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 7,
      title: 'Investing in Jewellery: Market Trends and Value Retention',
      category: 'investment',
      readTime: '18 min read',
      rating: 4.8,
      views: 31234,
      author: 'William Thompson',
      expert: 'Investment Advisor',
      excerpt: 'Learn how jewelry performs as an investment and strategies for building a valuable collection.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 8,
      title: 'Vintage Jewellery Identification: Period Pieces and Hallmarks',
      category: 'vintage',
      readTime: '25 min read',
      rating: 4.9,
      views: 42156,
      author: 'Rachel Williams',
      expert: 'Antique Appraiser',
      excerpt: 'How to identify authentic vintage pieces, understand historical periods, and decode hallmark symbols.',
      image: '/api/placeholder/300/200'
    }
  ];

  const filteredGuides = activeCategory === 'all'
    ? allGuides
    : allGuides.filter(guide => guide.category === activeCategory);

  return (
    <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-jewellery-gold/10 to-jewellery-silk p-6 border-b border-jewellery-gold/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="jewellery-title-bold text-3xl mb-2">Jewellery Education Center</h2>
            <p className="jewellery-text text-gray-600 max-w-2xl">
              Empower yourself with expert knowledge about jewellery. From diamond education to care tips, our comprehensive guides help you make informed decisions.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="jewellery-badge">
              {allGuides.length}+ Articles
            </Badge>
            <div className="flex items-center gap-1">
              <Users className="h-5 w-5 text-jewellery-gold" />
              <span className="jewellery-text text-sm text-gray-600">
                45,230+ Students
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-b border-jewellery-gold/20 p-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                activeCategory === 'all'
                  ? 'border-jewellery-gold bg-jewellery-silk'
                  : 'border-gray-200 hover:border-jewellery-gold/50'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="jewellery-text text-sm">All Articles</span>
            </button>
            {educationCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                    activeCategory === category.id
                      ? 'border-jewellery-gold bg-jewellery-silk'
                      : 'border-gray-200 hover:border-jewellery-gold/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <p className="jewellery-subtitle text-xs">{category.name}</p>
                    <p className="jewellery-text text-xs text-gray-500">{category.articles} articles</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
            />
          </div>
        </div>
      </div>

      {/* Featured Guides */}
      <div className="p-6 border-b border-jewellery-gold/20">
        <h3 className="jewellery-subtitle text-lg mb-6">Featured Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <div key={guide.id} className="group cursor-pointer">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 bg-jewellery-silk overflow-hidden">
                  <div className="jewellery-image-container w-full h-full flex items-center justify-center">
                    <FileText className="h-16 w-16 text-jewellery-gold/20" />
                  </div>
                  {guide.isNew && (
                    <Badge className="jewellery-badge absolute top-4 left-4">
                      New
                    </Badge>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="jewellery-heading font-semibold mb-2 group-hover:text-jewellery-gold transition-colors">
                    {guide.title}
                  </h4>
                  <p className="jewellery-text text-sm text-gray-600 mb-4 line-clamp-2">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-jewellery-gold text-jewellery-gold" />
                      <span className="jewellery-text text-sm font-medium">{guide.rating}</span>
                      <span className="jewellery-text text-xs text-gray-500">({guide.views.toLocaleString()} views)</span>
                    </div>
                    <span className="jewellery-text text-xs text-gray-500">{guide.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="jewellery-text text-sm text-gray-500">By {guide.author}</span>
                      {guide.expert && (
                        <Badge variant="secondary" className="text-xs bg-jewellery-silk text-jewellery-gold">
                          {guide.expert}
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-jewellery-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Articles Grid */}
      <div className="p-6">
        <h3 className="jewellery-subtitle text-lg mb-6">All Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <article key={guide.id} className="group cursor-pointer">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex">
                  <div className="relative w-32 h-32 bg-jewellery-silk overflow-hidden">
                    <div className="jewellery-image-container w-full h-full flex items-center justify-center">
                      <FileText className="h-8 w-8 text-jewellery-gold/20" />
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="jewellery-badge text-xs">
                        {educationCategories.find(c => c.id === guide.category)?.name}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-jewellery-gold text-jewellery-gold" />
                        <span className="jewellery-text text-sm font-medium">{guide.rating}</span>
                      </div>
                    </div>
                    <h4 className="jewellery-heading font-semibold mb-2 group-hover:text-jewellery-gold transition-colors line-clamp-2">
                      {guide.title}
                    </h4>
                    <p className="jewellery-text text-sm text-gray-600 mb-4 line-clamp-3">
                      {guide.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{guide.readTime}</span>
                      <span>{guide.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-6 border-t border-jewellery-gold/20 bg-jewellery-silk">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <GraduationCap className="h-8 w-8 text-jewellery-gold" />
            <h3 className="jewellery-title-bold text-2xl">Become a Jewellery Expert</h3>
            <Lightbulb className="h-8 w-8 text-jewellery-gold" />
          </div>
          <p className="jewellery-text text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our free newsletter and receive exclusive jewellery education content, early access to guides, and special offers from our expert jewelers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-jewellery-primary">
              Subscribe to Newsletter
              <Mail className="h-5 w-5 ml-2" />
            </button>
            <button className="btn-jewellery-secondary">
              Download Free E-book
              <Download className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Expert Advice */}
      <div className="p-6 border-t border-jewellery-gold/20">
        <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-jewellery-gold rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="jewellery-title text-lg mb-2">Need Expert Advice?</h4>
              <p className="jewellery-text text-sm text-gray-600 mb-4">
                Our team of certified gemologists and master jewelers are here to help with your questions. Get personalized advice for your specific needs.
              </p>
              <div className="flex gap-4">
                <button className="btn-jewellery-secondary">
                  <Eye className="h-5 w-5 mr-2" />
                  Virtual Consultation
                </button>
                <button className="btn-jewellery-secondary">
                  <Heart className="h-5 w-5 mr-2" />
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="p-6 border-t border-jewellery-gold/20">
        <h3 className="jewellery-subtitle text-lg mb-6">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-jewellery-gold/50 transition-colors">
            <Gem className="h-5 w-5 text-jewellery-gold" />
            <div className="text-left">
              <p className="jewellery-text text-sm font-medium">Diamond Education</p>
              <p className="jewellery-text text-xs text-gray-500">Complete guide to diamonds</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-jewellery-gold/50 transition-colors">
            <Crown className="h-5 w-5 text-jewellery-gold" />
            <div className="text-left">
              <p className="jewellery-text text-sm font-medium">Metal Properties</p>
              <p className="jewellery-text text-xs text-gray-500">Gold, platinum, silver</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-jewellery-gold/50 transition-colors">
            <Shield className="h-5 w-5 text-jewellery-gold" />
            <div className="text-left">
              <p className="jewellery-text text-sm font-medium">Care & Maintenance</p>
              <p className="jewellery-text text-xs text-gray-500">Professional tips</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-jewellery-gold/50 transition-colors">
            <Award className="h-5 w-5 text-jewellery-gold" />
            <div className="text-left">
              <p className="jewellery-text text-sm font-medium">Investment Guide</p>
              <p className="jewellery-text text-xs text-gray-500">Value retention</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationCenter;