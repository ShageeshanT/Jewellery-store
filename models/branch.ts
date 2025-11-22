import mongoose, { Schema } from "mongoose";

const BranchSchema = new Schema(
  {
    id: { type: String, default: new mongoose.Types.ObjectId(), unique: true },
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true }, // e.g., "COL-01", "KDY-01"

    // Address
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String, default: "Sri Lanka" },
    },

    // Contact
    telephone: { type: String },
    email: { type: String },
    whatsapp: { type: String },

    // Operating Hours
    hours: {
      monday: { type: String },
      tuesday: { type: String },
      wednesday: { type: String },
      thursday: { type: String },
      friday: { type: String },
      saturday: { type: String },
      sunday: { type: String },
    },

    // Location
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },

    // Services
    services: [{ type: String }], // e.g., ["repairs", "custom-design", "appraisals"]

    // Metadata
    image: { type: String },
    isActive: { type: Boolean, default: true },
    isFlagship: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Branch =
  mongoose.models.Branch || mongoose.model("Branch", BranchSchema);
export default Branch;
