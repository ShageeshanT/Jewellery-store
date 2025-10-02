import Feedback from "@/models/feedback";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

/**
 * POST endpoint to create a new user feedback
 * @param req NextRequest object containing feedback data (rate and feedback text)
 * @returns Response with success/error status and message
 */
export const POST = async (req: NextRequest) => {
  try {
    // Extract rate and feedback from request body
    const { rate, feedback } = await req.json();

    // Get authenticated user ID
    const { userId } = await auth();

    // Validate required fields
    if (!rate || !feedback) return;

    // Create new feedback document in database
    const newFeedback = await Feedback.create({
      star: rate,
      comment: feedback,
      userId,
    });

    // Return error if feedback creation failed
    if (!feedback) {
      return Response.json(
        {
          status: "error",
          message: "Something Wrong",
          code: "NOT_CREATE_FEEDBACK",
        },
        { status: 400 }
      );
    }

    // Return success response
    return Response.json(
      {
        status: "Success",
        message: "Feedback Saved",
        code: "FEEDBACK_CREATED",
      },
      { status: 201 }
    );
  } catch (err) {
    // Log and return server error
    console.error(err);
    return Response.json(
      {
        status: "error",
        message: "Server Error",
        code: "SERVER_ERR",
      },
      { status: 500 }
    );
  }
};
