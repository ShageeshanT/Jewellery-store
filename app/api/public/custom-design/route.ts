import { connectDB } from "@/lib/db";
import CustomDesign from "@/models/custom-design";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.contactNumber || !body.designType || !body.description) {
      return Response.json(
        {
          status: "error",
          message: "Missing required fields"
        },
        { status: 400 }
      );
    }

    // Create custom design request
    const design = await CustomDesign.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      contactNumber: body.contactNumber,
      preferredContactMethod: body.preferredContactMethod || "email",
      designType: body.designType,
      budget: body.budget,
      metalPreference: body.metalPreference,
      gemstonePreference: body.gemstonePreference,
      description: body.description,
      referenceImageUrl: body.referenceImageUrl,
      status: "new",
    });

    return Response.json(
      {
        status: "success",
        message: "Custom design request submitted successfully",
        id: design.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating custom design request:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};
