import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import CustomDesignRequest from "@/models/custom-design-request";
import Admin from "@/models/admin";
import mongoose from "mongoose";

/**
 * GET endpoint to fetch custom design requests with filtering and pagination
 * Query parameters:
 * - page: number (default 1)
 * - limit: number (default 20, max 100)
 * - status: string (filter by status)
 * - projectType: string (filter by project type)
 * - priority: string (filter by priority)
 * - userId: string (filter by user)
 * - designerAssigned: string (filter by assigned designer)
 * - search: string (search in title, description)
 */
export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({
        status: "error",
        message: "Authentication required",
        code: "AUTHENTICATION_REQUIRED"
      }, { status: 401 });
    }

    // Check if user has admin permissions to view all requests, or only their own
    const admin = await Admin.findOne({ userId, isActive: true });
    const canViewAll = admin && admin.checkPermission('view_custom_designs');

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    // If not admin, only show user's own requests
    if (!canViewAll) {
      filter.userId = userId;
    }

    // Status filter
    const status = searchParams.get('status');
    if (status) {
      filter.status = status;
    }

    // Project type filter
    const projectType = searchParams.get('projectType');
    if (projectType) {
      filter.projectType = projectType;
    }

    // Priority filter
    const priority = searchParams.get('priority');
    if (priority) {
      filter.priority = priority;
    }

    // User filter (admin only)
    const userIdParam = searchParams.get('userId');
    if (userIdParam && canViewAll) {
      filter.userId = userIdParam;
    }

    // Assigned designer filter
    const designerAssigned = searchParams.get('designerAssigned');
    if (designerAssigned) {
      filter.designerAssigned = designerAssigned;
    }

    // Search functionality
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'i');
      filter.$or = [
        { projectTitle: searchRegex },
        { projectDescription: searchRegex },
        { 'customerInfo.firstName': searchRegex },
        { 'customerInfo.lastName': searchRegex },
        { 'customerInfo.email': searchRegex },
        { tags: searchRegex }
      ];
    }

    // Sort by most recent by default
    const sort = { createdAt: -1 };

    // Execute query
    const requests = await CustomDesignRequest.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('userId', 'firstName lastName emailAddress picture')
      .populate('designerAssigned', 'firstName lastName email')
      .populate('projectManager', 'firstName lastName email')
      .lean();

    // Get total count for pagination
    const total = await CustomDesignRequest.countDocuments(filter);

    // Enhance requests with virtual fields
    const enhancedRequests = requests.map((request: any) => ({
      ...request,
      projectNumber: `CR-${request._id.toString().slice(-8).toUpperCase()}`,
      daysOpen: Math.ceil((new Date().getTime() - new Date(request.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
      customerName: `${request.customerInfo.firstName} ${request.customerInfo.lastName}`,
      currentQuote: request.quotes?.find((quote: any) => quote.status === 'accepted') ||
                   request.quotes?.find((quote: any) => quote.status === 'pending'),
      progressPercentage: request.milestones && request.milestones.length > 0
        ? Math.round((request.milestones.filter((m: any) => m.status === 'completed').length / request.milestones.length) * 100)
        : 0,
      isOverdue: request.timeframe?.requiredBy &&
                new Date() > request.timeframe.requiredBy &&
                !["completed", "cancelled"].includes(request.status)
    }));

    return Response.json({
      status: "success",
      message: "Custom design requests retrieved successfully",
      code: "CUSTOM_DESIGNS_RETRIEVED",
      data: {
        requests: enhancedRequests,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRequests: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPreviousPage: page > 1
        },
        filters: {
          status,
          projectType,
          priority,
          userId: userIdParam,
          designerAssigned,
          searchTerm
        },
        canViewAll
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching custom design requests:', error);
    return Response.json({
      status: "error",
      message: "Failed to fetch custom design requests",
      code: "FETCH_CUSTOM_DESIGNS_ERROR"
    }, { status: 500 });
  }
};

/**
 * POST endpoint to create a new custom design request
 */
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({
        status: "error",
        message: "Authentication required",
        code: "AUTHENTICATION_REQUIRED"
      }, { status: 401 });
    }

    const requestData = await req.json();

    // Validate required fields
    const requiredFields = ['projectTitle', 'projectDescription', 'projectType'];
    const missingFields = requiredFields.filter(field => !requestData[field]);

    if (missingFields.length > 0) {
      return Response.json({
        status: "error",
        message: `Missing required fields: ${missingFields.join(', ')}`,
        code: "MISSING_REQUIRED_FIELDS"
      }, { status: 400 });
    }

    // Validate customer info
    if (!requestData.customerInfo || !requestData.customerInfo.firstName || !requestData.customerInfo.lastName || !requestData.customerInfo.email) {
      return Response.json({
        status: "error",
        message: "Customer information is required",
        code: "MISSING_CUSTOMER_INFO"
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestData.customerInfo.email)) {
      return Response.json({
        status: "error",
        message: "Invalid email format",
        code: "INVALID_EMAIL_FORMAT"
      }, { status: 400 });
    }

    // Validate budget if provided
    if (requestData.budget) {
      if (requestData.budget.minimum && requestData.budget.maximum && requestData.budget.minimum > requestData.budget.maximum) {
        return Response.json({
          status: "error",
          message: "Minimum budget cannot be greater than maximum budget",
          code: "INVALID_BUDGET_RANGE"
        }, { status: 400 });
      }
    }

    // Create the custom design request
    const request = await CustomDesignRequest.create({
      ...requestData,
      userId,
      // Set default values
      status: 'pending',
      priority: requestData.timeframe?.urgency || 'normal',
      complexity: requestData.complexity || 'moderate',
      payment: {
        depositRequired: true,
        depositPaid: false,
        depositAmount: null,
        finalPaymentPaid: false,
        totalPaid: 0
      },
      performance: {
        serviceTicketsHandled: 0,
        customDesignsCompleted: 0,
        averageResponseTime: 0,
        customerSatisfactionScore: 0
      }
    });

    // Populate user info for response
    const populatedRequest = await CustomDesignRequest.findById(request._id)
      .populate('userId', 'firstName lastName emailAddress picture')
      .populate('designerAssigned', 'firstName lastName email')
      .populate('projectManager', 'firstName lastName email');

    return Response.json({
      status: "success",
      message: "Custom design request created successfully",
      code: "CUSTOM_DESIGN_CREATED",
      data: {
        request: {
          ...populatedRequest?.toJSON(),
          projectNumber: `CR-${request._id.toString().slice(-8).toUpperCase()}`,
          daysOpen: 0,
          customerName: `${request.customerInfo.firstName} ${request.customerInfo.lastName}`
        }
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating custom design request:', error);

    // Handle validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return Response.json({
        status: "error",
        message: "Validation error",
        code: "VALIDATION_ERROR",
        errors
      }, { status: 400 });
    }

    return Response.json({
      status: "error",
      message: "Failed to create custom design request",
      code: "CREATE_CUSTOM_DESIGN_ERROR"
    }, { status: 500 });
  }
};