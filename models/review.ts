import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    id: { type: String, default: new mongoose.Types.ObjectId(), unique: true },

    // Customer Info
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String }, // If user is logged in

    // Review Content
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String },
    comment: { type: String, required: true },

    // Product Association (optional)
    productId: { type: String },
    productName: { type: String },

    // Moderation
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    moderatedBy: { type: String }, // Admin user ID
    moderatedAt: { type: Date },
    rejectionReason: { type: String },

    // Metadata
    isVerifiedPurchase: { type: Boolean, default: false },
    helpfulCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes
ReviewSchema.index({ status: 1, createdAt: -1 });
ReviewSchema.index({ productId: 1, status: 1 });
ReviewSchema.index({ rating: 1 });

const Review =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;
