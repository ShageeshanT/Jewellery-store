import { connectDB } from "@/lib/db";
import ServiceTicket from "@/models/service-ticket";
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

    const total = await ServiceTicket.countDocuments(queryObject);

    const tickets = await ServiceTicket.find(queryObject)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

    return Response.json({
      tickets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching service tickets:", error);
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
    const { id, status, priority, assignedTo, internalNotes, estimatedCost, finalCost, isPaid } = body;

    if (!id) {
      return Response.json(
        { status: "error", message: "Ticket ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (internalNotes !== undefined) updateData.internalNotes = internalNotes;
    if (estimatedCost !== undefined) updateData.estimatedCost = estimatedCost;
    if (finalCost !== undefined) updateData.finalCost = finalCost;
    if (isPaid !== undefined) updateData.isPaid = isPaid;

    const ticket = await ServiceTicket.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );

    if (!ticket) {
      return Response.json(
        { status: "error", message: "Ticket not found" },
        { status: 404 }
      );
    }

    return Response.json({
      status: "success",
      ticket
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating service ticket:", error);
    return Response.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
