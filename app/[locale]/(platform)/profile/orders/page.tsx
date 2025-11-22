"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  mainImage: string;
}

interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  processing: "bg-purple-100 text-purple-800 border-purple-200",
  shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  paid: "bg-green-100 text-green-800 border-green-200",
  failed: "bg-red-100 text-red-800 border-red-200",
  refunded: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/public/orders");
      const data = await response.json();

      if (data.status === "success") {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to load orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extralight text-gray-900 tracking-tight mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 font-light">
            View and track your order history
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-extralight text-gray-900 mb-4 tracking-tight">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-8 text-lg font-light">
              Start shopping to see your orders here
            </p>
            <Link href="/jewellery">
              <Button
                size="lg"
                className="px-10 py-7 text-sm tracking-wider bg-black hover:bg-gray-900 transition-all duration-500"
              >
                EXPLORE COLLECTION
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-medium mb-2">
                        Order {order.orderNumber}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-2">
                      <div className="flex gap-2">
                        <Badge
                          variant="outline"
                          className={statusColors[order.status] || "bg-gray-100"}
                        >
                          {order.status.toUpperCase()}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={paymentStatusColors[order.paymentStatus] || "bg-gray-100"}
                        >
                          {order.paymentStatus.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-lg font-medium text-gray-900">
                        LKR {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 pb-4 border-b last:border-b-0"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={item.mainImage || "/placeholder-product.jpg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product/${item.slug}`}
                            className="text-base font-medium text-gray-900 hover:text-amber-600 transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-base font-medium text-gray-900 mt-1">
                            LKR {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link href={`/order-confirmation/${order.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full group"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    {order.status === "delivered" && (
                      <Link href="/services" className="flex-1">
                        <Button variant="outline" className="w-full">
                          Write Review
                        </Button>
                      </Link>
                    )}
                    {order.status === "pending" || order.status === "confirmed" ? (
                      <Button variant="outline" className="flex-1">
                        Contact Support
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
