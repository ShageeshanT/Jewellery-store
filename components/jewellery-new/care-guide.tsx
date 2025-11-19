"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Droplets,
  Sun,
  Sparkles,
  Clock,
  ChevronRight,
  Play,
  Download,
  CheckCircle,
  AlertTriangle,
  Thermometer,
  Zap,
  BookOpen,
  Star,
  Users,
  Calendar,
  Search,
  Filter,
  Heart,
  Gem,
  Crown,
  Video,
  FileText,
  Printer
} from 'lucide-react';

interface CareGuide {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  materials: string[];
  steps: {
    title: string;
    description: string;
    image?: string;
    videoUrl?: string;
    tips?: string[];
    warnings?: string[];
  }[];
  frequency: string;
  tools: string[];
  author: {
    name: string;
    expertise: string;
    avatar?: string;
  };
}

interface CareGuideProps {
  className?: string;
}

export const CareGuide: React.FC<CareGuideProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState<CareGuide | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const categories = [
    { id: 'all', name: 'All Guides', icon: BookOpen, count: 24 },
    { id: 'cleaning', name: 'Cleaning', icon: Droplets, count: 8 },
    { id: 'storage', name: 'Storage', icon: Shield, count: 6 },
    { id: 'maintenance', name: 'Maintenance', icon: Clock, count: 7 },
    { id: 'repair', name: 'Repair', icon: Zap, count: 3 }
  ];

  const careGuides: CareGuide[] = [
    {
      id: '1',
      title: 'Diamond Ring Daily Care Routine',
      category: 'cleaning',
      difficulty: 'beginner',
      duration: '5 minutes',
      materials: ['Soft brush', 'Mild soap', 'Warm water', 'Lint-free cloth'],
      frequency: 'Daily',
      tools: ['Soft toothbrush', 'Small bowl', 'Microfiber cloth'],
      steps: [
        {
          title: 'Prepare Cleaning Solution',
          description: 'Mix a few drops of mild dish soap with warm water in a small bowl.',
          tips: ['Use room temperature water, not hot water', 'Only use 2-3 drops of soap'],
          warnings: ['Avoid harsh chemicals like bleach or ammonia']
        },
        {
          title: 'Soak the Ring',
          description: 'Place your diamond ring in the solution and let it soak for 2-3 minutes.',
          tips: ['Make sure the ring is fully submerged', 'Don\'t soak for more than 5 minutes']
        },
        {
          title: 'Gentle Brushing',
          description: 'Use a soft toothbrush to gently clean around the diamond and setting.',
          tips: ['Brush in circular motions', 'Pay attention to the prongs and back of the setting'],
          warnings: ['Be gentle to avoid loosening the setting']
        },
        {
          title: 'Rinse and Dry',
          description: 'Rinse thoroughly with clean water and pat dry with a lint-free cloth.',
          tips: ['Use distilled water for final rinse if available', 'Let it air dry completely']
        }
      ],
      author: {
        name: 'Maria Rodriguez',
        expertise: 'Master Jeweler'
      }
    },
    {
      id: '2',
      title: 'Silver Jewelry Tarnish Prevention',
      category: 'storage',
      difficulty: 'intermediate',
      duration: '15 minutes',
      materials: ['Anti-tarnish strips', 'Airtight containers', 'Silica gel packets'],
      frequency: 'Monthly',
      tools: ['Cleaning cloths', 'Storage boxes'],
      steps: [
        {
          title: 'Clean Before Storing',
          description: 'Always clean silver pieces before long-term storage to remove oils and dirt.',
          tips: ['Use a silver polishing cloth', 'Don\'t use paper towels as they can scratch']
        },
        {
          title: 'Use Anti-Tarnish Materials',
          description: 'Place anti-tarnish strips or silica gel packets in storage containers.',
          tips: ['Replace strips every 3-6 months', 'Keep containers properly sealed']
        },
        {
          title: 'Proper Container Selection',
          description: 'Store silver in airtight containers away from direct sunlight.',
          tips: ['Individual boxes prevent scratching', 'Line boxes with soft fabric'],
          warnings: ['Avoid plastic bags for long-term storage as they can trap moisture']
        }
      ],
      author: {
        name: 'David Chen',
        expertise: 'Silver Specialist'
      }
    },
    {
      id: '3',
      title: 'Pearl Jewelry Maintenance',
      category: 'maintenance',
      difficulty: 'advanced',
      duration: '10 minutes',
      materials: ['Soft cloth', 'Mild soap', 'Velvet pouch'],
      frequency: 'After each wear',
      tools: ['Soft brush (very soft)', 'Storage box'],
      steps: [
        {
          title: 'Last On, First Off Rule',
          description: 'Apply perfume, hairspray, and cosmetics before putting on pearl jewelry.',
          tips: ['Wait 5 minutes after applying products', 'Remove pearls before swimming'],
          warnings: ['Never expose pearls to chlorine or harsh chemicals']
        },
        {
          title: 'Gentle Cleaning',
          description: 'Wipe pearls with a damp, soft cloth after each wear.',
          tips: ['Use distilled water if possible', 'Pat dry immediately'],
          warnings: ['Never submerge pearl strands in water as it can weaken the silk thread']
        },
        {
          title: 'Proper Storage',
          description: 'Store pearls separately in a soft pouch or lined box.',
          tips: ['Lay pearl strands flat to prevent stretching', 'Keep away from other jewelry'],
          warnings: ['Don\'t store in airtight containers as pearls need to breathe']
        }
      ],
      author: {
        name: 'Lisa Thompson',
        expertise: 'Pearl Expert'
      }
    },
    {
      id: '4',
      title: 'Gold Chain Untangling & Care',
      category: 'repair',
      difficulty: 'intermediate',
      duration: '20 minutes',
      materials: ['Baby powder', 'Two needles', 'Magnifying glass'],
      frequency: 'As needed',
      tools: ['Fine-point tweezers', 'Patience!'],
      steps: [
        {
          title: 'Apply Baby Powder',
          description: 'Lightly dust the tangled area with baby powder to reduce friction.',
          tips: ['Use very little powder', 'Work on a white surface to see the powder clearly']
        },
        {
          title: 'Gentle Separation',
          description: 'Use two needles to gently work the chains apart from the outside in.',
          tips: ['Work slowly and patiently', 'Use a magnifying glass for fine chains'],
          warnings: ['Never pull forcefully as this can damage the links']
        },
        {
          title: 'Final Cleaning',
          description: 'Clean the chain to remove any remaining powder and check for damage.',
          tips: ['Use a soft cloth for cleaning', 'Check for stretched or broken links']
        }
      ],
      author: {
        name: 'Robert Martinez',
        expertise: 'Chain Repair Specialist'
      }
    }
  ];

  const quickTips = [
    {
      icon: Droplets,
      title: 'Water Safety',
      description: 'Remove jewelry before swimming, showering, or doing dishes',
      color: 'text-blue-500'
    },
    {
      icon: Sun,
      title: 'Avoid Sunlight',
      description: 'Store jewelry away from direct sunlight to prevent fading',
      color: 'text-yellow-500'
    },
    {
      icon: Thermometer,
      title: 'Temperature Control',
      description: 'Avoid extreme temperature changes that can damage settings',
      color: 'text-red-500'
    },
    {
      icon: Sparkles,
      title: 'Regular Cleaning',
      description: 'Clean jewelry regularly to maintain brilliance',
      color: 'text-green-500'
    }
  ];

  const filteredGuides = careGuides.filter(guide => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guide.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-jewellery-gold/10 to-jewellery-silk p-6 border-b border-jewellery-gold/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-jewellery-gold rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="jewellery-title-bold text-3xl">Jewellery Care Guide</h2>
              <p className="jewellery-text text-gray-600">
                Expert tips and techniques to maintain your precious jewellery
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="jewellery-badge">
              {careGuides.length} Expert Guides
            </Badge>
            <button className="btn-jewellery-secondary">
              <Download className="h-5 w-5 mr-2" />
              Download PDF Guide
            </button>
          </div>
        </div>
      </div>

      {!selectedGuide ? (
        <>
          {/* Quick Tips */}
          <div className="p-6 border-b border-jewellery-gold/20">
            <h3 className="jewellery-subtitle text-lg mb-4">Essential Care Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-jewellery-silk rounded-lg border border-jewellery-gold/20"
                >
                  <div className={`p-2 rounded-lg bg-white ${tip.color}`}>
                    <tip.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="jewellery-text font-medium mb-1">{tip.title}</h4>
                    <p className="jewellery-text text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Navigation and Search */}
          <div className="p-6 border-b border-jewellery-gold/20">
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedCategory === category.id
                          ? 'border-jewellery-gold bg-jewellery-silk'
                          : 'border-gray-200 hover:border-jewellery-gold/50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="jewellery-text text-sm font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </div>

              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search care guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                />
              </div>
            </div>
          </div>

          {/* Care Guides Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => {
                const categoryInfo = categories.find(cat => cat.id === guide.category);
                return (
                  <div
                    key={guide.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedGuide(guide)}
                  >
                    <div className="relative h-40 bg-gradient-to-br from-jewellery-silk to-jewellery-gold/10 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="h-16 w-16 text-jewellery-gold/20" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className={`text-xs ${getDifficultyColor(guide.difficulty)}`}>
                          {guide.difficulty}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="text-xs bg-white text-jewellery-gold">
                          {guide.duration}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {categoryInfo && (
                          <Badge variant="secondary" className="text-xs bg-jewellery-silk text-jewellery-gold">
                            <categoryInfo.icon className="h-3 w-3 mr-1" />
                            {categoryInfo.name}
                          </Badge>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{guide.frequency}</span>
                        </div>
                      </div>

                      <h3 className="jewellery-title font-semibold mb-2 group-hover:text-jewellery-gold transition-colors line-clamp-2">
                        {guide.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-jewellery-gold rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            {guide.author.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{guide.author.name}</p>
                          <p className="text-xs text-gray-500">{guide.author.expertise}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>{guide.steps.length} steps</span>
                        <span>{guide.tools.length} tools needed</span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 btn-jewellery-primary text-sm">
                          <BookOpen className="h-4 w-4 mr-1" />
                          View Guide
                        </button>
                        <button className="p-2 border border-gray-200 rounded-lg hover:border-jewellery-gold/50 transition-colors">
                          <Video className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredGuides.length === 0 && (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="jewellery-title text-xl mb-2">No care guides found</h3>
                <p className="jewellery-text text-gray-500 mb-6">
                  Try adjusting your search or category filter
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="btn-jewellery-secondary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Detailed Guide View */
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setSelectedGuide(null)}
              className="flex items-center gap-2 text-jewellery-gold hover:text-jewellery-gold-dark mb-4"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
              Back to Guides
            </button>

            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h1 className="jewellery-title-bold text-3xl mb-4">{selectedGuide.title}</h1>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge className={getDifficultyColor(selectedGuide.difficulty)}>
                    {selectedGuide.difficulty}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{selectedGuide.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{selectedGuide.frequency}</span>
                  </div>
                </div>

                <div className="bg-jewellery-silk p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-jewellery-gold rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {selectedGuide.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{selectedGuide.author.name}</h4>
                      <p className="text-sm text-gray-600">{selectedGuide.author.expertise}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-jewellery-gold text-jewellery-gold" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">Expert Guide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-jewellery-secondary">
                  <Download className="h-5 w-5 mr-2" />
                  PDF
                </button>
                <button className="btn-jewellery-secondary">
                  <Printer className="h-5 w-5 mr-2" />
                  Print
                </button>
              </div>
            </div>
          </div>

          {/* Materials and Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Gem className="h-5 w-5 text-jewellery-gold" />
                Materials Needed
              </h3>
              <ul className="space-y-2">
                {selectedGuide.materials.map((material, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Crown className="h-5 w-5 text-jewellery-gold" />
                Tools Required
              </h3>
              <ul className="space-y-2">
                {selectedGuide.tools.map((tool, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-6 mb-8">
            <h2 className="jewellery-subtitle text-xl">Step-by-Step Instructions</h2>
            {selectedGuide.steps.map((step, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex">
                  <div className="w-12 bg-jewellery-gold flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>

                    {step.tips && step.tips.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-5 w-5 text-blue-500" />
                          <h4 className="font-semibold text-blue-900">Pro Tips</h4>
                        </div>
                        <ul className="space-y-1">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm text-blue-800 flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.warnings && step.warnings.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <h4 className="font-semibold text-red-900">Important Warnings</h4>
                        </div>
                        <ul className="space-y-1">
                          {step.warnings.map((warning, warningIndex) => (
                            <li key={warningIndex} className="text-sm text-red-800 flex items-start gap-2">
                              <span className="text-red-500 mt-1">⚠</span>
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Tutorial */}
          <div className="bg-jewellery-silk border border-jewellery-gold/20 rounded-lg p-6 text-center">
            <Video className="h-12 w-12 text-jewellery-gold mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Video Tutorial Available</h3>
            <p className="text-gray-600 mb-4">
              Watch our expert demonstrate this process step-by-step
            </p>
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="btn-jewellery-primary mx-auto"
            >
              <Play className="h-5 w-5 mr-2" />
              {showVideo ? 'Hide' : 'Watch'} Video Tutorial
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareGuide;