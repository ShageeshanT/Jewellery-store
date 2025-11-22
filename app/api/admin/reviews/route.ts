import { connectDB } from "@/lib/db";
import Review from "@/models/review";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get("status") || "pending";
  const limit = parseInt(searchParams.get("limit")!) || 20;
  const page = parseInt(searchParams.get("page")!) || 0;

  try {
    const queryObject: any = {};

    if (status !== "all") {
      queryObject.status = status;
    }

    const total = await Review.countDocuments(queryObject);

    const reviews = await Review.find(queryObject)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

    return Response.json({
      reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return Response.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();
    const { id, status, featured, rejectionReason } = body;

    if (!id) {
      return Response.json(
        { status: "error", message: "Review ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) {
      updateData.status = status;
      updateData.moderatedAt = new Date();
      // TODO: Set moderatedBy to current admin user ID
    }
    if (featured !== undefined) updateData.featured = featured;
    if (rejectionReason !== undefined) updateData.rejectionReason = rejectionReason;

    const review = await Review.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );

    if (!review) {
      return Response.json(
        { status: "error", message: "Review not found" },
        { status: 404 }
      );
    }

    return Response.json({
      status: "success",
      review
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating review:", error);
    return Response.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
