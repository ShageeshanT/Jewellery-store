import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import ServiceTicket from "@/models/service-ticket";
import Admin from "@/models/admin";
import mongoose from "mongoose";

/**
 * GET endpoint to fetch a single service ticket
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
    const canViewAll = admin && admin.checkPermission('view_service_tickets');

    // Find the service ticket
    const ticket = await ServiceTicket.findById(id)
      .populate('userId', 'firstName lastName emailAddress picture')
      .populate('assignedTo', 'firstName lastName email')
      .populate('notes.author', 'firstName lastName email');

    if (!ticket) {
      return Response.json({
        status: "error",
        message: "Service ticket not found",
        code: "SERVICE_TICKET_NOT_FOUND"
      }, { status: 404 });
    }

    // Check if user has permission to view this ticket
    if (!canViewAll && ticket.userId.toString() !== userId) {
      return Response.json({
        status: "error",
        message: "Access denied",
        code: "ACCESS_DENIED"
      }, { status: 403 });
    }

    // Filter notes based on user role
    const filteredNotes = ticket.notes.map((note: any) => ({
      ...note.toJSON(),
      content: (canViewAll || !note.isInternal) ? note.content : 'Internal note',
      isInternal: canViewAll ? note.isInternal : false
    }));

    // Prepare ticket data with virtual fields
    const ticketData = {
      ...ticket.toJSON(),
      notes: filteredNotes,
      daysOpen: Math.ceil((new Date().getTime() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
      customerName: `${ticket.customerInfo.firstName} ${ticket.customerInfo.lastName}`,
      isOverdue: ticket.estimatedCompletionDate &&
                new Date() > ticket.estimatedCompletionDate &&
                !["completed", "cancelled"].includes(ticket.status)
    };

    return Response.json({
      status: "success",
      message: "Service ticket retrieved successfully",
      code: "SERVICE_TICKET_RETRIEVED",
      data: {
        ticket: ticketData,
        permissions: {
          canEdit: admin && admin.checkPermission('manage_service_tickets'),
          canAssign: admin && admin.checkPermission('manage_service_tickets'),
          canViewInternal: canViewAll
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching service ticket:', error);
    return Response.json({
      status: "error",
      message: "Failed to fetch service ticket",
      code: "FETCH_SERVICE_TICKET_ERROR"
    }, { status: 500 });
  }
};

/**
 * PATCH endpoint to update a service ticket (admin only)
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
    if (!admin || !admin.checkPermission('manage_service_tickets')) {
      return Response.json({
        status: "error",
        message: "Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS"
      }, { status: 403 });
    }

    const updateData = await req.json();

    // Find the existing ticket
    const ticket = await ServiceTicket.findById(id);
    if (!ticket) {
      return Response.json({
        status: "error",
        message: "Service ticket not found",
        code: "SERVICE_TICKET_NOT_FOUND"
      }, { status: 404 });
    }

    // Track status changes for notes
    const statusChanged = updateData.status && updateData.status !== ticket.status;
    const assignedChanged = updateData.assignedTo && updateData.assignedTo !== ticket.assignedTo?.toString();

    // Update the ticket
    const updatedTicket = await ServiceTicket.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    .populate('userId', 'firstName lastName emailAddress picture')
    .populate('assignedTo', 'firstName lastName email')
    .populate('notes.author', 'firstName lastName email');

    if (!updatedTicket) {
      return Response.json({
        status: "error",
        message: "Failed to update service ticket",
        code: "UPDATE_FAILED"
      }, { status: 400 });
    }

    // Add automatic notes for status and assignment changes
    if (statusChanged) {
      await updatedTicket.addNote(userId, `Status changed from ${ticket.status} to ${updateData.status}`, false);
    }

    if (assignedChanged) {
      await updatedTicket.assignTo(updateData.assignedTo, userId);
    }

    // Add estimated cost note if provided
    if (updateData.estimatedCost) {
      await updatedTicket.setEstimatedCost(
        updateData.estimatedCost.amount,
        updateData.estimatedCost.breakdown || [],
        userId
      );
    }

    // Get the updated ticket with notes
    const finalTicket = await ServiceTicket.findById(id)
      .populate('userId', 'firstName lastName emailAddress picture')
      .populate('assignedTo', 'firstName lastName email')
      .populate('notes.author', 'firstName lastName email');

    // Prepare ticket data with virtual fields
    const ticketData = {
      ...finalTicket?.toJSON(),
      daysOpen: Math.ceil((new Date().getTime() - new Date(finalTicket?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24)),
      customerName: `${finalTicket?.customerInfo.firstName} ${finalTicket?.customerInfo.lastName}`
    };

    return Response.json({
      status: "success",
      message: "Service ticket updated successfully",
      code: "SERVICE_TICKET_UPDATED",
      data: {
        ticket: ticketData
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating service ticket:', error);

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
      message: "Failed to update service ticket",
      code: "UPDATE_SERVICE_TICKET_ERROR"
    }, { status: 500 });
  }
};

/**
 * POST endpoint to add a note to a service ticket
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

    const { content, isInternal = true } = await req.json();

    if (!content || content.trim().length === 0) {
      return Response.json({
        status: "error",
        message: "Note content is required",
        code: "MISSING_NOTE_CONTENT"
      }, { status: 400 });
    }

    // Check permissions for internal notes
    if (isInternal) {
      const admin = await Admin.findOne({ userId, isActive: true });
      if (!admin || !admin.checkPermission('manage_service_tickets')) {
        return Response.json({
          status: "error",
          message: "Insufficient permissions for internal notes",
          code: "INSUFFICIENT_PERMISSIONS"
        }, { status: 403 });
      }
    }

    // Find the ticket
    const ticket = await ServiceTicket.findById(id);
    if (!ticket) {
      return Response.json({
        status: "error",
        message: "Service ticket not found",
        code: "SERVICE_TICKET_NOT_FOUND"
      }, { status: 404 });
    }

    // Add the note
    await ticket.addNote(userId, content.trim(), isInternal);

    // Get updated ticket with new note
    const updatedTicket = await ServiceTicket.findById(id)
      .populate('notes.author', 'firstName lastName email')
      .select('notes');

    // Return the new note
    const newNote = updatedTicket?.notes[updatedTicket.notes.length - 1];

    return Response.json({
      status: "success",
      message: "Note added successfully",
      code: "NOTE_ADDED",
      data: {
        note: newNote
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding note to service ticket:', error);
    return Response.json({
      status: "error",
      message: "Failed to add note",
      code: "ADD_NOTE_ERROR"
    }, { status: 500 });
  }
};