"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  customerName: string;
  email: string;
  rating: number;
  title?: string;
  comment: string;
  productName?: string;
  status: string;
  featured: boolean;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("pending");

  useEffect(() => {
    fetchReviews();
  }, [filterStatus]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("status", filterStatus);

      const response = await fetch(`/api/admin/reviews?${params}`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const moderateReview = async (id: string, action: "approve" | "reject") => {
    try {
      const response = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: action === "approve" ? "approved" : "rejected",
        }),
      });

      if (response.ok) {
        toast.success(`Review ${action}d successfully`);
        fetchReviews();
      } else {
        toast.error(`Failed to ${action} review`);
      }
    } catch (error) {
      console.error(`Error ${action}ing review:`, error);
      toast.error(`Failed to ${action} review`);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: !currentFeatured }),
      });

      if (response.ok) {
        toast.success(currentFeatured ? "Removed from featured" : "Added to featured");
        fetchReviews();
      } else {
        toast.error("Failed to update featured status");
      }
    } catch (error) {
      console.error("Error updating featured status:", error);
      toast.error("Failed to update featured status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reviews Moderation</h1>
          <p className="text-gray-600">Review and moderate customer feedback</p>
        </div>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="all">All Reviews</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-center py-8 text-gray-500">Loading...</p>
      ) : reviews.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-gray-500">No reviews to moderate</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{review.customerName}</CardTitle>
                      <Badge className={getStatusColor(review.status)}>
                        {review.status}
                      </Badge>
                      {review.featured && (
                        <Badge className="bg-purple-100 text-purple-800">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
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
                    <p className="text-sm text-gray-500">
                      {review.email} • {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {review.title && (
                  <h4 className="font-semibold mb-2">{review.title}</h4>
                )}
                <p className="text-gray-700 mb-4">{review.comment}</p>

                {review.productName && (
                  <p className="text-sm text-gray-500 mb-4">
                    Product: <span className="font-medium">{review.productName}</span>
                  </p>
                )}

                <div className="flex gap-2">
                  {review.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => moderateReview(review.id, "approve")}
                        className="gap-1"
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => moderateReview(review.id, "reject")}
                        className="gap-1"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                    </>
                  )}

                  {review.status === "approved" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFeatured(review.id, review.featured)}
                    >
                      {review.featured ? "Remove from Featured" : "Mark as Featured"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
