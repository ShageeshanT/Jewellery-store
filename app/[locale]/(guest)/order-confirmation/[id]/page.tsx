"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, MapPin, Mail, Phone } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  email: string;
  items: {
    productId: string;
    name: string;
    slug: string;
    price: number;
    quantity: number;
    mainImage: string;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  status: string;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/public/orders/${orderId}`);
      const data = await response.json();

      if (data.status === "success") {
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Link href="/jewellery">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/20 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-extralight text-gray-900 tracking-tight mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 font-light mb-2">
            Thank you for your purchase
          </p>
          <p className="text-sm text-gray-500">
            Order Number: <span className="font-medium text-gray-900">{order.orderNumber}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          {/* Order Items */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-gray-700" />
                <h2 className="text-2xl font-light tracking-wide">Order Items</h2>
              </div>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.mainImage || "/placeholder-product.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-lg font-medium text-gray-900 hover:text-amber-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-lg font-medium text-gray-900 mt-1">
                        LKR {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>LKR {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>LKR {order.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-xl font-medium text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>LKR {order.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gray-700" />
                <h2 className="text-2xl font-light tracking-wide">Shipping Address</h2>
              </div>
              <div className="text-gray-700 space-y-1">
                <p className="font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p>{order.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-gray-700" />
                <h2 className="text-2xl font-light tracking-wide">Contact Information</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="h-4 w-4" />
                  <span>{order.shippingAddress.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="h-4 w-4" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-light tracking-wide mb-4">What's Next?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    A confirmation email has been sent to{" "}
                    <span className="font-medium">{order.email}</span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Our team will process your order within 1-2 business days</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>You will receive tracking information once your order ships</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>For questions, contact us at support@jewellerystore.com</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/jewellery" className="flex-1">
              <Button
                size="lg"
                variant="outline"
                className="w-full py-7 text-sm tracking-wider border-2 border-black hover:bg-black hover:text-white transition-all duration-500"
              >
                CONTINUE SHOPPING
              </Button>
            </Link>
            <Link href="/contact" className="flex-1">
              <Button
                size="lg"
                className="w-full py-7 text-sm tracking-wider bg-black hover:bg-gray-900 transition-all duration-500"
              >
                CONTACT SUPPORT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
