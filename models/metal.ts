import mongoose, { Schema } from "mongoose";

const MetalSchema = new Schema(
  {
    id: { type: String, default: new mongoose.Types.ObjectId(), unique: true },
    name: { type: String, required: true }, // e.g., "Gold", "Silver", "Platinum"
    type: { type: String, required: true }, // e.g., "GOLD", "SILVER", "PLATINUM"
    purity: { type: String }, // e.g., "22K", "18K", "14K", "925"
    color: { type: String }, // e.g., "Yellow", "White", "Rose"
    pricePerGram: { type: Number }, // Current market price per gram
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Metal = mongoose.models.Metal || mongoose.model("Metal", MetalSchema);
export default Metal;
