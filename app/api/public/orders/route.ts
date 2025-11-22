import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();
    const { userId } = await auth();

    // Validate required fields
    if (!body.items || body.items.length === 0) {
      return Response.json(
        {
          status: "error",
          message: "Order must contain at least one item",
        },
        { status: 400 }
      );
    }

    if (!body.shippingAddress) {
      return Response.json(
        {
          status: "error",
          message: "Shipping address is required",
        },
        { status: 400 }
      );
    }

    // Validate shipping address fields
    const requiredAddressFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "addressLine1",
      "city",
      "province",
      "postalCode",
    ];

    for (const field of requiredAddressFields) {
      if (!body.shippingAddress[field]) {
        return Response.json(
          {
            status: "error",
            message: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    // Create order
    const order = await Order.create({
      userId: userId || undefined,
      email: body.shippingAddress.email,
      items: body.items,
      shippingAddress: body.shippingAddress,
      subtotal: body.subtotal,
      tax: body.tax,
      shippingCost: body.shippingCost || 0,
      total: body.total,
      notes: body.notes,
      status: "pending",
      paymentStatus: "pending",
    });

    return Response.json(
      {
        status: "success",
        message: "Order created successfully",
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

// Get user's orders
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

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

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
