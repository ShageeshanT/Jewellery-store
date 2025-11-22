import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        {
          status: "error",
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // TODO: Add admin role check
    // For now, allowing all authenticated users

    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("paymentStatus");
    const limit = parseInt(searchParams.get("limit") || "100");

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

    return Response.json({
      status: "success",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
