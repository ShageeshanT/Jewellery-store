import { connectDB } from "@/lib/db";
import Category from "@/models/category";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const includeInactive = searchParams.get("includeInactive") === "true";

  try {
    const queryObject: any = {};

    if (!includeInactive) {
      queryObject.isActive = true;
    }

    const categories = await Category.find(queryObject)
      .sort({ displayOrder: 1, name: 1 });

    return Response.json({
      categories
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};
