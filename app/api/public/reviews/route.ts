import { connectDB } from "@/lib/db";
import Review from "@/models/review";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit")!) || 10;
  const page = parseInt(searchParams.get("page")!) || 0;
  const productId = searchParams.get("productId");
  const featured = searchParams.get("featured") === "true";

  try {
    // Build query object - only show approved reviews
    const queryObject: any = { status: "approved" };

    if (productId) {
      queryObject.productId = productId;
    }

    if (featured) {
      queryObject.featured = true;
    }

    // Fetch reviews with pagination
    const reviews = await Review.find(queryObject)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

    const total = await Review.countDocuments(queryObject);

    return Response.json({
      reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();

    // Validate required fields
    if (!body.customerName || !body.email || !body.rating || !body.comment) {
      return Response.json(
        {
          status: "error",
          message: "Missing required fields"
        },
        { status: 400 }
      );
    }

    // Validate rating
    if (body.rating < 1 || body.rating > 5) {
      return Response.json(
        {
          status: "error",
          message: "Rating must be between 1 and 5"
        },
        { status: 400 }
      );
    }

    // Create review (status will be 'pending' by default)
    const review = await Review.create({
      customerName: body.customerName,
      email: body.email,
      rating: body.rating,
      title: body.title,
      comment: body.comment,
      productId: body.productId,
      productName: body.productName,
      userId: body.userId,
    });

    return Response.json(
      {
        status: "success",
        message: "Review submitted successfully. It will be published after moderation.",
        reviewId: review.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating review:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
};
