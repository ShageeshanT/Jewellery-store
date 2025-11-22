import { connectDB } from "@/lib/db";
import ServiceTicket from "@/models/service-ticket";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.contactNumber || !body.serviceType || !body.description) {
      return Response.json(
        {
          status: "error",
          message: "Missing required fields"
        },
        { status: 400 }
      );
    }

    // Create service ticket
    const ticket = await ServiceTicket.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      contactNumber: body.contactNumber,
      serviceType: body.serviceType,
      branchId: body.branchId,
      preferredDate: body.preferredDate ? new Date(body.preferredDate) : undefined,
      description: body.description,
      status: "new",
      priority: "medium",
    });

    return Response.json(
      {
        status: "success",
        message: "Service ticket submitted successfully",
        id: ticket.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating service ticket:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};
