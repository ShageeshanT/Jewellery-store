import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdmin, errorResponse, successResponse } from "@/lib/api-utils";

export const GET = async (req: NextRequest) => {
  await connectDB();

  try {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    if (!isAdmin(sessionClaims)) {
      return errorResponse("Forbidden - Admin access required", 403);
    }

    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("paymentStatus");

    // Validate and limit the query limit to prevent performance issues
    const limitParam = parseInt(searchParams.get("limit") || "100");
    const limit = Math.min(Math.max(1, limitParam), 500); // Max 500 records

    const queryObject: any = {};

    if (status) {
      queryObject.status = status;
    }

    if (paymentStatus) {
      queryObject.paymentStatus = paymentStatus;
    }

    const orders = await Order.find(queryObject)
      .sort({ createdAt: -1 })
      .limit(limit);

    return successResponse({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return errorResponse("Internal Server Error", 500);
  }
};
