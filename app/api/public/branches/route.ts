import { connectDB } from "@/lib/db";
import Branch from "@/models/branch";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const city = searchParams.get("city");
  const service = searchParams.get("service");
  const includeInactive = searchParams.get("includeInactive") === "true";

  try {
    const queryObject: any = {};

    if (!includeInactive) {
      queryObject.isActive = true;
    }

    if (city) {
      queryObject["address.city"] = { $regex: city, $options: "i" };
    }

    if (service) {
      queryObject.services = { $in: [service] };
    }

    const branches = await Branch.find(queryObject)
      .sort({ isFlagship: -1, displayOrder: 1, name: 1 });

    return Response.json({
      branches
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching branches:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};
