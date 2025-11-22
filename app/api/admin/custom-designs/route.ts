import { connectDB } from "@/lib/db";
import CustomDesign from "@/models/custom-design";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit")!) || 20;
  const page = parseInt(searchParams.get("page")!) || 0;

  try {
    const queryObject: any = {};

    if (status) {
      queryObject.status = status;
    }

    const total = await CustomDesign.countDocuments(queryObject);

    const designs = await CustomDesign.find(queryObject)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

    return Response.json({
      designs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching custom designs:", error);
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
    const { id, status, internalNotes, estimatedPrice, assignedTo, branchId } = body;

    if (!id) {
      return Response.json(
        { status: "error", message: "Design ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (internalNotes !== undefined) updateData.internalNotes = internalNotes;
    if (estimatedPrice !== undefined) updateData.estimatedPrice = estimatedPrice;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (branchId !== undefined) updateData.branchId = branchId;

    const design = await CustomDesign.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );

    if (!design) {
      return Response.json(
        { status: "error", message: "Design not found" },
        { status: 404 }
      );
    }

    return Response.json({
      status: "success",
      design
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating custom design:", error);
    return Response.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
