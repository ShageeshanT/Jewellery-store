import { connectDB } from "@/lib/db";
import Metal from "@/models/metal";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  try {
    const metals = await Metal.find({ isActive: true })
      .sort({ type: 1, purity: -1 });

    return Response.json({
      metals
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching metals:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};
