"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Upload,
  Camera,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Sparkles,
  Gem,
  Wrench,
  Palette,
  Shield
} from 'lucide-react';

interface ServiceRequestFormProps {
  onSubmit?: (data: any) => void;
  initialData?: any;
}

const serviceTypes = [
  {
    value: 'repair',
    label: 'Jewellery Repair',
    description: 'Fix broken chains, clasps, settings',
    icon: Wrench,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    value: 'resizing',
    label: 'Ring Resizing',
    description: 'Make rings larger or smaller',
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    value: 'polishing',
    label: 'Polishing & Cleaning',
    description: 'Restore shine and remove scratches',
    icon: Gem,
    color: 'bg-green-100 text-green-600'
  },
  {
    value: 'custom_design',
    label: 'Custom Design',
    description: 'Create a unique piece from scratch',
    icon: Palette,
    color: 'bg-pink-100 text-pink-600'
  },
  {
    value: 'appraisal',
    label: 'Appraisal & Insurance',
    description: 'Professional valuation and documentation',
    icon: Shield,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    value: 'engraving',
    label: 'Engraving',
    description: 'Personalize with custom engravings',
    icon: FileText,
    color: 'bg-red-100 text-red-600'
  }
];

const urgencyLevels = [
  { value: 'low', label: 'Low Priority (2-3 weeks)', description: 'No rush, standard timeline' },
  { value: 'medium', label: 'Medium Priority (1-2 weeks)', description: 'Standard service timeline' },
  { value: 'high', label: 'High Priority (1 week)', description: 'Expedited service available' },
  { value: 'urgent', label: 'Urgent (3-5 days)', description: 'Rush service with additional fee' }
];

export const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = useState({
    // Service Details
    type: initialData?.type || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    urgency: initialData?.urgency || 'medium',

    // Customer Information
    customerInfo: {
      firstName: initialData?.customerInfo?.firstName || '',
      lastName: initialData?.customerInfo?.lastName || '',
      email: initialData?.customerInfo?.email || '',
      phone: initialData?.customerInfo?.phone || '',
    },

    // Product Information
    productInfo: {
      name: initialData?.productInfo?.name || '',
      brand: initialData?.productInfo?.brand || '',
      serialNumber: initialData?.productInfo?.serialNumber || '',
      purchaseDate: initialData?.productInfo?.purchaseDate || '',
      estimatedValue: initialData?.productInfo?.estimatedValue || '',
      description: initialData?.productInfo?.description || ''
    },

    // Images
    images: [] as File[],

    // Preferences
    communicationPreferences: {
      preferredContact: 'email',
      emailUpdates: true,
      smsUpdates: false
    },

    // Agreement
    agreedToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{name: string; url: string}>>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setErrors(prev => ({
        ...prev,
        images: 'Please upload only image files under 10MB'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }));

      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.type) newErrors.type = 'Please select a service type';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (!formData.customerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.customerInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append form fields
      Object.keys(formData).forEach(key => {
        if (key === 'customerInfo' || key === 'communicationPreferences') {
          submitData.append(key, JSON.stringify(formData[key as keyof typeof formData]));
        } else if (key !== 'images') {
          submitData.append(key, formData[key as keyof typeof formData]);
        }
      });

      // Append images
      formData.images.forEach((file, index) => {
        submitData.append(`images[${index}]`, file);
      });

      // Submit the form
      const response = await fetch('/api/service-tickets', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        onSubmit?.(result);
      } else {
        setErrors({ submit: result.message || 'Failed to submit request' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceType = serviceTypes.find(type => type.value === formData.type);

  if (submitted) {
    return (
      <Card className="luxury-card max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="luxury-heading-bold text-2xl mb-4">Request Submitted Successfully!</h3>
          <p className="luxury-text text-muted-foreground mb-6">
            Thank you for choosing Luxuria! Our team will review your request and contact you within 24 hours.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left">
            <h4 className="luxury-subheading mb-4">What happens next?</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>Our team reviews your request within 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>You'll receive a detailed quote and timeline</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>Work begins upon your approval</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span>Your jewellery is returned, beautifully restored</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()} variant="outline">
              Submit Another Request
            </Button>
            <Button onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="luxury-card max-w-4xl mx-auto">
      <CardHeader className="pb-6">
        <CardTitle className="luxury-heading-bold text-2xl text-center">
          Jewellery Service Request
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Our master jewellers are here to help with repairs, custom designs, and more
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Service Type Selection */}
          <div>
            <label className="luxury-subheading text-sm font-medium mb-4 block">
              What type of service do you need?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange('type', type.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.type === type.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{type.label}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.type && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {errors.type}
              </p>
            )}
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="luxury-subheading text-sm font-medium mb-2 block">
                Service Title
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Brief description of what you need"
                className="luxury-input"
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-2">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="luxury-subheading text-sm font-medium mb-2 block">
                Urgency
              </label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger className="luxury-input">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div>
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-muted-foreground">{level.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="luxury-subheading text-sm font-medium mb-2 block">
              Detailed Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Please describe your request in detail. Include any specific requirements, concerns, or questions you may have."
              rows={4}
              className="luxury-input resize-none"
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-2">{errors.description}</p>
            )}
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="luxury-subheading text-sm font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">First Name</label>
                <Input
                  value={formData.customerInfo.firstName}
                  onChange={(e) => handleNestedInputChange('customerInfo', 'firstName', e.target.value)}
                  className="luxury-input"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-2">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Last Name</label>
                <Input
                  value={formData.customerInfo.lastName}
                  onChange={(e) => handleNestedInputChange('customerInfo', 'lastName', e.target.value)}
                  className="luxury-input"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-2">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  type="email"
                  value={formData.customerInfo.email}
                  onChange={(e) => handleNestedInputChange('customerInfo', 'email', e.target.value)}
                  className="luxury-input"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-2">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.customerInfo.phone}
                  onChange={(e) => handleNestedInputChange('customerInfo', 'phone', e.target.value)}
                  placeholder="(Optional) For urgent updates"
                  className="luxury-input"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <h3 className="luxury-subheading text-sm font-medium">Jewellery Information (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Jewellery Type/Name</label>
                <Input
                  value={formData.productInfo.name}
                  onChange={(e) => handleNestedInputChange('productInfo', 'name', e.target.value)}
                  placeholder="e.g., Diamond Engagement Ring"
                  className="luxury-input"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Brand/Designer</label>
                <Input
                  value={formData.productInfo.brand}
                  onChange={(e) => handleNestedInputChange('productInfo', 'brand', e.target.value)}
                  placeholder="e.g., Tiffany & Co., Cartier"
                  className="luxury-input"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Serial/Engraving Number</label>
                <Input
                  value={formData.productInfo.serialNumber}
                  onChange={(e) => handleNestedInputChange('productInfo', 'serialNumber', e.target.value)}
                  placeholder="If available"
                  className="luxury-input"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Estimated Value</label>
                <Input
                  value={formData.productInfo.estimatedValue}
                  onChange={(e) => handleNestedInputChange('productInfo', 'estimatedValue', e.target.value)}
                  placeholder="For insurance purposes"
                  className="luxury-input"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="luxury-subheading text-sm font-medium">Upload Images</h3>
            <p className="text-sm text-muted-foreground">
              Upload clear photos of your jewellery (front, back, side views). Maximum 5 images, 10MB each.
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4" />
                Choose Images
              </label>
              <p className="text-sm text-muted-foreground mt-2">
                or drag and drop files here
              </p>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <p className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {errors.images}
              </p>
            )}
          </div>

          {/* Communication Preferences */}
          <div className="space-y-4">
            <h3 className="luxury-subheading text-sm font-medium">Communication Preferences</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.communicationPreferences.emailUpdates}
                  onChange={(e) => handleNestedInputChange('communicationPreferences', 'emailUpdates', e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm">Email updates about my service request</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.communicationPreferences.smsUpdates}
                  onChange={(e) => handleNestedInputChange('communicationPreferences', 'smsUpdates', e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm">SMS updates (if phone number provided)</span>
              </label>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="space-y-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.agreedToTerms}
                onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                className="rounded border-border mt-1"
              />
              <span className="text-sm text-muted-foreground">
                I agree to Luxuria's{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                . I understand that the final quote and timeline will be provided after review.
              </span>
            </label>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="luxury-button-primary min-w-[200px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                'Submit Service Request'
              )}
            </Button>
          </div>

          {/* Global Error */}
          {errors.submit && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3">
              <AlertCircle className="h-5 w-5" />
              {errors.submit}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestForm;