"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Camera,
  Upload,
  RotateCw,
  Move,
  ZoomIn,
  ZoomOut,
  Download,
  Share,
  Heart,
  ShoppingBag,
  Sparkles,
  Eye,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Settings,
  Wand2
} from 'lucide-react';

interface TryOnProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
}

interface VirtualTryOnProps {
  products: TryOnProduct[];
  className?: string;
}

export const VirtualTryOn: React.FC<VirtualTryOnProps> = ({
  products,
  className = ''
}) => {
  const [selectedProduct, setSelectedProduct] = useState<TryOnProduct | null>(null);
  const [captureMode, setCaptureMode] = useState<'camera' | 'upload'>('camera');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [productPosition, setProductPosition] = useState({ x: 0, y: 0, scale: 1, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for virtual try-on. Please allow camera access or upload a photo.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setUserImage(imageData);
        stopCamera();
        processVirtualTryOn(imageData);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setUserImage(imageData);
        processVirtualTryOn(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const processVirtualTryOn = async (imageData: string) => {
    if (!selectedProduct) {
      alert('Please select a product first');
      return;
    }

    setIsProcessing(true);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real implementation, this would call an AI service
    // For now, we'll simulate the result
    setResultImage(imageData); // In reality, this would be the processed image
    setShowResult(true);
    setIsProcessing(false);
  };

  const resetTryOn = () => {
    setUserImage(null);
    setResultImage(null);
    setShowResult(false);
    setSelectedProduct(null);
    setProductPosition({ x: 0, y: 0, scale: 1, rotation: 0 });
  };

  const downloadResult = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.download = `jewellery-try-on-${Date.now()}.jpg`;
      link.href = resultImage;
      link.click();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
      setProductPosition(prev => ({ ...prev, x, y }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-jewellery-gold/10 to-jewellery-silk p-6 border-b border-jewellery-gold/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-jewellery-gold rounded-full flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="jewellery-title-bold text-3xl">Virtual Try-On</h2>
              <p className="jewellery-text text-gray-600">
                See how our jewellery looks on you with augmented reality
              </p>
            </div>
          </div>
          <Badge className="jewellery-badge bg-jewellery-emerald">
            New Technology
          </Badge>
        </div>
      </div>

      {!showResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Left Panel - Product Selection */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="jewellery-subtitle text-lg mb-4">Select Jewellery</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`w-full p-4 border rounded-lg transition-all ${
                    selectedProduct?.id === product.id
                      ? 'border-jewellery-gold bg-jewellery-silk'
                      : 'border-gray-200 hover:border-jewellery-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-jewellery-silk rounded-lg flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-jewellery-gold/20" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="jewellery-text font-medium">{product.name}</h4>
                      <p className="jewellery-text text-sm text-gray-500">{product.category}</p>
                      <p className="jewellery-price">${product.price.toLocaleString()}</p>
                    </div>
                    {selectedProduct?.id === product.id && (
                      <Check className="h-5 w-5 text-jewellery-gold" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Instructions */}
            <div className="bg-jewellery-silk p-4 rounded-lg border border-jewellery-gold/20">
              <h4 className="jewellery-text font-medium mb-3">How to Use:</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  Select a jewellery piece from the list
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  Choose camera or photo upload
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  Position your face or hand clearly
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">4.</span>
                  Let AI process and show results
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">5.</span>
                  Adjust position if needed
                </li>
              </ol>
            </div>
          </div>

          {/* Center Panel - Camera/Upload */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6">
              {!userImage ? (
                <div className="space-y-6">
                  {/* Mode Selection */}
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setCaptureMode('camera')}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        captureMode === 'camera'
                          ? 'bg-jewellery-gold text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-jewellery-gold/50'
                      }`}
                    >
                      <Camera className="h-5 w-5" />
                      Use Camera
                    </button>
                    <button
                      onClick={() => setCaptureMode('upload')}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        captureMode === 'upload'
                          ? 'bg-jewellery-gold text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-jewellery-gold/50'
                      }`}
                    >
                      <Upload className="h-5 w-5" />
                      Upload Photo
                    </button>
                  </div>

                  {/* Capture Area */}
                  <div className="relative bg-black rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    {!isCapturing ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="text-center text-white">
                          <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                          <p className="text-lg font-medium mb-2">
                            {captureMode === 'camera' ? 'Camera Preview' : 'Upload Your Photo'}
                          </p>
                          <p className="text-sm text-gray-400 mb-4">
                            {captureMode === 'camera'
                              ? 'Position yourself in good lighting'
                              : 'Choose a clear photo of yourself'
                            }
                          </p>
                          {captureMode === 'camera' ? (
                            <button
                              onClick={startCamera}
                              disabled={!selectedProduct}
                              className="btn-jewellery-primary mx-auto"
                            >
                              <Camera className="h-5 w-5 mr-2" />
                              Start Camera
                            </button>
                          ) : (
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              disabled={!selectedProduct}
                              className="btn-jewellery-primary mx-auto"
                            >
                              <Upload className="h-5 w-5 mr-2" />
                              Select Photo
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Camera Controls */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                          <button
                            onClick={capturePhoto}
                            className="bg-white/90 backdrop-blur-sm p-4 rounded-full hover:bg-white transition-colors"
                          >
                            <Camera className="h-6 w-6 text-jewellery-gold" />
                          </button>
                          <button
                            onClick={stopCamera}
                            className="bg-red-500/90 backdrop-blur-sm p-4 rounded-full hover:bg-red-500 transition-colors"
                          >
                            <X className="h-6 w-6 text-white" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                /* Processing State */
                <div className="relative">
                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-jewellery-gold/20 rounded-full"></div>
                        <div className="absolute top-0 w-20 h-20 border-4 border-jewellery-gold border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="jewellery-text text-lg font-medium mt-6">Processing...</p>
                      <p className="jewellery-text text-sm text-gray-500">
                        Our AI is analyzing your photo and placing the jewellery
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="jewellery-text text-sm text-gray-600">
                        Adjust the jewellery position if needed
                      </p>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setProductPosition(prev => ({ ...prev, scale: prev.scale + 0.1 }))}
                          className="p-2 border border-gray-200 rounded-lg hover:border-jewellery-gold transition-colors"
                        >
                          <ZoomIn className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setProductPosition(prev => ({ ...prev, scale: prev.scale - 0.1 }))}
                          className="p-2 border border-gray-200 rounded-lg hover:border-jewellery-gold transition-colors"
                        >
                          <ZoomOut className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setProductPosition(prev => ({ ...prev, rotation: prev.rotation + 15 }))}
                          className="p-2 border border-gray-200 rounded-lg hover:border-jewellery-gold transition-colors"
                        >
                          <RotateCw className="h-5 w-5" />
                        </button>
                        <button
                          onClick={resetTryOn}
                          className="p-2 border border-gray-200 rounded-lg hover:border-jewellery-gold transition-colors"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Result View */
        <div className="p-6">
          <div className="bg-gradient-to-br from-jewellery-silk to-white rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-jewellery-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-10 w-10 text-white animate-pulse" />
            </div>
            <h3 className="jewellery-title-bold text-2xl mb-4">Perfect Match!</h3>
            <p className="jewellery-text text-gray-600 mb-8 max-w-md mx-auto">
              Our AI has successfully placed the {selectedProduct?.name} on your photo.
              You can adjust the position or proceed with your order.
            </p>

            {/* Result Image Placeholder */}
            <div className="bg-gray-100 rounded-xl h-64 mb-8 flex items-center justify-center">
              <p className="text-gray-500">Virtual try-on result would appear here</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <button className="btn-jewellery-primary">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button className="btn-jewellery-secondary">
                <Heart className="h-5 w-5 mr-2" />
                Save to Wishlist
              </button>
              <button onClick={downloadResult} className="btn-jewellery-secondary">
                <Download className="h-5 w-5 mr-2" />
                Download Image
              </button>
              <button onClick={resetTryOn} className="btn-jewellery-secondary">
                <RotateCw className="h-5 w-5 mr-2" />
                Try Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;