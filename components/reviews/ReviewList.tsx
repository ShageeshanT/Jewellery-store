"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  title?: string;
  comment: string;
  productName?: string;
  isVerifiedPurchase?: boolean;
  createdAt: string;
}

interface ReviewListProps {
  productId?: string;
  limit?: number;
  featuredOnly?: boolean;
  className?: string;
}

export function ReviewList({
  productId,
  limit = 10,
  featuredOnly = false,
  className
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [productId, limit, featuredOnly]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        ...(productId && { productId }),
        ...(featuredOnly && { featured: "true" }),
      });

      const response = await fetch(`/api/public/reviews?${params}`);
      const data = await response.json();

      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-gray-500">Loading reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900">{review.customerName}</p>
                  {review.isVerifiedPurchase && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Rating Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {review.title && (
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            )}

            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>

            {review.productName && (
              <p className="text-xs text-gray-500 mt-3">
                Review for: <span className="font-medium">{review.productName}</span>
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
