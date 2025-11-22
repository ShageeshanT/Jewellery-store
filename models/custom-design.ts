import mongoose, { Schema } from "mongoose";

const CustomDesignSchema = new Schema(
  {
    id: { type: String, default: new mongoose.Types.ObjectId(), unique: true },

    // Customer Info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },

    // Contact Preferences
    preferredContactMethod: {
      type: String,
      enum: ["email", "phone", "whatsapp"],
      default: "email"
    },

    // Design Details
    designType: {
      type: String,
      required: true
    }, // e.g., "ring", "necklace", "bracelet"
    budget: { type: String }, // e.g., "50000-100000"
    metalPreference: { type: String }, // e.g., "18K Gold"
    gemstonePreference: { type: String }, // e.g., "Diamond"
    description: { type: String, required: true },
    referenceImageUrl: { type: String },

    // Status & Assignment
    status: {
      type: String,
      enum: ["new", "in_progress", "completed", "cancelled"],
      default: "new"
    },
    assignedTo: { type: String }, // Staff member ID
    branchId: { type: String },

    // Internal Notes
    internalNotes: { type: String },
    estimatedPrice: { type: Number },

    // Metadata
    userId: { type: String }, // If user is logged in
  },
  { timestamps: true }
);

const CustomDesign =
  mongoose.models.CustomDesign || mongoose.model("CustomDesign", CustomDesignSchema);
export default CustomDesign;
