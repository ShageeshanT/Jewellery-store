import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import ServiceTicket from "@/models/service-ticket";
import Admin from "@/models/admin";
import mongoose from "mongoose";

/**
 * GET endpoint to fetch service tickets with filtering and pagination
 * Query parameters:
 * - page: number (default 1)
 * - limit: number (default 20, max 100)
 * - status: string (filter by status)
 * - type: string (filter by type)
 * - urgency: string (filter by urgency)
 * - userId: string (filter by user)
 * - assignedTo: string (filter by assigned admin)
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

    // Check if user has admin permissions to view all tickets, or only their own
    const admin = await Admin.findOne({ userId, isActive: true });
    const canViewAll = admin && admin.checkPermission('view_service_tickets');

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    // If not admin, only show user's own tickets
    if (!canViewAll) {
      filter.userId = userId;
    }

    // Status filter
    const status = searchParams.get('status');
    if (status) {
      filter.status = status;
    }

    // Type filter
    const type = searchParams.get('type');
    if (type) {
      filter.type = type;
    }

    // Urgency filter
    const urgency = searchParams.get('urgency');
    if (urgency) {
      filter.urgency = urgency;
    }

    // User filter (admin only)
    const userIdParam = searchParams.get('userId');
    if (userIdParam && canViewAll) {
      filter.userId = userIdParam;
    }

    // Assigned admin filter
    const assignedTo = searchParams.get('assignedTo');
    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }

    // Search functionality
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'i');
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { ticketNumber: searchRegex },
        { 'customerInfo.firstName': searchRegex },
        { 'customerInfo.lastName': searchRegex },
        { 'customerInfo.email': searchRegex }
      ];
    }

    // Sort by most recent by default
    const sort = { createdAt: -1 };

    // Execute query
    const tickets = await ServiceTicket.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('userId', 'firstName lastName emailAddress picture')
      .populate('assignedTo', 'firstName lastName email')
      .lean();

    // Get total count for pagination
    const total = await ServiceTicket.countDocuments(filter);

    // Enhance tickets with virtual fields
    const enhancedTickets = tickets.map((ticket: any) => ({
      ...ticket,
      daysOpen: Math.ceil((new Date().getTime() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
      customerName: `${ticket.customerInfo.firstName} ${ticket.customerInfo.lastName}`
    }));

    return Response.json({
      status: "success",
      message: "Service tickets retrieved successfully",
      code: "SERVICE_TICKETS_RETRIEVED",
      data: {
        tickets: enhancedTickets,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalTickets: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPreviousPage: page > 1
        },
        filters: {
          status,
          type,
          urgency,
          userId: userIdParam,
          assignedTo,
          searchTerm
        },
        canViewAll
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching service tickets:', error);
    return Response.json({
      status: "error",
      message: "Failed to fetch service tickets",
      code: "FETCH_SERVICE_TICKETS_ERROR"
    }, { status: 500 });
  }
};

/**
 * POST endpoint to create a new service ticket
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

    const ticketData = await req.json();

    // Validate required fields
    const requiredFields = ['type', 'title', 'description', 'urgency'];
    const missingFields = requiredFields.filter(field => !ticketData[field]);

    if (missingFields.length > 0) {
      return Response.json({
        status: "error",
        message: `Missing required fields: ${missingFields.join(', ')}`,
        code: "MISSING_REQUIRED_FIELDS"
      }, { status: 400 });
    }

    // Validate customer info
    if (!ticketData.customerInfo || !ticketData.customerInfo.firstName || !ticketData.customerInfo.lastName || !ticketData.customerInfo.email) {
      return Response.json({
        status: "error",
        message: "Customer information is required",
        code: "MISSING_CUSTOMER_INFO"
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(ticketData.customerInfo.email)) {
      return Response.json({
        status: "error",
        message: "Invalid email format",
        code: "INVALID_EMAIL_FORMAT"
      }, { status: 400 });
    }

    // Create the service ticket
    const ticket = await ServiceTicket.create({
      ...ticketData,
      userId,
      // Set default values
      status: 'pending',
      priority: ticketData.urgency === 'urgent' ? 'critical' :
                ticketData.urgency === 'high' ? 'high' : 'normal',
      communicationPreferences: {
        preferredContact: 'email',
        emailUpdates: true,
        smsUpdates: false,
        ...ticketData.communicationPreferences
      }
    });

    // Populate user info for response
    const populatedTicket = await ServiceTicket.findById(ticket._id)
      .populate('userId', 'firstName lastName emailAddress picture')
      .populate('assignedTo', 'firstName lastName email');

    return Response.json({
      status: "success",
      message: "Service ticket created successfully",
      code: "SERVICE_TICKET_CREATED",
      data: {
        ticket: {
          ...populatedTicket?.toJSON(),
          daysOpen: 0,
          customerName: `${ticket.customerInfo.firstName} ${ticket.customerInfo.lastName}`
        }
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating service ticket:', error);

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
      message: "Failed to create service ticket",
      code: "CREATE_SERVICE_TICKET_ERROR"
    }, { status: 500 });
  }
};