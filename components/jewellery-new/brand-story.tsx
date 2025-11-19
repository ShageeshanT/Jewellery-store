"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Award,
  Crown,
  Gem,
  Clock,
  Users,
  MapPin,
  Star,
  ChevronRight,
  Calendar,
  Building,
  Flag,
  Sparkles,
  Hand,
  Shield,
  TrendingUp,
  Globe,
  Zap,
  Quote,
  Play,
  Download,
  Share2
} from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  type: 'milestone' | 'achievement' | 'expansion' | 'innovation';
  details?: string[];
}

interface Founder {
  name: string;
  role: string;
  bio: string;
  image?: string;
  quote?: string;
  expertise: string[];
}

interface Craftsmanship {
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  image?: string;
}

interface BrandStoryProps {
  className?: string;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState<'story' | 'timeline' | 'craftsmanship' | 'values'>('story');

  const timelineEvents: TimelineEvent[] = [
    {
      year: '1975',
      title: 'The Beginning',
      description: 'Founded by master jeweler Marcus Sterling in a small workshop in Beverly Hills',
      type: 'milestone',
      details: [
        'Started with just 3 artisans',
        'First collection focused on custom engagement rings',
        'Initial investment: $50,000'
      ]
    },
    {
      year: '1982',
      title: 'First Major Recognition',
      description: 'Received the prestigious Jewelers of America Design Excellence Award',
      type: 'achievement',
      details: [
        'Won for our "Eternal Love" diamond necklace design',
        'Featured in major fashion magazines',
        'Established our reputation for exceptional craftsmanship'
      ]
    },
    {
      year: '1988',
      title: 'International Expansion',
      description: 'Opened our first flagship store in Paris, France',
      type: 'expansion',
      details: [
        'Located on Rue de la Paix',
        'Partnership with French diamond merchants',
        'Introduction of European clientele'
      ]
    },
    {
      year: '1995',
      title: 'Innovation in Design',
      description: 'Pioneered the proprietary "Sterling Cut" diamond faceting technique',
      type: 'innovation',
      details: [
        '15 years in development',
        'Increases diamond brilliance by 23%',
        'Patented technology now industry standard'
      ]
    },
    {
      year: '2002',
      title: 'Sustainable Practices',
      description: 'Launched our "Ethical Elegance" initiative for responsible sourcing',
      type: 'milestone',
      details: [
        '100% conflict-free diamonds guarantee',
        'Fair trade gold sourcing',
        'Environmental protection partnerships'
      ]
    },
    {
      year: '2010',
      title: 'Digital Transformation',
      description: 'Launched our e-commerce platform and virtual try-on technology',
      type: 'innovation',
      details: [
        'First luxury jeweler with AR try-on',
        'Global shipping to 120+ countries',
        'Digital design consultations'
      ]
    },
    {
      year: '2018',
      title: 'Heritage Collection',
      description: 'Celebrated our heritage with a retrospective collection of iconic designs',
      type: 'achievement',
      details: [
        '50-piece limited edition collection',
        'Pieces exhibited in major museums',
        'Collection sold out in 48 hours'
      ]
    },
    {
      year: '2024',
      title: 'Half Century of Excellence',
      description: 'Celebrating 50 years of luxury jewellery craftsmanship',
      type: 'milestone',
      details: [
        'Served over 500,000 satisfied clients',
        'Created over 100,000 unique pieces',
        'Global presence in 25 countries'
      ]
    }
  ];

  const founders: Founder[] = [
    {
      name: 'Marcus Sterling',
      role: 'Founder & Chairman Emeritus',
      bio: 'A third-generation jeweler with over 60 years of experience in creating exquisite pieces that combine traditional craftsmanship with innovative design.',
      quote: 'Every piece of jewellery tells a story. Our job is to make sure it\'s a beautiful one.',
      expertise: ['Diamond Grading', 'Custom Design', 'Business Leadership', 'Craftsmanship']
    },
    {
      name: 'Isabella Sterling',
      role: 'Creative Director',
      bio: 'Graduated from Central Saint Martins with honors in jewellery design, bringing fresh perspectives while honoring our family\'s legacy of excellence.',
      quote: 'Jewellery is wearable art. Each piece must be perfect from every angle.',
      expertise: ['Contemporary Design', 'Gemstone Selection', 'Fashion Trends', 'Art Direction']
    }
  ];

  const craftsmanship: Craftsmanship[] = [
    {
      title: 'Hand-Selected Materials',
      description: 'We source only the finest gemstones and precious metals from trusted suppliers worldwide.',
      icon: Gem,
      features: [
        'GIA certified diamonds only',
        'Conflict-free guarantee',
        'Hand-picked gemstones',
        'Premium precious metals'
      ]
    },
    {
      title: 'Master Artisans',
      description: 'Our team of skilled craftsmen brings decades of experience to every piece they create.',
      icon: Hand,
      features: [
        '25+ years average experience',
        'Traditional techniques',
        'Modern technology integration',
        'Continuous training programs'
      ]
    },
    {
      title: 'Rigorous Quality Control',
      description: 'Every piece undergoes multiple inspection stages to ensure perfection.',
      icon: Shield,
      features: [
        '7-point inspection process',
        'Independent certification',
        'Lifetime warranty',
        'Free cleaning and inspection'
      ]
    },
    {
      title: 'Custom Design Excellence',
      description: 'From concept to creation, we bring your unique vision to life.',
      icon: Sparkles,
      features: [
        '3D design technology',
        'Personal consultation',
        'Iterative design process',
        'One-of-a-kind pieces'
      ]
    }
  ];

  const companyValues = [
    {
      title: 'Craftsmanship',
      description: 'Uncompromising dedication to quality and attention to detail in every piece.',
      icon: Award,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Integrity',
      description: 'Transparent business practices and honest relationships with clients and partners.',
      icon: Heart,
      color: 'from-red-500 to-pink-600'
    },
    {
      title: 'Innovation',
      description: 'Continuously pushing boundaries while respecting traditional techniques.',
      icon: Zap,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Heritage',
      description: 'Honoring our legacy while building a sustainable future for generations to come.',
      icon: Clock,
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'milestone': return 'bg-jewellery-gold text-white';
      case 'achievement': return 'bg-jewellery-emerald text-white';
      case 'expansion': return 'bg-blue-500 text-white';
      case 'innovation': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const stats = [
    { label: 'Years of Excellence', value: '50+', icon: Clock },
    { label: 'Clients Served', value: '500K+', icon: Users },
    { label: 'Countries', value: '25+', icon: Globe },
    { label: 'Master Artisans', value: '120+', icon: Hand },
    { label: 'Unique Designs', value: '100K+', icon: Sparkles },
    { label: 'Industry Awards', value: '47', icon: Award }
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-jewellery-gold/10 to-jewellery-silk p-6 border-b border-jewellery-gold/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-jewellery-gold rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="jewellery-title-bold text-3xl">Our Heritage</h2>
              <p className="jewellery-text text-gray-600">
                A legacy of luxury, craftsmanship, and innovation since 1975
              </p>
            </div>
          </div>
          <Badge className="jewellery-badge bg-jewellery-gold">
            50 Years of Excellence
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <stat.icon className="h-4 w-4 text-jewellery-gold" />
                <span className="jewellery-title-bold text-xl">{stat.value}</span>
              </div>
              <p className="jewellery-text text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-jewellery-gold/20">
        <div className="flex flex-wrap gap-2 p-6">
          {[
            { id: 'story', label: 'Our Story', icon: Heart },
            { id: 'timeline', label: 'Timeline', icon: Clock },
            { id: 'craftsmanship', label: 'Craftsmanship', icon: Award },
            { id: 'values', label: 'Values', icon: Shield }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === tab.id
                  ? 'bg-jewellery-gold text-white'
                  : 'text-gray-600 hover:text-jewellery-gold hover:bg-jewellery-silk'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeSection === 'story' && (
          <div className="space-y-8">
            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-jewellery-silk to-jewellery-gold/5 p-8 rounded-xl border border-jewellery-gold/20">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="jewellery-title-bold text-2xl mb-4">Our Mission</h3>
                <p className="jewellery-text text-lg leading-relaxed text-gray-700 mb-6">
                  To create timeless jewellery that celebrates life\'s most precious moments,
                  combining unparalleled craftsmanship with ethical sourcing and innovative design
                  to become the most trusted name in luxury jewellery worldwide.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-jewellery-primary">
                    <Play className="h-5 w-5 mr-2" />
                    Watch Our Story
                  </button>
                  <button className="btn-jewellery-secondary">
                    <Download className="h-5 w-5 mr-2" />
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>

            {/* Founders */}
            <div>
              <h3 className="jewellery-subtitle text-xl mb-6">Meet Our Founders</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {founders.map((founder, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-jewellery-silk rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-jewellery-gold" />
                      </div>
                      <div className="flex-1">
                        <h4 className="jewellery-title text-lg font-semibold">{founder.name}</h4>
                        <p className="jewellery-text text-sm text-gray-600 mb-2">{founder.role}</p>
                        <p className="jewellery-text text-gray-700">{founder.bio}</p>
                      </div>
                    </div>

                    {founder.quote && (
                      <blockquote className="border-l-4 border-jewellery-gold pl-4 my-4 italic text-gray-600">
                        "{founder.quote}"
                      </blockquote>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {founder.expertise.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs bg-jewellery-silk text-jewellery-gold"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Overview */}
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
              <h3 className="jewellery-subtitle text-lg mb-4">About Sterling Jewels</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Building className="h-5 w-5 text-jewellery-gold" />
                    <h4 className="font-semibold">Global Presence</h4>
                  </div>
                  <p className="jewellery-text text-sm text-gray-600">
                    From our Beverly Hills headquarters to boutiques in Paris, Tokyo, and Dubai,
                    we serve discerning clients worldwide with personalized service and exceptional pieces.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Flag className="h-5 w-5 text-jewellery-gold" />
                    <h4 className="font-semibold">Industry Leadership</h4>
                  </div>
                  <p className="jewellery-text text-sm text-gray-600">
                    We\'ve led innovations in diamond cutting, sustainable sourcing, and digital
                    jewellery experiences that have shaped the entire luxury jewellery industry.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="h-5 w-5 text-jewellery-gold" />
                    <h4 className="font-semibold">Client Relationships</h4>
                  </div>
                  <p className="jewellery-text text-sm text-gray-600">
                    Building lasting relationships across generations, we\'re proud to be part
                    of our clients\' most important life moments, from engagements to anniversaries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'timeline' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="jewellery-subtitle text-xl mb-2">Our Journey Through Time</h3>
              <p className="jewellery-text text-gray-600">
                Five decades of innovation, growth, and excellence in luxury jewellery
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-jewellery-gold/20"></div>

              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Timeline Dot */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold ${getEventTypeColor(event.type)} z-10`}>
                      {event.year.slice(-2)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="jewellery-title-bold text-2xl text-jewellery-gold mr-4">
                            {event.year}
                          </span>
                          <h4 className="jewellery-title text-lg font-semibold inline">
                            {event.title}
                          </h4>
                        </div>
                        <Badge className={getEventTypeColor(event.type)} className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="jewellery-text text-gray-700 mb-4">{event.description}</p>

                      {event.details && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {event.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start gap-2">
                              <Star className="h-4 w-4 text-jewellery-gold mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'craftsmanship' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="jewellery-subtitle text-xl mb-2">The Art of Excellence</h3>
              <p className="jewellery-text text-gray-600">
                Where traditional craftsmanship meets modern innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {craftsmanship.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-jewellery-silk to-jewellery-gold/10 flex items-center justify-center">
                    <item.icon className="h-12 w-12 text-jewellery-gold/30" />
                  </div>
                  <div className="p-6">
                    <h4 className="jewellery-title text-lg font-semibold mb-3">{item.title}</h4>
                    <p className="jewellery-text text-gray-600 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-jewellery-gold flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Craftsmanship Process */}
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
              <h3 className="jewellery-subtitle text-lg mb-6">Our Creation Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Concept & Design',
                    description: 'Personal consultation and 3D modeling'
                  },
                  {
                    step: '2',
                    title: 'Material Selection',
                    description: 'Hand-picked gemstones and metals'
                  },
                  {
                    step: '3',
                    title: 'Artisan Creation',
                    description: 'Handcrafted by master jewelers'
                  },
                  {
                    step: '4',
                    title: 'Quality Assurance',
                    description: 'Rigorous inspection and certification'
                  }
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-jewellery-gold text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                      {step.step}
                    </div>
                    <h4 className="jewellery-text font-semibold mb-2">{step.title}</h4>
                    <p className="jewellery-text text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'values' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="jewellery-subtitle text-xl mb-2">Our Core Values</h3>
              <p className="jewellery-text text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyValues.map((value, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="jewellery-title text-lg font-semibold mb-3">{value.title}</h4>
                  <p className="jewellery-text text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>

            {/* Sustainability Commitment */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <h3 className="jewellery-subtitle text-lg mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Our Environmental Commitment
              </h3>
              <p className="jewellery-text text-gray-700 mb-4">
                We are deeply committed to environmental sustainability and ethical business practices.
                Our commitment includes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  '100% conflict-free diamonds and gemstones',
                  'Recycled precious metals when possible',
                  'Carbon-neutral operations by 2025',
                  'Support for mining communities',
                  'Sustainable packaging solutions',
                  'Partnership with environmental organizations'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Impact */}
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
              <h3 className="jewellery-subtitle text-lg mb-4">Community & Philanthropy</h3>
              <p className="jewellery-text text-gray-700 mb-4">
                We believe in giving back to the communities that have supported us throughout our journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Education',
                    description: 'Supporting jewellery design schools and apprenticeship programs'
                  },
                  {
                    title: 'Healthcare',
                    description: 'Partnering with health initiatives in mining communities'
                  },
                  {
                    title: 'Arts & Culture',
                    description: 'Sponsoring exhibitions and preserving traditional craftsmanship'
                  }
                ].map((initiative, index) => (
                  <div key={index}>
                    <h4 className="jewellery-text font-semibold mb-2">{initiative.title}</h4>
                    <p className="jewellery-text text-sm text-gray-600">{initiative.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandStory;