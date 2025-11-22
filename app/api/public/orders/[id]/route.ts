import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();

  try {
    const orderId = params.id;

    const order = await Order.findOne({ id: orderId });

    if (!order) {
      return Response.json(
        {
          status: "error",
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      status: "success",
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
