import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import CustomDesignRequest from "@/models/custom-design-request";
import Admin from "@/models/admin";
import mongoose from "mongoose";

/**
 * GET endpoint to fetch a single custom design request
 */
export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { userId } = await auth();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!userId) {
      return Response.json({
        status: "error",
        message: "Authentication required",
        code: "AUTHENTICATION_REQUIRED"
      }, { status: 401 });
    }

    // Check if user has admin permissions
    const admin = await Admin.findOne({ userId, isActive: true });
    const canViewAll = admin && admin.checkPermission('view_custom_designs');

    // Find the custom design request
    const request = await CustomDesignRequest.findById(id)
      .populate('userId', 'firstName lastName emailAddress picture')
      .populate('designerAssigned', 'firstName lastName email')
      .populate('projectManager', 'firstName lastName email')
      .populate('communicationLog.participant', 'firstName lastName email');

    if (!request) {
      return Response.json({
        status: "error",
        message: "Custom design request not found",
        code: "CUSTOM_DESIGN_NOT_FOUND"
      }, { status: 404 });
    }

    // Check if user has permission to view this request
    if (!canViewAll && request.userId.toString() !== userId) {
      return Response.json({
        status: "error",
        message: "Access denied",
        code: "ACCESS_DENIED"
      }, { status: 403 });
    }

    // Prepare request data with virtual fields
    const requestData = {
      ...request.toJSON(),
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
    };

    return Response.json({
      status: "success",
      message: "Custom design request retrieved successfully",
      code: "CUSTOM_DESIGN_RETRIEVED",
      data: {
        request: requestData,
        permissions: {
          canEdit: admin && admin.checkPermission('manage_custom_designs'),
          canAssignDesigner: admin && admin.checkPermission('manage_custom_designs'),
          canManageQuotes: admin && admin.checkPermission('manage_custom_designs'),
          canViewInternal: canViewAll
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching custom design request:', error);
    return Response.json({
      status: "error",
      message: "Failed to fetch custom design request",
      code: "FETCH_CUSTOM_DESIGN_ERROR"
    }, { status: 500 });
  }
};

/**
 * PATCH endpoint to update a custom design request (admin only)
 */
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { userId } = await auth();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!userId) {
      return Response.json({
        status: "error",
        message: "Authentication required",
        code: "AUTHENTICATION_REQUIRED"
      }, { status: 401 });
    }

    // Check if user has admin permissions
    const admin = await Admin.findOne({ userId, isActive: true });
    if (!admin || !admin.checkPermission('manage_custom_designs')) {
      return Response.json({
        status: "error",
        message: "Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS"
      }, { status: 403 });
    }

    const updateData = await req.json();

    // Find the existing request
    const request = await CustomDesignRequest.findById(id);
    if (!request) {
      return Response.json({
        status: "error",
        message: "Custom design request not found",
        code: "CUSTOM_DESIGN_NOT_FOUND"
      }, { status: 404 });
    }

    // Track status changes for communication log
    const statusChanged = updateData.status && updateData.status !== request.status;

    // Update the request
    const updatedRequest = await CustomDesignRequest.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    .populate('userId', 'firstName lastName emailAddress picture')
    .populate('designerAssigned', 'firstName lastName email')
    .populate('projectManager', 'firstName lastName email');

    if (!updatedRequest) {
      return Response.json({
        status: "error",
        message: "Failed to update custom design request",
        code: "UPDATE_FAILED"
      }, { status: 400 });
    }

    // Add communication log entry for status changes
    if (statusChanged) {
      await updatedRequest.addCommunication(
        'note',
        userId,
        `Status changed from ${request.status} to ${updateData.status}`,
        false // This should be visible to customer
      );
    }

    // Set completion date if status is completed
    if (updateData.status === "completed") {
      await CustomDesignRequest.findByIdAndUpdate(
        id,
        { actualCompletionDate: new Date() }
      );
    }

    // Get the updated request
    const finalRequest = await CustomDesignRequest.findById(id)
      .populate('userId', 'firstName lastName emailAddress picture')
      .populate('designerAssigned', 'firstName lastName email')
      .populate('projectManager', 'firstName lastName email');

    // Prepare request data with virtual fields
    const requestData = {
      ...finalRequest?.toJSON(),
      projectNumber: `CR-${finalRequest?._id.toString().slice(-8).toUpperCase()}`,
      daysOpen: Math.ceil((new Date().getTime() - new Date(finalRequest?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24)),
      customerName: `${finalRequest?.customerInfo.firstName} ${finalRequest?.customerInfo.lastName}`
    };

    return Response.json({
      status: "success",
      message: "Custom design request updated successfully",
      code: "CUSTOM_DESIGN_UPDATED",
      data: {
        request: requestData
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating custom design request:', error);

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
      message: "Failed to update custom design request",
      code: "UPDATE_CUSTOM_DESIGN_ERROR"
    }, { status: 500 });
  }
};

/**
 * POST endpoint to add a quote to a custom design request (admin only)
 */
export const POST = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { userId } = await auth();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!userId) {
      return Response.json({
        status: "error",
        message: "Authentication required",
        code: "AUTHENTICATION_REQUIRED"
      }, { status: 401 });
    }

    // Check if user has admin permissions
    const admin = await Admin.findOne({ userId, isActive: true });
    if (!admin || !admin.checkPermission('manage_custom_designs')) {
      return Response.json({
        status: "error",
        message: "Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS"
      }, { status: 403 });
    }

    const quoteData = await req.json();

    // Validate required fields
    if (!quoteData.price || !quoteData.description) {
      return Response.json({
        status: "error",
        message: "Quote price and description are required",
        code: "MISSING_QUOTE_INFO"
      }, { status: 400 });
    }

    // Find the custom design request
    const request = await CustomDesignRequest.findById(id);
    if (!request) {
      return Response.json({
        status: "error",
        message: "Custom design request not found",
        code: "CUSTOM_DESIGN_NOT_FOUND"
      }, { status: 404 });
    }

    // Set validity period (default 30 days)
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + (quoteData.validityDays || 30));

    // Add the quote
    await request.addQuote({
      price: quoteData.price,
      description: quoteData.description,
      breakdown: quoteData.breakdown || [],
      estimatedDeliveryDays: quoteData.estimatedDeliveryDays || 14,
      revisionsIncluded: quoteData.revisionsIncluded || 2,
      validUntil
    }, userId);

    // Add communication log entry
    await request.addCommunication(
      'email',
      userId,
      `Quote sent: ${quoteData.price.currency} ${quoteData.price.amount.toFixed(2)}`,
      false
    );

    // Update status to quoted if not already quoted
    if (request.status === 'pending' || request.status === 'consultation') {
      await CustomDesignRequest.findByIdAndUpdate(id, { status: 'quoted' });
    }

    // Get the updated request with the new quote
    const updatedRequest = await CustomDesignRequest.findById(id)
      .populate('quotes.createdBy', 'firstName lastName email')
      .select('quotes');

    // Return the new quote
    const newQuote = updatedRequest?.quotes[updatedRequest.quotes.length - 1];

    return Response.json({
      status: "success",
      message: "Quote added successfully",
      code: "QUOTE_ADDED",
      data: {
        quote: newQuote
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding quote to custom design request:', error);
    return Response.json({
      status: "error",
      message: "Failed to add quote",
      code: "ADD_QUOTE_ERROR"
    }, { status: 500 });
  }
};

/**
 * PUT endpoint to accept a quote (customer only)
 */
export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { userId } = await auth();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!userId) {
      return Response.json({
        status: "error",
        message: "Authentication required",
        code: "AUTHENTICATION_REQUIRED"
      }, { status: 401 });
    }

    const { quoteId } = await req.json();

    if (!quoteId) {
      return Response.json({
        status: "error",
        message: "Quote ID is required",
        code: "MISSING_QUOTE_ID"
      }, { status: 400 });
    }

    // Find the custom design request
    const request = await CustomDesignRequest.findById(id);
    if (!request) {
      return Response.json({
        status: "error",
        message: "Custom design request not found",
        code: "CUSTOM_DESIGN_NOT_FOUND"
      }, { status: 404 });
    }

    // Check if user owns this request
    if (request.userId.toString() !== userId) {
      return Response.json({
        status: "error",
        message: "Access denied",
        code: "ACCESS_DENIED"
      }, { status: 403 });
    }

    // Accept the quote
    await request.acceptQuote(quoteId);

    // Add communication log entry
    await request.addCommunication(
      'email',
      userId,
      'Quote accepted by customer',
      false
    );

    return Response.json({
      status: "success",
      message: "Quote accepted successfully",
      code: "QUOTE_ACCEPTED"
    }, { status: 200 });

  } catch (error) {
    console.error('Error accepting quote:', error);
    return Response.json({
      status: "error",
      message: "Failed to accept quote",
      code: "ACCEPT_QUOTE_ERROR"
    }, { status: 500 });
  }
};