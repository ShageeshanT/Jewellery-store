"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  Star,
  Gem,
  Crown,
  Sparkles,
  Video,
  Building,
  ChevronRight,
  Filter
} from 'lucide-react';

interface Consultant {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  reviews: number;
  languages: string[];
  image?: string;
  bio: string;
}

interface Appointment {
  id: string;
  consultantId: string;
  date: string;
  time: string;
  type: 'in-person' | 'virtual';
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface AppointmentBookingProps {
  consultants: Consultant[];
  className?: string;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  consultants,
  className = ''
}) => {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'virtual'>('virtual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'general'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const appointmentTypes = [
    {
      id: 'virtual',
      name: 'Virtual Consultation',
      description: 'Connect with our experts via video call from anywhere',
      icon: Video,
      duration: 45,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'in-person',
      name: 'In-Store Appointment',
      description: 'Visit our showroom for a personalized experience',
      icon: Building,
      duration: 60,
      color: 'from-jewellery-gold to-jewellery-gold-dark'
    }
  ];

  const consultationTypes = [
    { value: 'general', label: 'General Consultation', description: 'Browse our collection and get expert advice' },
    { value: 'custom', label: 'Custom Design', description: 'Create a unique piece tailored to your vision' },
    { value: 'engagement', label: 'Engagement Ring', description: 'Find the perfect ring for your proposal' },
    { value: 'wedding', label: 'Wedding Jewellery', description: 'Complete your bridal look with custom pieces' },
    { value: 'investment', label: 'Investment Guidance', description: 'Learn about jewellery as an investment' },
    { value: 'appraisal', label: 'Jewellery Appraisal', description: 'Get your pieces professionally evaluated' }
  ];

  const timeSlots = [
    '09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM',
    '12:00 PM', '12:45 PM', '01:30 PM', '02:15 PM',
    '03:00 PM', '03:45 PM', '04:30 PM', '05:15 PM'
  ];

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          }),
          isAvailable: Math.random() > 0.3 // Simulate availability
        });
      }
    }

    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real implementation, this would send data to the backend
    console.log('Appointment scheduled:', {
      consultant: selectedConsultant,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      formData
    });

    setIsSubmitting(false);
    setCurrentStep(4); // Success step
  };

  const resetBooking = () => {
    setCurrentStep(1);
    setSelectedConsultant(null);
    setSelectedDate('');
    setSelectedTime('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      interest: 'general'
    });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-jewellery-gold/10 to-jewellery-silk p-6 border-b border-jewellery-gold/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-jewellery-gold rounded-full flex items-center justify-center">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="jewellery-title-bold text-3xl">Book a Consultation</h2>
            <p className="jewellery-text text-gray-600">
              Schedule a personalized session with our jewellery experts
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                currentStep >= step
                  ? 'bg-jewellery-gold text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-4 transition-colors ${
                  currentStep > step ? 'bg-jewellery-gold' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {currentStep === 1 && (
          /* Step 1: Choose Consultation Type */
          <div className="space-y-6">
            <h3 className="jewellery-subtitle text-xl mb-6">Select Consultation Type</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointmentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setAppointmentType(type.id as 'in-person' | 'virtual');
                    setCurrentStep(2);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    appointmentType === type.id
                      ? 'border-jewellery-gold bg-jewellery-silk'
                      : 'border-gray-200 hover:border-jewellery-gold/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-4`}>
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="jewellery-title text-lg mb-2">{type.name}</h4>
                  <p className="jewellery-text text-sm text-gray-600 mb-3">{type.description}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="jewellery-text text-sm text-gray-500">
                      {type.duration} minutes
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-jewellery-silk p-4 rounded-lg border border-jewellery-gold/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-jewellery-gold" />
                <span className="jewellery-text text-sm">
                  All consultations include expert advice and personalized recommendations
                </span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          /* Step 2: Choose Consultant & Time */
          <div className="space-y-8">
            <div>
              <h3 className="jewellery-subtitle text-xl mb-6">Select Your Expert</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultants.map((consultant) => (
                  <button
                    key={consultant.id}
                    onClick={() => setSelectedConsultant(consultant)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedConsultant?.id === consultant.id
                        ? 'border-jewellery-gold bg-jewellery-silk'
                        : 'border-gray-200 hover:border-jewellery-gold/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-jewellery-silk rounded-full flex items-center justify-center">
                        <Crown className="h-6 w-6 text-jewellery-gold" />
                      </div>
                      <div className="flex-1">
                        <h4 className="jewellery-text font-semibold">{consultant.name}</h4>
                        <p className="jewellery-text text-sm text-gray-600 mb-2">{consultant.title}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(consultant.rating)
                                    ? 'fill-jewellery-gold text-jewellery-gold'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="jewellery-text text-xs text-gray-500">
                            {consultant.rating} ({consultant.reviews})
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {consultant.expertise.slice(0, 2).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-jewellery-silk text-jewellery-gold"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedConsultant && (
              <div>
                <h3 className="jewellery-subtitle text-xl mb-6">Choose Date & Time</h3>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="jewellery-text font-medium mb-3 block">Select Date</label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date.value}
                        onClick={() => date.isAvailable && setSelectedDate(date.value)}
                        disabled={!date.isAvailable}
                        className={`p-3 rounded-lg border text-sm transition-colors ${
                          !date.isAvailable
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50'
                            : selectedDate === date.value
                            ? 'border-jewellery-gold bg-jewellery-silk'
                            : 'border-gray-200 hover:border-jewellery-gold/50'
                        }`}
                      >
                        <div className="text-xs font-medium">{date.label.split(',')[0]}</div>
                        <div className="text-xs">{date.label.split(' ')[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <label className="jewellery-text font-medium mb-3 block">Select Time</label>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-lg border text-sm transition-colors ${
                            selectedTime === time
                              ? 'border-jewellery-gold bg-jewellery-silk'
                              : 'border-gray-200 hover:border-jewellery-gold/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="btn-jewellery-secondary"
              >
                Back
              </button>
              {selectedConsultant && selectedDate && selectedTime && (
                <button
                  onClick={() => setCurrentStep(3)}
                  className="btn-jewellery-primary"
                >
                  Continue
                  <ChevronRight className="h-5 w-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          /* Step 3: Personal Information */
          <div className="max-w-2xl mx-auto">
            <h3 className="jewellery-subtitle text-xl mb-6">Your Information</h3>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="jewellery-text font-medium mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="jewellery-text font-medium mb-2 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="jewellery-text font-medium mb-2 block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="jewellery-text font-medium mb-2 block">Consultation Interest</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20 bg-white"
                  >
                    {consultationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="jewellery-text font-medium mb-2 block">Additional Notes</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                  placeholder="Tell us about your jewellery preferences, budget range, or any specific pieces you're interested in..."
                />
              </div>

              {/* Appointment Summary */}
              <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
                <h4 className="jewellery-text font-semibold mb-4">Appointment Summary</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-jewellery-gold" />
                    <div>
                      <p className="jewellery-text text-sm text-gray-600">Expert</p>
                      <p className="jewellery-text font-medium">{selectedConsultant?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-jewellery-gold" />
                    <div>
                      <p className="jewellery-text text-sm text-gray-600">Date & Time</p>
                      <p className="jewellery-text font-medium">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })} at {selectedTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {appointmentType === 'virtual' ? (
                      <Video className="h-5 w-5 text-jewellery-gold" />
                    ) : (
                      <Building className="h-5 w-5 text-jewellery-gold" />
                    )}
                    <div>
                      <p className="jewellery-text text-sm text-gray-600">Type</p>
                      <p className="jewellery-text font-medium capitalize">{appointmentType} Consultation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn-jewellery-secondary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-jewellery-primary"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Confirm Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 4 && (
          /* Success Step */
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-jewellery-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="jewellery-title-bold text-2xl mb-4">Appointment Confirmed!</h3>
            <p className="jewellery-text text-gray-600 mb-8 max-w-md mx-auto">
              Your consultation with {selectedConsultant?.name} has been scheduled successfully.
              You'll receive a confirmation email shortly with all the details.
            </p>

            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20 max-w-md mx-auto mb-8">
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-jewellery-gold" />
                  <div>
                    <p className="jewellery-text text-sm text-gray-600">Date & Time</p>
                    <p className="jewellery-text font-medium">
                      {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })} at {selectedTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-jewellery-gold" />
                  <div>
                    <p className="jewellery-text text-sm text-gray-600">Expert</p>
                    <p className="jewellery-text font-medium">{selectedConsultant?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {appointmentType === 'virtual' ? (
                    <Video className="h-5 w-5 text-jewellery-gold" />
                  ) : (
                    <MapPin className="h-5 w-5 text-jewellery-gold" />
                  )}
                  <div>
                    <p className="jewellery-text text-sm text-gray-600">Location</p>
                    <p className="jewellery-text font-medium capitalize">
                      {appointmentType === 'virtual' ? 'Video Call Link' : '123 Luxury Lane, Beverly Hills, CA'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-jewellery-primary">
                <Calendar className="h-5 w-5 mr-2" />
                Add to Calendar
              </button>
              <button onClick={resetBooking} className="btn-jewellery-secondary">
                Book Another Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;