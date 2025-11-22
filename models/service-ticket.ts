import mongoose, { Schema } from "mongoose";

const ServiceTicketSchema = new Schema(
  {
    id: { type: String, default: new mongoose.Types.ObjectId(), unique: true },

    // Customer Info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },

    // Service Details
    serviceType: {
      type: String,
      required: true
    }, // e.g., "repair", "resizing", "cleaning", "appraisal"
    branchId: { type: String }, // Preferred branch
    branchName: { type: String },
    preferredDate: { type: Date },
    description: { type: String, required: true },

    // Status & Assignment
    status: {
      type: String,
      enum: ["new", "in_progress", "completed", "cancelled"],
      default: "new"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium"
    },
    assignedTo: { type: String }, // Staff member ID

    // Pricing & Payment
    estimatedCost: { type: Number },
    finalCost: { type: Number },
    isPaid: { type: Boolean, default: false },

    // Internal Notes
    internalNotes: { type: String },
    completionNotes: { type: String },

    // Metadata
    userId: { type: String }, // If user is logged in
    attachments: [{ type: String }], // URLs to uploaded images
  },
  { timestamps: true }
);

const ServiceTicket =
  mongoose.models.ServiceTicket || mongoose.model("ServiceTicket", ServiceTicketSchema);
export default ServiceTicket;
