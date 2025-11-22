import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import Category from "@/models/category";
import Metal from "@/models/metal";
import Gem from "@/models/gem";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();

  try {
    const product = await Product.findOne({
      id: params.id,
      isActive: true
    });

    if (!product) {
      return Response.json(
        {
          status: "error",
          message: "Product not found"
        },
        { status: 404 }
      );
    }

    // Increment view count
    await Product.updateOne(
      { id: params.id },
      { $inc: { viewCount: 1 } }
    );

    // Fetch related data
    let category = null;
    let metal = null;
    let gems = [];

    if (product.categoryId) {
      category = await Category.findOne({ id: product.categoryId });
    }

    if (product.metalId) {
      metal = await Metal.findOne({ id: product.metalId });
    }

    if (product.gemIds && product.gemIds.length > 0) {
      gems = await Gem.find({ id: { $in: product.gemIds } });
    }

    // Fetch related products (same category, exclude current)
    const relatedProducts = await Product.find({
      categoryId: product.categoryId,
      id: { $ne: product.id },
      isActive: true
    })
      .limit(4)
      .sort({ viewCount: -1 });

    return Response.json({
      product: product.toObject(),
      category,
      metal,
      gems,
      relatedProducts
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};
