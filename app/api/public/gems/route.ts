import { connectDB } from "@/lib/db";
import Gem from "@/models/gem";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  try {
    const gems = await Gem.find({ isActive: true })
      .sort({ type: 1, name: 1 });

    return Response.json({
      gems
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching gems:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};
