import mongoose, { Schema } from "mongoose";

// Service note interface
interface ServiceNote {
  author: {
    type: Schema.Types.ObjectId;
    ref: 'User';
    required: true;
  };
  content: {
    type: String;
    required: true;
    trim: true;
    maxlength: [2000, "Note content cannot exceed 2000 characters"]
  };
  isInternal: {
    type: Boolean,
    default: true // Internal notes are not visible to customers
  };
  attachments: [{
    url: String,
    filename: String,
    mimeType: String
  }];
  createdAt: {
    type: Date,
    default: Date.now
  };
}

// Service ticket interface
const ServiceTicketSchema = new Schema(
  {
    // Customer information
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User ID is required"],
      index: true
    },
    customerInfo: {
      firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },
      phone: {
        type: String,
        trim: true
      },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
      }
    },

    // Service request details
    type: {
      type: String,
      required: [true, "Service type is required"],
      enum: {
        values: ["repair", "resizing", "polishing", "cleaning", "appraisal", "engraving", "other"],
        message: "Invalid service type"
      },
      index: true
    },
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"]
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"]
    },
    urgency: {
      type: String,
      required: [true, "Urgency level is required"],
      enum: {
        values: ["low", "medium", "high", "urgent"],
        message: "Invalid urgency level"
      },
      default: "medium",
      index: true
    },

    // Product information
    productInfo: {
      name: {
        type: String,
        trim: true
      },
      brand: {
        type: String,
        trim: true
      },
      serialNumber: {
        type: String,
        trim: true
      },
      purchaseDate: {
        type: Date
      },
      purchaseLocation: {
        type: String,
        trim: true
      },
      estimatedValue: {
        amount: Number,
        currency: {
          type: String,
          default: "USD",
          enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]
        }
      },
      insuranceInfo: {
        company: String,
        policyNumber: String,
        coverageAmount: Number
      }
    },

    // Service images
    productImages: [{
      url: {
        type: String,
        required: true
      },
      filename: {
        type: String,
        required: true
      },
      mimeType: {
        type: String,
        required: true
      },
      size: Number,
      description: {
        type: String,
        trim: true,
        maxlength: [500, "Image description cannot exceed 500 characters"]
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],

    // Service specifics
    serviceDetails: {
      issueType: String,
      issueDescription: String,
      preferredResolution: String,
      specialInstructions: String,
      requiredMaterials: [String],
      estimatedCompletionDate: Date
    },

    // Cost and pricing
    estimatedCost: {
      amount: {
        type: Number,
        min: [0, "Estimated cost cannot be negative"]
      },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]
      },
      breakdown: [{
        item: String,
        cost: Number,
        description: String
      }]
    },
    finalCost: {
      amount: {
        type: Number,
        min: [0, "Final cost cannot be negative"]
      },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]
      },
      breakdown: [{
        item: String,
        cost: Number,
        description: String
      }]
    },

    // Ticket status and workflow
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "reviewed", "quoted", "approved", "in_progress", "testing", "completed", "cancelled", "on_hold"],
        message: "Invalid ticket status"
      },
      default: "pending",
      index: true
    },
    priority: {
      type: String,
      enum: ["low", "normal", "high", "critical"],
      default: "normal"
    },

    // Assignment and timeline
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    estimatedCompletionDate: Date,
    actualCompletionDate: Date,

    // Customer communication preferences
    communicationPreferences: {
      preferredContact: {
        type: String,
        enum: ["email", "phone", "sms"],
        default: "email"
      },
      emailUpdates: {
        type: Boolean,
        default: true
      },
      smsUpdates: {
        type: Boolean,
        default: false
      }
    },

    // Tracking and logistics
    tracking: {
      estimatedPickupDate: Date,
      actualPickupDate: Date,
      estimatedDeliveryDate: Date,
      actualDeliveryDate: Date,
      trackingNumber: String,
      carrier: String,
      shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
      }
    },

    // Notes and communication history
    notes: [{
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true,
        trim: true,
        maxlength: [2000, "Note content cannot exceed 2000 characters"]
      },
      isInternal: {
        type: Boolean,
        default: true
      },
      attachments: [{
        url: String,
        filename: String,
        mimeType: String
      }],
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],

    // Quality control and warranty
    qualityControl: {
      inspected: {
        type: Boolean,
        default: false
      },
      inspectedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      inspectionDate: Date,
      inspectionNotes: String,
      passedInspection: {
        type: Boolean,
        default: false
      }
    },
    warranty: {
      warrantyPeriod: Number, // in months
      warrantyType: String,
      warrantyTerms: String
    },

    // Customer feedback
    customerFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      feedback: String,
      wouldRecommend: Boolean,
      followupRequired: {
        type: Boolean,
        default: false
      }
    },

    // Internal tracking
    source: {
      type: String,
      enum: ["website", "phone", "email", "in_person", "referral"],
      default: "website"
    },
    tags: [String],
    internalNotes: String
  },
  {
    timestamps: true,
    // Add compound indexes for common queries
    index: [
      { status: 1, urgency: 1 },
      { userId: 1, status: 1 },
      { assignedTo: 1, status: 1 },
      { type: 1, status: 1 },
      { createdAt: -1 }
    ]
  }
);

// Virtuals
ServiceTicketSchema.virtual('isOverdue').get(function(this: any) {
  if (!this.estimatedCompletionDate) return false;
  return new Date() > this.estimatedCompletionDate && !["completed", "cancelled"].includes(this.status);
});

ServiceTicketSchema.virtual('daysOpen').get(function(this: any) {
  const now = new Date();
  const created = this.createdAt;
  const diffTime = Math.abs(now.getTime() - created.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

ServiceTicketSchema.virtual('customerName').get(function(this: any) {
  return `${this.customerInfo.firstName} ${this.customerInfo.lastName}`;
});

// Pre-save middleware for ticket number generation
ServiceTicketSchema.pre('save', function(this: any, next: any) {
  if (this.isNew && !this.ticketNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.ticketNumber = `SR-${year}${month}-${random}`;
  }
  next();
});

// Static methods
ServiceTicketSchema.statics.findByUser = function(this: any, userId: string, limit = 20) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('assignedTo', 'firstName lastName email');
};

ServiceTicketSchema.statics.findByStatus = function(this: any, status: string, limit = 20) {
  return this.find({ status })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('userId', 'firstName lastName email')
    .populate('assignedTo', 'firstName lastName email');
};

ServiceTicketSchema.statics.findOverdue = function(this: any, limit = 20) {
  return this.find({
    status: { $nin: ["completed", "cancelled"] },
    estimatedCompletionDate: { $lt: new Date() }
  })
  .sort({ estimatedCompletionDate: 1 })
  .limit(limit)
  .populate('userId', 'firstName lastName email')
  .populate('assignedTo', 'firstName lastName email');
};

ServiceTicketSchema.statics.getStatistics = function(this: any, startDate?: Date, endDate?: Date) {
  const matchStage = {};
  if (startDate || endDate) {
    matchStage.createdAt = {};
    if (startDate) matchStage.createdAt.$gte = startDate;
    if (endDate) matchStage.createdAt.$lte = endDate;
  }

  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] } },
        completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
        averageDaysToComplete: {
          $avg: {
            $cond: [
              { $eq: ["$status", "completed"] },
              { $divide: [{ $subtract: ["$updatedAt", "$createdAt"] }, 1000 * 60 * 60 * 24] },
              null
            ]
          }
        }
      }
    }
  ]);
};

// Instance methods
ServiceTicketSchema.methods.addNote = function(this: any, authorId: string, content: string, isInternal = true) {
  this.notes.push({
    author: authorId,
    content,
    isInternal,
    createdAt: new Date()
  });
  return this.save();
};

ServiceTicketSchema.methods.updateStatus = function(this: any, newStatus: string, updatedBy: string) {
  this.status = newStatus;

  // Set completion date if status is completed
  if (newStatus === "completed") {
    this.actualCompletionDate = new Date();
  }

  // Add status change note
  return this.addNote(updatedBy, `Status changed to ${newStatus}`, false);
};

ServiceTicketSchema.methods.assignTo = function(this: any, assignedTo: string, assignedBy: string) {
  this.assignedTo = assignedTo;
  return this.addNote(assignedBy, `Assigned to staff member`, false);
};

ServiceTicketSchema.methods.setEstimatedCost = function(this: any, cost: number, breakdown: any[], updatedBy: string) {
  this.estimatedCost = {
    amount: cost,
    currency: "USD",
    breakdown
  };
  return this.addNote(updatedBy, `Estimated cost: $${cost.toFixed(2)}`, true);
};

// Ensure virtuals are included in JSON
ServiceTicketSchema.set('toJSON', { virtuals: true });
ServiceTicketSchema.set('toObject', { virtuals: true });

const ServiceTicket = mongoose.models.ServiceTicket || mongoose.model("ServiceTicket", ServiceTicketSchema);

export type { ServiceNote };
export default ServiceTicket;