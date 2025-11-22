import { connectDB } from "@/lib/db";
import Branch from "@/models/branch";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  try {
    const branches = await Branch.find({})
      .sort({ isFlagship: -1, displayOrder: 1, name: 1 });

    return Response.json({
      branches
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching branches:", error);
    return Response.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();

    const branch = await Branch.create(body);

    return Response.json({
      status: "success",
      branch
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating branch:", error);
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
    const { id, ...updateData } = body;

    if (!id) {
      return Response.json(
        { status: "error", message: "Branch ID is required" },
        { status: 400 }
      );
    }

    const branch = await Branch.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );

    if (!branch) {
      return Response.json(
        { status: "error", message: "Branch not found" },
        { status: 404 }
      );
    }

    return Response.json({
      status: "success",
      branch
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating branch:", error);
    return Response.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  await connectDB();

  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { status: "error", message: "Branch ID is required" },
        { status: 400 }
      );
    }

    const branch = await Branch.findOneAndDelete({ id });

    if (!branch) {
      return Response.json(
        { status: "error", message: "Branch not found" },
        { status: 404 }
      );
    }

    return Response.json({
      status: "success",
      message: "Branch deleted successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Error deleting branch:", error);
    return Response.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
