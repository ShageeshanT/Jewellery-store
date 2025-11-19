"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Palette,
  Gem,
  Crown,
  Sparkles,
  Upload,
  Download,
  ZoomIn,
  RotateCw,
  Eye,
  Save,
  Send,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Calendar
} from 'lucide-react';

interface CustomizationStudioProps {
  className?: string;
}

export const CustomizationStudio: React.FC<CustomizationStudioProps> = ({
  className = ''
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedGemstone, setSelectedGemstone] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [customEngraving, setCustomEngraving] = useState('');
  const [uploadedDesign, setUploadedDesign] = useState<File | null>(null);
  const [budget, setBudget] = useState({ min: 1000, max: 10000 });

  const customizationSteps = [
    {
      id: 1,
      title: 'Design Style',
      description: 'Choose your preferred design style',
      icon: Palette
    },
    {
      id: 2,
      title: 'Metal Selection',
      description: 'Select your preferred metal',
      icon: Crown
    },
    {
      id: 3,
      title: 'Gemstone Choice',
      description: 'Choose your perfect gemstone',
      icon: Gem
    },
    {
      id: 4,
      title: 'Personalization',
      description: 'Add custom engravings and details',
      icon: Sparkles
    },
    {
      id: 5,
      title: 'Review & Order',
      description: 'Review your design and place your order',
      icon: CheckCircle
    }
  ];

  const designStyles = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Timeless and elegant designs',
      image: '/api/placeholder/200/200',
      features: ['Traditional', 'Elegant', 'Timeless']
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary and minimalist designs',
      image: '/api/placeholder/200/200',
      features: ['Minimalist', 'Clean Lines', 'Contemporary']
    },
    {
      id: 'vintage',
      name: 'Vintage',
      description: 'Antique-inspired romantic designs',
      image: '/api/placeholder/200/200',
      features: ['Romantic', 'Ornate', 'Detailed']
    },
    {
      id: 'art-deco',
      name: 'Art Deco',
      description: 'Geometric and bold designs',
      image: '/api/placeholder/200/200',
      features: ['Geometric', 'Bold', 'Luxurious']
    }
  ];

  const metalOptions = [
    {
      id: 'yellow-gold',
      name: 'Yellow Gold',
      description: 'Classic warm yellow gold',
      color: '#FFD700',
      karats: ['14K', '18K', '22K', '24K']
    },
    {
      id: 'white-gold',
      name: 'White Gold',
      description: 'Elegant white gold',
      color: '#F8F8FF',
      karats: ['14K', '18K']
    },
    {
      id: 'rose-gold',
      name: 'Rose Gold',
      description: 'Romantic pink-tinted gold',
      color: '#E0BFB8',
      karats: ['14K', '18K']
    },
    {
      id: 'platinum',
      name: 'Platinum',
      description: 'Premium white platinum',
      color: '#E5E4E2',
      karats: ['950', '900']
    }
  ];

  const gemstoneOptions = [
    {
      id: 'diamond',
      name: 'Diamond',
      description: 'Forever brilliant diamonds',
      color: 'transparent',
      shapes: ['Round', 'Princess', 'Emerald', 'Oval', 'Marquise', 'Pear']
    },
    {
      id: 'sapphire',
      name: 'Sapphire',
      description: 'Deep blue sapphires',
      color: '#0F52BA',
      shapes: ['Round', 'Oval', 'Emerald', 'Cushion']
    },
    {
      id: 'ruby',
      name: 'Ruby',
      description: 'Rich red rubies',
      color: '#E0115F',
      shapes: ['Round', 'Oval', 'Emerald', 'Cushion']
    },
    {
      id: 'emerald',
      name: 'Emerald',
      description: 'Vibrant green emeralds',
      color: '#50C878',
      shapes: ['Round', 'Emerald Cut', 'Oval']
    }
  ];

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="jewellery-title text-xl mb-4">Choose Your Design Style</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {designStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedStyle === style.id
                      ? 'border-jewellery-gold bg-jewellery-silk'
                      : 'border-gray-200 hover:border-jewellery-gold/50'
                  }`}
                >
                  <div className="aspect-square bg-jewellery-silk rounded-lg mb-3 flex items-center justify-center">
                    <Gem className="h-8 w-8 text-jewellery-gold/30" />
                  </div>
                  <h4 className="jewellery-subtitle text-sm">{style.name}</h4>
                  <p className="jewellery-text text-xs text-gray-600 mt-1">{style.description}</p>
                </button>
              ))}
            </div>

            {/* Design Upload */}
            <div className="border-t border-jewellery-gold/20 pt-6">
              <h4 className="jewellery-subtitle text-sm mb-3">Upload Your Design</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-jewellery-gold/50 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="jewellery-text text-sm mb-2">Drop your design here</p>
                <p className="jewellery-text text-xs text-gray-500">or click to browse</p>
                <button className="mt-4 btn-jewellery-secondary">
                  Browse Files
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="jewellery-title text-xl mb-4">Select Your Metal</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metalOptions.map((metal) => (
                <button
                  key={metal.id}
                  onClick={() => setSelectedMetal(metal.id)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedMetal === metal.id
                      ? 'border-jewellery-gold bg-jewellery-silk'
                      : 'border-gray-200 hover:border-jewellery-gold/50'
                  }`}
                >
                  <div
                    className="w-full h-12 rounded-full mb-3 border-2 border-gray-200"
                    style={{ backgroundColor: metal.color }}
                  ></div>
                  <h4 className="jewellery-subtitle text-sm">{metal.name}</h4>
                  <p className="jewellery-text text-xs text-gray-600">{metal.description}</p>
                </button>
              ))}
            </div>

            {/* Karat Selection */}
            {selectedMetal && selectedMetal !== 'platinum' && (
              <div className="border-t border-jewellery-gold/20 pt-6">
                <h4 className="jewellery-subtitle text-sm mb-3">Choose Karat</h4>
                <div className="flex gap-3">
                  {metalOptions
                    .find(m => m.id === selectedMetal)
                    ?.karats.map(karat => (
                      <button
                        key={karat}
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:border-jewellery-gold/50 transition-colors"
                      >
                        <span className="jewellery-text text-sm">{karat}K</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="jewellery-title text-xl mb-4">Choose Your Gemstone</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gemstoneOptions.map((gemstone) => (
                <button
                  key={gemstone.id}
                  onClick={() => setSelectedGemstone(gemstone.id)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedGemstone === gemstone.id
                      ? 'border-jewellery-gold bg-jewellery-silk'
                      : 'border-gray-200 hover:border-jewellery-gold/50'
                  }`}
                >
                  <div
                    className="w-full h-12 rounded-full mb-3 border-2 border-gray-200 flex items-center justify-center"
                    style={{ backgroundColor: gemstone.color }}
                  >
                    {gemstone.color === 'transparent' ? (
                      <div className="w-6 h-6 bg-white rounded-full shadow-sm"></div>
                    ) : null}
                  </div>
                  <h4 className="jewellery-subtitle text-sm">{gemstone.name}</h4>
                  <p className="jewellery-text text-xs text-gray-600">{gemstone.description}</p>
                </button>
              ))}
            </div>

            {/* Shape Selection */}
            {selectedGemstone && (
              <div className="border-t border-jewellery-gold/20 pt-6">
                <h4 className="jewellery-subtitle text-sm mb-3">Choose Shape</h4>
                <div className="flex flex-wrap gap-3">
                  {gemstoneOptions
                    .find(g => g.id === selectedGemstone)
                    ?.shapes.map((shape, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:border-jewellery-gold/50 transition-colors"
                      >
                        <span className="jewellery-text text-sm">{shape}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="jewellery-title text-xl mb-4">Personalize Your Piece</h3>

            {/* Engraving */}
            <div>
              <h4 className="jewellery-subtitle text-sm mb-3">Custom Engraving</h4>
              <textarea
                value={customEngraving}
                onChange={(e) => setCustomEngraving(e.target.value)}
                placeholder="Enter your engraving text..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                rows={3}
              />
              <p className="jewellery-text text-xs text-gray-500 mt-2">
                Max 30 characters. Special characters available.
              </p>
            </div>

            {/* Engraving Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="jewellery-subtitle text-sm mb-2">Font Style</h4>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none">
                  <option>Classic</option>
                  <option>Script</option>
                  <option>Modern</option>
                </select>
              </div>
              <div>
                <h4 className="jewellery-subtitle text-sm mb-2">Position</h4>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none">
                  <option>Inside Band</option>
                  <option>Outside Band</option>
                  <option>Back</option>
                </select>
              </div>
              <div>
                <h4 className="jewellery-subtitle text-sm mb-2">Size</h4>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <div>
                <h4 className="jewellery-subtitle text-sm mb-3">Additional Options</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="jewellery-text text-sm">Add special symbols</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="jewellery-text text-sm">Include date</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="jewellery-text text-sm">Coordinates location</span>
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <h4 className="jewellery-subtitle text-sm mb-2">Special Instructions</h4>
                <textarea
                  placeholder="Any special requests or notes..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="jewellery-title text-xl mb-4">Review Your Design</h3>

            {/* Design Summary */}
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="jewellery-subtitle text-sm mb-3">Design Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="jewellery-text text-sm">Style:</span>
                      <span className="jewellery-text text-sm font-medium">
                        {designStyles.find(s => s.id === selectedStyle)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="jewellery-text text-sm">Metal:</span>
                      <span className="jewellery-text text-sm font-medium">
                        {metalOptions.find(m => m.id === selectedMetal)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="jewellery-text text-sm">Gemstone:</span>
                      <span className="jewellery-text text-sm font-medium">
                        {gemstoneOptions.find(g => g.id === selectedGemstone)?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="jewellery-subtitle text-sm mb-3">Personalization</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="jewellery-text text-sm">Engraving:</span>
                      <span className="jewellery-text text-sm font-medium truncate">
                        {customEngraving || 'None'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="jewellery-text text-sm">Budget:</span>
                      <span className="jewellery-text text-sm font-medium">
                        ${budget.min.toLocaleString()} - ${budget.max.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
              <h4 className="jewellery-subtitle text-sm mb-4">Creation Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-jewellery-gold text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <p className="jewellery-text text-sm font-medium">Design Review</p>
                    <p className="jewellery-text text-xs text-gray-600">Our team reviews your design</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-jewellery-gold" />
                    <span className="jewellery-text text-xs text-gray-600">2-3 days</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-jewellery-gold text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <p className="jewellery-text text-sm font-medium">3D Rendering</p>
                    <p className="jewellery-text text-xs text-gray-600">See your piece in 3D</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-jewellery-gold" />
                    <span className="jewellery-text text-xs text-gray-600">3-5 days</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-jewellery-gold text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <p className="jewellery-text text-sm font-medium">Crafting</p>
                    <p className="jewellery-text text-xs text-gray-600">Master artisans create your piece</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-jewellery-gold" />
                    <span className="jewellery-text text-xs text-gray-600">2-3 weeks</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-jewellery-gold text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <div>
                    <p className="jewellery-text text-sm font-medium">Quality Control</p>
                    <p className="jewellery-text text-xs text-gray-600">Final inspection & certification</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-jewellery-gold" />
                    <span className="jewellery-text text-xs text-gray-600">1-2 days</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-jewellery-gold/10">
                <Calendar className="h-5 w-5 text-jewellery-gold" />
                <div>
                  <p className="jewellery-text text-sm font-medium">Estimated Delivery</p>
                  <p className="jewellery-text text-xs text-gray-600">
                    {selectedStyle && selectedMetal && selectedGemstone ? '4-6 weeks' : '6-8 weeks'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="btn-jewellery-primary flex-1">
                <Send className="h-5 w-5 mr-2" />
                Request Quote
              </button>
              <button className="btn-jewellery-secondary">
                <Save className="h-5 w-5 mr-2" />
                Save Design
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-jewellery-gold/10 to-jewellery-silk p-6 border-b border-jewellery-gold/20">
        <h2 className="jewellery-title-bold text-2xl mb-2">Custom Design Studio</h2>
        <p className="jewellery-text text-gray-600">
          Create your unique piece of jewellery with our expert guidance and craftsmanship
        </p>
      </div>

      {/* Steps Navigation */}
      <div className="border-b border-jewellery-gold/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto">
            {customizationSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 whitespace-nowrap cursor-pointer ${
                  activeStep >= step.id ? 'text-jewellery-gold' : 'text-gray-400'
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                    activeStep >= step.id
                      ? 'border-jewellery-gold bg-jewellery-gold text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                  <div className="text-xs font-medium">{step.id}</div>
                </div>
                <div>
                  <h3 className="jewellery-subtitle text-sm">{step.title}</h3>
                  <p className="jewellery-text text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Step Progress Bar */}
          <div className="hidden md:block">
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-jewellery-gold to-jewellery-emerald transition-all duration-300"
                style={{ width: `${(activeStep / customizationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderStepContent()}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-jewellery-gold/20 p-6 bg-jewellery-silk">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            disabled={activeStep === 1}
            className="btn-jewellery-secondary disabled:opacity-50"
          >
            Previous Step
          </button>
          <div className="flex gap-2">
            <button className="btn-jewellery-secondary">
              <HelpCircle className="h-5 w-5 mr-2" />
              Get Help
            </button>
            <button className="btn-jewellery-secondary">
              <Save className="h-5 w-5 mr-2" />
              Save Progress
            </button>
          </div>
          <button
            onClick={() => setActiveStep(Math.min(customizationSteps.length, activeStep + 1))}
            disabled={activeStep === customizationSteps.length}
            className="btn-jewellery-primary disabled:opacity-50"
          >
            {activeStep === customizationSteps.length ? 'Complete Design' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationStudio;