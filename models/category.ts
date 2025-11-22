import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    id: { type: String, default: new mongoose.Types.ObjectId(), unique: true },
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;
