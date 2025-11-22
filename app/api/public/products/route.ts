import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit")!) || 12;
  const page = parseInt(searchParams.get("page")!) || 0;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const search = searchParams.get("search") || "";

  // Filters
  const categoryId = searchParams.get("categoryId");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const metalId = searchParams.get("metalId");
  const featured = searchParams.get("featured");
  const inStock = searchParams.get("inStock");
  const tags = searchParams.get("tags");

  try {
    // Build query object
    const queryObject: any = { isActive: true };

    if (search) {
      queryObject.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } }
      ];
    }

    if (categoryId) {
      queryObject.categoryId = categoryId;
    }

    if (minPrice || maxPrice) {
      queryObject.price = {};
      if (minPrice) queryObject.price.$gte = parseFloat(minPrice);
      if (maxPrice) queryObject.price.$lte = parseFloat(maxPrice);
    }

    if (metalId) {
      queryObject.metalId = metalId;
    }

    if (featured === "true") {
      queryObject.featured = true;
    }

    if (inStock === "true") {
      queryObject.inStock = true;
    }

    if (tags) {
      const tagArray = tags.split(",");
      queryObject.tags = { $in: tagArray };
    }

    // Get total count for pagination
    const total = await Product.countDocuments(queryObject);

    // Fetch products with pagination and sorting
    const products = await Product.find(queryObject)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(page * limit)
      .limit(limit);

    return Response.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};
