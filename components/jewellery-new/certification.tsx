"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Award,
  CheckCircle,
  Search,
  FileText,
  Download,
  Camera,
  Upload,
  Zap,
  Star,
  Clock,
  Eye,
  AlertCircle,
  Info,
  ExternalLink,
  Printer,
  Mail,
  QrCode,
  Hash,
  Gem,
  Crown,
  Certificate,
  Globe,
  Users,
  TrendingUp
} from 'lucide-react';

interface Certification {
  id: string;
  certificateNumber: string;
  type: 'GIA' | 'AGS' | 'EGL' | 'HRD' | 'IGI' | 'Internal';
  issueDate: string;
  verifiedBy: string;
  status: 'verified' | 'pending' | 'expired' | 'revoked';
  pdfUrl?: string;
  qrCode?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  certifications: Certification[];
  serialNumber: string;
  purchaseDate: string;
  warrantyExpiry: string;
}

interface AuthenticityReport {
  id: string;
  productId: string;
  timestamp: string;
  result: 'authentic' | 'suspect' | 'fake' | 'inconclusive';
  confidence: number;
  details: {
    materialAuthenticity: boolean;
    craftsmanshipQuality: number;
    serialNumberMatch: boolean;
    certificationValid: boolean;
  };
  recommendations: string[];
  nextSteps: string[];
}

interface CertificationProps {
  className?: string;
}

export const Certification: React.FC<CertificationProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'verify' | 'my-certificates' | 'learn'>('verify');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState<Certification | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scanningImage, setScanningImage] = useState(false);

  // Sample data
  const myProducts: Product[] = [
    {
      id: '1',
      name: 'Princess Cut Diamond Engagement Ring',
      category: 'Rings',
      certifications: [
        {
          id: 'cert-1',
          certificateNumber: 'GIA 1234567890',
          type: 'GIA',
          issueDate: '2024-01-15',
          verifiedBy: 'GIA Laboratory',
          status: 'verified',
          pdfUrl: '/certificates/gia-1234567890.pdf',
          qrCode: '/qr/gia-1234567890.png'
        }
      ],
      serialNumber: 'JS-2024-001234',
      purchaseDate: '2024-02-01',
      warrantyExpiry: '2026-02-01'
    },
    {
      id: '2',
      name: 'Tennis Bracelet with Round Diamonds',
      category: 'Bracelets',
      certifications: [
        {
          id: 'cert-2',
          certificateNumber: 'AGS 9876543210',
          type: 'AGS',
          issueDate: '2023-11-20',
          verifiedBy: 'American Gem Society',
          status: 'verified'
        }
      ],
      serialNumber: 'JS-2023-005678',
      purchaseDate: '2023-12-15',
      warrantyExpiry: '2025-12-15'
    }
  ];

  const educationalContent = [
    {
      title: 'Understanding GIA Certification',
      description: 'Learn about the Gemological Institute of America\'s rigorous grading standards',
      icon: Award,
      readTime: '5 min',
      category: 'Certification Bodies'
    },
    {
      title: 'How to Read Diamond Certificates',
      description: 'Complete guide to understanding 4Cs, measurements, and grading reports',
      icon: FileText,
      readTime: '8 min',
      category: 'Reading Reports'
    },
    {
      title: 'Authenticity Verification Process',
      description: 'Step-by-step guide to our AI-powered verification system',
      icon: Shield,
      readTime: '6 min',
      category: 'Verification'
    },
    {
      title: 'Common Counterfeit Signs',
      description: 'Learn to identify fake jewellery and red flags',
      icon: AlertCircle,
      readTime: '7 min',
      category: 'Security'
    }
  ];

  const verificationStats = [
    { label: 'Certificates Verified', value: '2.5M+', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Fake Items Detected', value: '47K+', icon: AlertCircle, color: 'text-red-500' },
    { label: 'Success Rate', value: '99.8%', icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Active Users', value: '850K+', icon: Users, color: 'text-purple-500' }
  ];

  const certificateBodies = [
    {
      name: 'GIA',
      fullName: 'Gemological Institute of America',
      description: 'World\'s most trusted authority on diamonds, gemstones, and pearls',
      website: 'https://www.gia.edu',
      logo: '/logos/gia.png'
    },
    {
      name: 'AGS',
      fullName: 'American Gem Society',
      description: 'Leading diamond grading laboratory with proprietary cut grading system',
      website: 'https://www.americangemsociety.org',
      logo: '/logos/ags.png'
    },
    {
      name: 'IGI',
      fullName: 'International Gemological Institute',
      description: 'Largest independent gem certification and appraisal institute',
      website: 'https://www.igi.org',
      logo: '/logos/igi.png'
    }
  ];

  const handleCertificateVerification = async () => {
    if (!certificateNumber.trim()) return;

    setIsVerifying(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock verification result
    setVerificationResult({
      id: 'verified-cert',
      certificateNumber: certificateNumber,
      type: 'GIA',
      issueDate: '2024-01-15',
      verifiedBy: 'GIA Laboratory',
      status: 'verified',
      pdfUrl: '/certificates/sample-gia.pdf'
    });

    setIsVerifying(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const scanForAuthenticity = async () => {
    setScanningImage(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setScanningImage(false);
    // In a real app, this would analyze the image and return results
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'revoked': return 'bg-red-100 text-red-800';
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
              <h2 className="jewellery-title-bold text-3xl">Certification & Authenticity</h2>
              <p className="jewellery-text text-gray-600">
                Verify certificates and ensure your jewellery is authentic
              </p>
            </div>
          </div>
          <Badge className="jewellery-badge bg-jewellery-emerald">
            AI-Powered Verification
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {verificationStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`flex items-center justify-center gap-2 mb-1 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
                <span className="jewellery-title-bold text-xl">{stat.value}</span>
              </div>
              <p className="jewellery-text text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-jewellery-gold/20">
        <div className="flex space-x-1 p-6">
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'verify'
                ? 'bg-jewellery-gold text-white'
                : 'text-gray-600 hover:text-jewellery-gold hover:bg-jewellery-silk'
            }`}
          >
            <Search className="h-5 w-5" />
            Verify Certificate
          </button>
          <button
            onClick={() => setActiveTab('my-certificates')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'my-certificates'
                ? 'bg-jewellery-gold text-white'
                : 'text-gray-600 hover:text-jewellery-gold hover:bg-jewellery-silk'
            }`}
          >
            <FileText className="h-5 w-5" />
            My Certificates
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'learn'
                ? 'bg-jewellery-gold text-white'
                : 'text-gray-600 hover:text-jewellery-gold hover:bg-jewellery-silk'
            }`}
          >
            <Info className="h-5 w-5" />
            Learn & Resources
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'verify' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Certificate Number Verification */}
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
              <h3 className="jewellery-subtitle text-lg mb-4">Verify Certificate Number</h3>
              <p className="jewellery-text text-gray-600 mb-6">
                Enter the certificate number from your jewellery documentation to verify its authenticity
              </p>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter certificate number (e.g., GIA 1234567890)"
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:border-jewellery-gold focus:outline-none focus:ring-2 focus:ring-jewellery-gold/20"
                />
                <button
                  onClick={handleCertificateVerification}
                  disabled={isVerifying || !certificateNumber.trim()}
                  className="btn-jewellery-primary"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Verify
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verification Result */}
            {verificationResult && (
              <div className="bg-white border-2 border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <h3 className="jewellery-subtitle text-lg text-green-800">Certificate Verified</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Certificate Number</p>
                      <p className="font-semibold">{verificationResult.certificateNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Issued By</p>
                      <p className="font-semibold">{verificationResult.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Issue Date</p>
                      <p className="font-semibold">{new Date(verificationResult.issueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Verified By</p>
                      <p className="font-semibold">{verificationResult.verifiedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge className={getStatusColor(verificationResult.status)}>
                        {verificationResult.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Verification Date</p>
                      <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6 pt-6 border-t">
                  <button className="btn-jewellery-secondary">
                    <Download className="h-5 w-5 mr-2" />
                    Download PDF
                  </button>
                  <button className="btn-jewellery-secondary">
                    <QrCode className="h-5 w-5 mr-2" />
                    View QR Code
                  </button>
                  <button className="btn-jewellery-secondary">
                    <Mail className="h-5 w-5 mr-2" />
                    Email Certificate
                  </button>
                </div>
              </div>
            )}

            {/* Image-Based Verification */}
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
              <h3 className="jewellery-subtitle text-lg mb-4">Visual Authenticity Check</h3>
              <p className="jewellery-text text-gray-600 mb-6">
                Upload a photo of your jewellery for AI-powered authenticity analysis
              </p>

              {!uploadedImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="jewellery-text font-medium mb-2">Upload Jewellery Photo</p>
                  <p className="jewellery-text text-sm text-gray-500 mb-4">
                    Take a clear, well-lit photo from multiple angles
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="btn-jewellery-secondary cursor-pointer"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Choose Photo
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                    <p className="text-gray-500">Uploaded image preview</p>
                  </div>

                  <button
                    onClick={scanForAuthenticity}
                    disabled={scanningImage}
                    className="w-full btn-jewellery-primary"
                  >
                    {scanningImage ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Start Authenticity Analysis
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setUploadedImage(null)}
                    className="w-full btn-jewellery-secondary"
                  >
                    Upload Different Image
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'my-certificates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="jewellery-title text-lg font-semibold mb-2">{product.name}</h3>
                      <p className="jewellery-text text-sm text-gray-600">{product.category}</p>
                    </div>
                    <Badge className="bg-jewellery-silk text-jewellery-gold">
                      {product.certifications.length} Certificates
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    {product.certifications.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Certificate className="h-5 w-5 text-jewellery-gold" />
                          <div>
                            <p className="font-medium text-sm">{cert.type}</p>
                            <p className="text-xs text-gray-500">{cert.certificateNumber}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(cert.status)} className="text-xs">
                          {cert.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      <span>Serial: {product.serialNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Purchased: {new Date(product.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Warranty until: {new Date(product.warrantyExpiry).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 btn-jewellery-secondary text-sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    <button className="flex-1 btn-jewellery-secondary text-sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {myProducts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="jewellery-title text-xl mb-2">No Certificates Found</h3>
                <p className="jewellery-text text-gray-500 mb-6">
                  Your verified certificates will appear here
                </p>
                <button
                  onClick={() => setActiveTab('verify')}
                  className="btn-jewellery-primary"
                >
                  Verify Your First Certificate
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="space-y-8">
            {/* Educational Content */}
            <div>
              <h3 className="jewellery-subtitle text-xl mb-6">Learn About Certification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educationalContent.map((content, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-jewellery-silk rounded-lg flex items-center justify-center flex-shrink-0">
                        <content.icon className="h-6 w-6 text-jewellery-gold" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="text-xs bg-jewellery-silk text-jewellery-gold mb-2">
                          {content.category}
                        </Badge>
                        <h4 className="jewellery-title font-semibold mb-2">{content.title}</h4>
                        <p className="jewellery-text text-sm text-gray-600 mb-3">{content.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{content.readTime} read</span>
                          <button className="text-jewellery-gold hover:text-jewellery-gold-dark font-medium text-sm">
                            Read More →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Bodies */}
            <div>
              <h3 className="jewellery-subtitle text-xl mb-6">Trusted Certificate Bodies</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {certificateBodies.map((body, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-jewellery-silk rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Award className="h-8 w-8 text-jewellery-gold" />
                      </div>
                      <h4 className="jewellery-title font-semibold">{body.name}</h4>
                      <p className="jewellery-text text-sm text-gray-600">{body.fullName}</p>
                    </div>
                    <p className="jewellery-text text-sm text-gray-600 mb-4">{body.description}</p>
                    <a
                      href={body.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-jewellery-gold hover:text-jewellery-gold-dark font-medium text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-jewellery-silk p-6 rounded-lg border border-jewellery-gold/20">
              <h3 className="jewellery-subtitle text-lg mb-4">Security Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="jewellery-text font-medium">Always verify certificates</p>
                    <p className="jewellery-text text-sm text-gray-600">Check certificate numbers with official databases</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="jewellery-text font-medium">Buy from authorized dealers</p>
                    <p className="jewellery-text text-sm text-gray-600">Ensure your jeweler is reputable and certified</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="jewellery-text font-medium">Keep documentation safe</p>
                    <p className="jewellery-text text-sm text-gray-600">Store certificates and receipts securely</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="jewellery-text font-medium">Get professional appraisals</p>
                    <p className="jewellery-text text-sm text-gray-600">Regular valuations protect your investment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;