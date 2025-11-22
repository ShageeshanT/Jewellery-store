"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Sparkles, Wrench, Award, Shield } from "lucide-react";
import { toast } from "sonner";

export default function ServicesPage() {
  const [customDesignData, setCustomDesignData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    preferredContactMethod: "email",
    designType: "",
    budget: "",
    metalPreference: "",
    gemstonePreference: "",
    description: "",
    referenceImageUrl: "",
  });

  const [serviceTicketData, setServiceTicketData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    serviceType: "",
    branchId: "",
    preferredDate: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleCustomDesignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/public/custom-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customDesignData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Custom design request submitted! Reference ID: ${data.id}`);
        setCustomDesignData({
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
          preferredContactMethod: "email",
          designType: "",
          budget: "",
          metalPreference: "",
          gemstonePreference: "",
          description: "",
          referenceImageUrl: "",
        });
      } else {
        toast.error(data.message || "Failed to submit request");
      }
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleServiceTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/public/service-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceTicketData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Service request submitted! Reference ID: ${data.id}`);
        setServiceTicketData({
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
          serviceType: "",
          branchId: "",
          preferredDate: "",
          description: "",
        });
      } else {
        toast.error(data.message || "Failed to submit request");
      }
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Fancy Text */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-24">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">SERVICES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From bespoke design to expert restoration, we bring your jewellery
            dreams to life with unparalleled craftsmanship and dedication
          </p>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Design</h3>
                <p className="text-gray-600 text-sm">
                  Turn your vision into reality with our bespoke design service
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Repairs & Restoration</h3>
                <p className="text-gray-600 text-sm">
                  Expert repair and restoration for your precious pieces
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Appraisals</h3>
                <p className="text-gray-600 text-sm">
                  Professional appraisal services for insurance and valuation
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lifetime Warranty</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive warranty coverage on all our craftsmanship
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Service Request Forms */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">REQUEST A SERVICE</h2>
            <p className="text-gray-600">
              Fill out the form below and our team will get back to you within 24 hours
            </p>
          </div>

          <Tabs defaultValue="custom-design" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="custom-design">Custom Design</TabsTrigger>
              <TabsTrigger value="service-repair">Service & Repair</TabsTrigger>
            </TabsList>

            {/* Custom Design Form */}
            <TabsContent value="custom-design">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleCustomDesignSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          value={customDesignData.firstName}
                          onChange={(e) =>
                            setCustomDesignData({
                              ...customDesignData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          value={customDesignData.lastName}
                          onChange={(e) =>
                            setCustomDesignData({
                              ...customDesignData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          type="email"
                          value={customDesignData.email}
                          onChange={(e) =>
                            setCustomDesignData({
                              ...customDesignData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          value={customDesignData.contactNumber}
                          onChange={(e) =>
                            setCustomDesignData({
                              ...customDesignData,
                              contactNumber: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Design Type <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          value={customDesignData.designType}
                          onChange={(e) =>
                            setCustomDesignData({
                              ...customDesignData,
                              designType: e.target.value,
                            })
                          }
                          placeholder="e.g., Ring, Necklace, Bracelet"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Budget Range</label>
                        <Input
                          value={customDesignData.budget}
                          onChange={(e) =>
                            setCustomDesignData({
                              ...customDesignData,
                              budget: e.target.value,
                            })
                          }
                          placeholder="e.g., LKR 50,000 - 100,000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Metal Preference
                        </label>
                        <Input
                          value={customDesignData.metalPreference}
                          onChange={(e) =>
                            setCustomDesignData({
                              ...customDesignData,
                              metalPreference: e.target.value,
                            })
                          }
                          placeholder="e.g., 18K Gold, Platinum"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Gemstone Preference
                        </label>
                        <Input
                          value={customDesignData.gemstonePreference}
                          onChange={(e) =>
                            setCustomDesignData({
                              ...customDesignData,
                              gemstonePreference: e.target.value,
                            })
                          }
                          placeholder="e.g., Diamond, Sapphire"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={customDesignData.description}
                        onChange={(e) =>
                          setCustomDesignData({
                            ...customDesignData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Tell us about your design vision..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Reference Image URL
                      </label>
                      <Input
                        type="url"
                        value={customDesignData.referenceImageUrl}
                        onChange={(e) =>
                          setCustomDesignData({
                            ...customDesignData,
                            referenceImageUrl: e.target.value,
                          })
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? "Submitting..." : "Submit Custom Design Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Service/Repair Form */}
            <TabsContent value="service-repair">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleServiceTicketSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          value={serviceTicketData.firstName}
                          onChange={(e) =>
                            setServiceTicketData({
                              ...serviceTicketData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          value={serviceTicketData.lastName}
                          onChange={(e) =>
                            setServiceTicketData({
                              ...serviceTicketData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          type="email"
                          value={serviceTicketData.email}
                          onChange={(e) =>
                            setServiceTicketData({
                              ...serviceTicketData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          value={serviceTicketData.contactNumber}
                          onChange={(e) =>
                            setServiceTicketData({
                              ...serviceTicketData,
                              contactNumber: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Service Type <span className="text-red-500">*</span>
                        </label>
                        <Input
                          required
                          value={serviceTicketData.serviceType}
                          onChange={(e) =>
                            setServiceTicketData({
                              ...serviceTicketData,
                              serviceType: e.target.value,
                            })
                          }
                          placeholder="e.g., Repair, Resizing, Cleaning"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Preferred Date
                        </label>
                        <Input
                          type="date"
                          value={serviceTicketData.preferredDate}
                          onChange={(e) =>
                            setServiceTicketData({
                              ...serviceTicketData,
                              preferredDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={serviceTicketData.description}
                        onChange={(e) =>
                          setServiceTicketData({
                            ...serviceTicketData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe the service you need..."
                      />
                    </div>

                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? "Submitting..." : "Submit Service Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">WHY CHOOSE OUR SERVICES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold text-yellow-600 mb-2">25+</div>
              <p className="text-xl font-semibold mb-2">Years of Experience</p>
              <p className="text-gray-600">
                Over two decades of crafting exquisite jewellery
              </p>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-600 mb-2">1000+</div>
              <p className="text-xl font-semibold mb-2">Happy Customers</p>
              <p className="text-gray-600">
                Trusted by thousands for our quality and service
              </p>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-600 mb-2">100%</div>
              <p className="text-xl font-semibold mb-2">Satisfaction Guarantee</p>
              <p className="text-gray-600">
                Your satisfaction is our top priority
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
