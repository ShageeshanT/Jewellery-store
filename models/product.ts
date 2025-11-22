import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    id: { type: String, default: new mongoose.Types.ObjectId(), unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },

    // Pricing
    price: { type: Number, required: true },
    compareAtPrice: { type: Number }, // Original price for sale items

    // Category & Classification
    categoryId: { type: String, required: true },
    categoryName: { type: String }, // Denormalized for quick access
    tags: [{ type: String }], // e.g., ["bridal", "trending", "new-arrival"]

    // Materials
    metalId: { type: String },
    metalName: { type: String },
    metalWeight: { type: Number }, // Weight in grams

    gemIds: [{ type: String }], // Multiple gems possible
    gemDetails: [
      {
        gemId: { type: String },
        gemName: { type: String },
        quantity: { type: Number },
        carat: { type: Number },
      }
    ],

    // Media
    images: [{ type: String }], // Array of image URLs
    mainImage: { type: String }, // Primary display image

    // Inventory
    sku: { type: String, unique: true },
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 0 },

    // Metadata
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    viewCount: { type: Number, default: 0 },

    // Additional Details
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      unit: { type: String, default: "mm" },
    },

    customizable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes for performance
ProductSchema.index({ categoryId: 1, isActive: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ tags: 1 });

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
