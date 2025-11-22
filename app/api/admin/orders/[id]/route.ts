import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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

    const orderId = params.id;
    const body = await req.json();

    const updateData: any = {};

    // Only allow specific fields to be updated
    if (body.status) {
      updateData.status = body.status;
    }

    if (body.paymentStatus) {
      updateData.paymentStatus = body.paymentStatus;
    }

    if (body.trackingNumber !== undefined) {
      updateData.trackingNumber = body.trackingNumber;
    }

    if (body.notes !== undefined) {
      updateData.notes = body.notes;
    }

    const order = await Order.findOneAndUpdate(
      { id: orderId },
      { $set: updateData },
      { new: true }
    );

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
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
