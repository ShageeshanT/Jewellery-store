import mongoose, { Schema } from "mongoose";

const GemSchema = new Schema(
  {
    id: { type: String, default: new mongoose.Types.ObjectId(), unique: true },
    name: { type: String, required: true }, // e.g., "Diamond", "Ruby", "Sapphire"
    type: { type: String, required: true }, // e.g., "DIAMOND", "RUBY", "SAPPHIRE"
    color: { type: String }, // e.g., "White", "Blue", "Red"
    clarity: { type: String }, // e.g., "VVS", "VS", "SI"
    cut: { type: String }, // e.g., "Round", "Princess", "Emerald"
    carat: { type: Number }, // Weight in carats
    origin: { type: String }, // e.g., "Sri Lanka", "Myanmar"
    certification: { type: String }, // e.g., "GIA", "IGI"
    pricePerCarat: { type: Number },
    description: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Gem = mongoose.models.Gem || mongoose.model("Gem", GemSchema);
export default Gem;
