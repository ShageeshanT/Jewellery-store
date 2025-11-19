import mongoose, { Schema } from "mongoose";

// Design reference image interface
interface DesignReference {
  url: {
    type: String;
    required: true;
  };
  filename: {
    type: String;
    required: true;
  };
  mimeType: {
    type: String;
    required: true;
  };
  size: Number;
  description: {
    type: String;
    trim: true,
    maxlength: [500, "Reference description cannot exceed 500 characters"]
  };
  tags: [String];
  uploadedAt: {
    type: Date,
    default: Date.now
  };
}

// Quote information interface
interface QuoteInfo {
  price: {
    amount: {
      type: Number,
      required: true,
      min: [0, "Quote price cannot be negative"]
    };
    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]
    };
  };
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [2000, "Quote description cannot exceed 2000 characters"]
  };
  breakdown: [{
    category: String,
    description: String,
    cost: Number,
    materials: [String],
    laborHours: Number
  }];
  estimatedDeliveryDays: Number;
  revisionsIncluded: {
    type: Number,
    default: 2,
    min: [0, "Revisions cannot be negative"]
  };
  validUntil: {
    type: Date,
    required: true
  };
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  };
  createdAt: {
    type: Date,
    default: Date.now
  };
}

// Design milestone interface
interface DesignMilestone {
  name: {
    type: String,
    required: true,
    trim: true
  };
  description: String;
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "delayed", "cancelled"],
    default: "pending"
  };
  estimatedDate: Date;
  actualDate: Date;
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  };
  notes: String,
  attachments: [{
    url: String,
    filename: String,
    mimeType: String,
    description: String
  }];
  completedAt: Date
}

// Custom design request schema
const CustomDesignRequestSchema = new Schema(
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
      dateOfBirth: Date, // For personalized designs
      anniversary: Date, // For anniversary gifts
      relationship: String // For relationship-specific designs
    },

    // Project basics
    projectTitle: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [200, "Project title cannot exceed 200 characters"]
    },
    projectDescription: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [5000, "Project description cannot exceed 5000 characters"]
    },
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      enum: {
        values: ["engagement_ring", "wedding_band", "pendant", "earrings", "bracelet", "brooch", "cufflinks", "custom_piece", "restoration", "other"],
        message: "Invalid project type"
      },
      index: true
    },

    // Design preferences
    style: {
      primary: {
        type: String,
        enum: ["vintage", "modern", "art_deco", "minimalist", "bohemian", "classic", "contemporary", "traditional", "industrial", "romantic"]
      },
      secondary: [String],
      inspirations: [String],
      era: String, // e.g., "Victorian", "Art Nouveau", "Mid-Century"
      keywords: [String]
    },

    // Material preferences
    materials: {
      primary: {
        type: String,
        enum: ["yellow_gold", "white_gold", "rose_gold", "platinum", "silver", "titanium", "palladium", "mixed"]
      },
      karat: {
        type: Number,
        enum: [10, 14, 18, 22, 24]
      },
      secondary: [String],
      plating: {
        type: String,
        enum: ["rhodium", "gold", "silver", "rose_gold", "black_rhodium"]
      },
      allergies: [String],
      sustainability: {
        recycled: {
          type: Boolean,
          default: false
        },
        ethicallySourced: {
          type: Boolean,
          default: false
        },
        fairTrade: {
          type: Boolean,
          default: false
        }
      }
    },

    // Gemstone preferences
    gemstones: [{
      type: {
        type: String,
        enum: ["diamond", "sapphire", "ruby", "emerald", "pearl", "opal", "tanzanite", "aquamarine", "moissanite", "other"]
      },
      shape: {
        type: String,
        enum: ["round", "princess", "emerald", "asscher", "marquise", "oval", "pear", "cushion", "heart", "radiant"]
      },
      size: {
        carats: Number,
        dimensions: {
          length: Number,
          width: Number,
          depth: Number
        }
      },
      quality: {
        color: String,
        clarity: String,
        cut: String,
        polish: String,
        symmetry: String
      },
      origin: String,
      treatment: String,
      certification: {
        lab: String,
        reportNumber: String
      },
      position: String, // Where it should be placed in the design
      significance: String // Personal meaning of this stone
    }],

    // Budget and timeline
    budget: {
      minimum: {
        amount: {
          type: Number,
          min: [0, "Minimum budget cannot be negative"]
        },
        currency: {
          type: String,
          default: "USD",
          enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]
        }
      },
      maximum: {
        amount: {
          type: Number,
          min: [0, "Maximum budget cannot be negative"]
        },
        currency: {
          type: String,
          default: "USD",
          enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]
        }
      },
      flexible: {
        type: Boolean,
        default: true
      },
      priority: {
        type: String,
        enum: ["quality", "budget", "timeline"],
        default: "quality"
      }
    },

    // Timeline requirements
    timeframe: {
      eventDate: Date,
      requiredBy: Date,
      flexibility: {
        type: String,
        enum: ["firm", "flexible", "negotiable"],
        default: "flexible"
      },
      urgency: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium"
      }
    },

    // Physical specifications
    specifications: {
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: {
          type: String,
          enum: ["mm", "cm", "inches"],
          default: "mm"
        }
      },
      weight: {
        minimum: Number,
        maximum: Number,
        unit: {
          type: String,
          enum: ["g", "oz"],
          default: "g"
        }
      },
      size: {
        ringSize: String,
        braceletLength: String,
        necklaceLength: String,
        customSizing: String
      },
      engraving: {
        text: String,
        font: String,
        placement: String,
        style: String
      }
    },

    // Reference images and inspiration
    referenceImages: [{
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
        maxlength: [500, "Reference description cannot exceed 500 characters"]
      },
      tags: [String],
      inspirationType: {
        type: String,
        enum: ["style", "material", "gemstone", "setting", "overall", "detail"]
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],

    // Quote information
    quotes: [{
      price: {
        amount: {
          type: Number,
          required: true,
          min: [0, "Quote price cannot be negative"]
        },
        currency: {
          type: String,
          default: "USD",
          enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]
        }
      },
      description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [2000, "Quote description cannot exceed 2000 characters"]
      },
      breakdown: [{
        category: String,
        description: String,
        cost: Number,
        materials: [String],
        laborHours: Number
      }],
      estimatedDeliveryDays: Number,
      revisionsIncluded: {
        type: Number,
        default: 2,
        min: [0, "Revisions cannot be negative"]
      },
      validUntil: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "expired"],
        default: "pending"
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],

    // Design milestones and progress
    milestones: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      description: String,
      status: {
        type: String,
        enum: ["pending", "in_progress", "completed", "delayed", "cancelled"],
        default: "pending"
      },
      estimatedDate: Date,
      actualDate: Date,
      assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      notes: String,
      attachments: [{
        url: String,
        filename: String,
        mimeType: String,
        description: String
      }],
      completedAt: Date
    }],

    // Project status and assignment
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "consultation", "designing", "quoted", "approved", "in_progress", "prototype", "production", "quality_check", "completed", "cancelled", "on_hold"],
        message: "Invalid request status"
      },
      default: "pending",
      index: true
    },
    priority: {
      type: String,
      enum: ["low", "normal", "high", "urgent"],
      default: "normal"
    },

    // Assignment
    designerAssigned: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    projectManager: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    // Client communication
    communicationLog: [{
      type: {
        type: String,
        enum: ["email", "phone", "meeting", "note"],
        required: true
      },
      participant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true,
        trim: true
      },
      attachments: [{
        url: String,
        filename: String,
        mimeType: String
      }],
      isInternal: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],

    // Final product details
    finalProduct: {
      images: [{
        url: String,
        filename: String,
        mimeType: String,
        description: String
      }],
      specifications: Schema.Types.Mixed,
      careInstructions: String,
      warranty: {
        period: Number,
        terms: String,
        certificate: String
      },
      packaging: {
        box: String,
        documentation: [String],
        appraisal: String
      }
    },

    // Payment information
    payment: {
      depositRequired: {
        type: Boolean,
        default: true
      },
      depositAmount: Number,
      depositPaid: {
        type: Boolean,
        default: false
      },
      depositPaidAt: Date,
      finalPaymentDue: Date,
      finalPaymentPaid: {
        type: Boolean,
        default: false
      },
      finalPaymentPaidAt: Date,
      totalPaid: Number
    },

    // Customer satisfaction
    customerFeedback: {
      designSatisfaction: {
        type: Number,
        min: 1,
        max: 5
      },
      craftsmanshipSatisfaction: {
        type: Number,
        min: 1,
        max: 5
      },
      overallSatisfaction: {
        type: Number,
        min: 1,
        max: 5
      },
      testimonial: String,
      wouldRecommend: Boolean,
      wouldOrderAgain: Boolean,
      publicFeedbackAllowed: Boolean
    },

    // Internal tracking
    complexity: {
      type: String,
      enum: ["simple", "moderate", "complex", "very_complex"],
      default: "moderate"
    },
    estimatedHours: Number,
    actualHours: Number,
    tags: [String],
    internalNotes: String,
    source: {
      type: String,
      enum: ["website", "referral", "social_media", "trade_show", "repeat_client"],
      default: "website"
    }
  },
  {
    timestamps: true,
    // Add compound indexes for common queries
    index: [
      { status: 1, priority: 1 },
      { userId: 1, status: 1 },
      { designerAssigned: 1, status: 1 },
      { projectType: 1, status: 1 },
      { createdAt: -1 },
      { timeframe: { requiredBy: 1 }, status: 1 }
    ]
  }
);

// Virtuals
CustomDesignRequestSchema.virtual('projectNumber').get(function(this: any) {
  return `CR-${this._id.toString().slice(-8).toUpperCase()}`;
});

CustomDesignRequestSchema.virtual('currentQuote').get(function(this: any) {
  return this.quotes.find((quote: any) => quote.status === 'accepted') ||
         this.quotes.find((quote: any) => quote.status === 'pending');
});

CustomDesignRequestSchema.virtual('isOverdue').get(function(this: any) {
  if (!this.timeframe.requiredBy) return false;
  return new Date() > this.timeframe.requiredBy && !["completed", "cancelled"].includes(this.status);
});

CustomDesignRequestSchema.virtual('progressPercentage').get(function(this: any) {
  if (!this.milestones || this.milestones.length === 0) return 0;
  const completed = this.milestones.filter((m: any) => m.status === 'completed').length;
  return Math.round((completed / this.milestones.length) * 100);
});

CustomDesignRequestSchema.virtual('customerName').get(function(this: any) {
  return `${this.customerInfo.firstName} ${this.customerInfo.lastName}`;
});

// Static methods
CustomDesignRequestSchema.statics.findByUser = function(this: any, userId: string, limit = 20) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('designerAssigned', 'firstName lastName email')
    .populate('projectManager', 'firstName lastName email');
};

CustomDesignRequestSchema.statics.findByDesigner = function(this: any, designerId: string, status?: string) {
  const query: any = { designerAssigned: designerId };
  if (status) query.status = status;

  return this.find(query)
    .sort({ createdAt: -1 })
    .populate('userId', 'firstName lastName email');
};

CustomDesignRequestSchema.statics.getStatistics = function(this: any, startDate?: Date, endDate?: Date) {
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
        designing: { $sum: { $cond: [{ $eq: ["$status", "designing"] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] } },
        completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
        averageProjectValue: {
          $avg: {
            $cond: [
              { $and: [{ $ne: ["$quotes", [] }, { $ne: ["$quotes.price.amount", null] }] },
              { $arrayElemAt: ["$quotes.price.amount", -1] },
              null
            ]
          }
        },
        averageCompletionDays: {
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
CustomDesignRequestSchema.methods.addMilestone = function(this: any, milestoneData: any) {
  this.milestones.push({
    ...milestoneData,
    createdAt: new Date()
  });
  return this.save();
};

CustomDesignRequestSchema.methods.updateMilestoneStatus = function(this: any, milestoneId: string, status: string) {
  const milestone = this.milestones.id(milestoneId);
  if (milestone) {
    milestone.status = status;
    if (status === 'completed') {
      milestone.completedAt = new Date();
      milestone.actualDate = new Date();
    }
    return this.save();
  }
  throw new Error('Milestone not found');
};

CustomDesignRequestSchema.methods.addQuote = function(this: any, quoteData: any, createdBy: string) {
  this.quotes.push({
    ...quoteData,
    createdBy,
    createdAt: new Date()
  });
  return this.save();
};

CustomDesignRequestSchema.methods.acceptQuote = function(this: any, quoteId: string) {
  // Reject all other quotes
  this.quotes.forEach((quote: any) => {
    if (quote._id.toString() !== quoteId) {
      quote.status = 'rejected';
    } else {
      quote.status = 'accepted';
    }
  });
  this.status = 'approved';
  return this.save();
};

CustomDesignRequestSchema.methods.addCommunication = function(this: any, type: string, participant: string, content: string, isInternal = false) {
  this.communicationLog.push({
    type,
    participant,
    content,
    isInternal,
    createdAt: new Date()
  });
  return this.save();
};

// Ensure virtuals are included in JSON
CustomDesignRequestSchema.set('toJSON', { virtuals: true });
CustomDesignRequestSchema.set('toObject', { virtuals: true });

const CustomDesignRequest = mongoose.models.CustomDesignRequest || mongoose.model("CustomDesignRequest", CustomDesignRequestSchema);

export type { DesignReference, QuoteInfo, DesignMilestone };
export default CustomDesignRequest;