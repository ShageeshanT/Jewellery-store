import mongoose, { Schema } from "mongoose";

// Define the Admin schema
const AdminSchema = new Schema(
  {
    // Link to the main user account
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User ID is required"],
      unique: true,
      index: true
    },

    // Admin role and permissions
    role: {
      type: String,
      required: [true, "Admin role is required"],
      enum: {
        values: ["admin", "manager", "designer", "customer_service"],
        message: "Invalid admin role"
      },
      default: "customer_service",
      index: true
    },

    // Specific permissions for granular control
    permissions: [{
      type: String,
      enum: [
        // Product management
        "view_products",
        "create_products",
        "edit_products",
        "delete_products",
        "manage_inventory",
        "manage_categories",

        // Order and customer management
        "view_orders",
        "manage_orders",
        "view_customers",
        "manage_customers",

        // Service request management
        "view_service_tickets",
        "manage_service_tickets",
        "view_custom_designs",
        "manage_custom_designs",

        // Admin and user management
        "view_admins",
        "manage_admins",
        "manage_permissions",

        // Analytics and reporting
        "view_analytics",
        "export_reports",
        "manage_financial_data",

        // Content management
        "manage_content",
        "manage_banners",
        "manage_promotions",

        // System settings
        "view_settings",
        "manage_settings",
        "view_logs"
      ]
    }],

    // Admin status and activation
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    lastLoginAt: {
      type: Date
    },
    loginCount: {
      type: Number,
      default: 0
    },

    // Department and team information
    department: {
      type: String,
      enum: ["management", "design", "production", "customer_service", "sales", "marketing", "it"],
      default: "customer_service"
    },
    team: {
      type: String,
      trim: true
    },
    reportsTo: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    },

    // Contact and availability
    contactInfo: {
      workPhone: String,
      extension: String,
      workEmail: String,
      timeZone: {
        type: String,
        default: "UTC"
      },
      workingHours: {
        monday: { start: String, end: String, available: Boolean },
        tuesday: { start: String, end: String, available: Boolean },
        wednesday: { start: String, end: String, available: Boolean },
        thursday: { start: String, end: String, available: Boolean },
        friday: { start: String, end: String, available: Boolean },
        saturday: { start: String, end: String, available: Boolean },
        sunday: { start: String, end: String, available: Boolean }
      }
    },

    // Specializations and expertise
    specializations: [{
      type: String,
      enum: [
        // Product specializations
        "rings", "necklaces", "bracelets", "earrings", "watches", "accessories",
        // Service specializations
        "repairs", "custom_design", "appraisals", "engraving", "restoration",
        // Skill specializations
        "gemstone_expert", "precious_metals", "vintage_jewellery", "luxury_brands",
        // Admin specializations
        "customer_relations", "inventory_management", "quality_control", "design_consultation"
      ]
    }],
    certifications: [{
      name: String,
      issuingOrganization: String,
      issueDate: Date,
      expiryDate: Date,
      credentialNumber: String,
      verificationUrl: String
    }],
    languages: [{
      language: String,
      proficiency: {
        type: String,
        enum: ["basic", "conversational", "professional", "native"]
      }
    }],

    // Performance metrics
    performance: {
      serviceTicketsHandled: {
        type: Number,
        default: 0
      },
      customDesignsCompleted: {
        type: Number,
        default: 0
      },
      averageResponseTime: Number, // in minutes
      customerSatisfactionScore: {
        type: Number,
        min: 0,
        max: 5
      },
      lastReviewDate: Date,
      nextReviewDate: Date
    },

    // Security and access
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    allowedIPRanges: [String], // CIDR notation
    sessionTimeoutMinutes: {
      type: Number,
      default: 480 // 8 hours
    },
    requiresApprovalFor: [{
      action: String,
      threshold: Number // Minimum value that requires approval
    }],

    // Email and notification preferences
    notificationPreferences: {
      emailNotifications: {
        newOrders: {
          type: Boolean,
          default: true
        },
        serviceRequests: {
          type: Boolean,
          default: true
        },
        lowInventoryAlerts: {
          type: Boolean,
          default: false
        },
        systemAlerts: {
          type: Boolean,
          default: true
        },
        customerInquiries: {
          type: Boolean,
          default: true
        },
        reports: {
          type: Boolean,
          default: false
        }
      },
      browserNotifications: {
        enabled: {
          type: Boolean,
          default: false
        },
        serviceRequests: {
          type: Boolean,
          default: true
        },
        urgentAlerts: {
          type: Boolean,
          default: true
        }
      }
    },

    // Dashboard preferences
    dashboardPreferences: {
      defaultView: {
        type: String,
        enum: ["overview", "products", "orders", "customers", "analytics"],
        default: "overview"
      },
      widgets: [{
        type: String,
        order: Number,
        visible: Boolean
      }],
      refreshInterval: {
        type: Number,
        default: 300000 // 5 minutes in milliseconds
      }
    },

    // Audit and logging
    loginHistory: [{
      timestamp: {
        type: Date,
        default: Date.now
      },
      ipAddress: String,
      userAgent: String,
      successful: Boolean,
      failureReason: String
    }],
    lastPasswordChange: Date,
    passwordChangeRequired: {
      type: Boolean,
      default: false
    },

    // Temporary access and permissions
    temporaryAccess: [{
      grantedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
      },
      permissions: [String],
      reason: String,
      expiresAt: {
        type: Date,
        required: true
      },
      grantedAt: {
        type: Date,
        default: Date.now
      }
    }],

    // Notes and additional information
    notes: String,
    hireDate: Date,
    terminationDate: Date,
    terminationReason: String
  },
  {
    timestamps: true,
    // Add indexes for common queries
    index: [
      { role: 1, isActive: 1 },
      { department: 1, isActive: 1 },
      { specializations: 1 },
      { lastLoginAt: -1 },
      { isActive: 1, role: 1 }
    ]
  }
);

// Virtual for full name (populated from user)
AdminSchema.virtual('fullName', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  match: { isActive: true }
});

// Virtual for email (populated from user)
AdminSchema.virtual('email', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  select: 'emailAddress'
});

// Virtual for hasPermission
AdminSchema.virtual('hasPermission').get(function() {
  return (permission: string) => {
    // Admin role has all permissions
    if (this.role === 'admin') return true;
    return this.permissions.includes(permission);
  };
});

// Virtual for isOnline (based on recent activity)
AdminSchema.virtual('isOnline').get(function() {
  if (!this.lastLoginAt) return false;
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return this.lastLoginAt > fiveMinutesAgo;
});

// Virtual for needsReview
AdminSchema.virtual('needsReview').get(function() {
  if (!this.performance.lastReviewDate) return true;
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  return this.performance.lastReviewDate < ninetyDaysAgo;
});

// Pre-save middleware to set default permissions based on role
AdminSchema.pre('save', function(this: any, next: any) {
  if (this.isNew || this.isModified('role')) {
    // Set permissions based on role
    switch (this.role) {
      case 'admin':
        this.permissions = [
          "view_products", "create_products", "edit_products", "delete_products", "manage_inventory", "manage_categories",
          "view_orders", "manage_orders", "view_customers", "manage_customers",
          "view_service_tickets", "manage_service_tickets", "view_custom_designs", "manage_custom_designs",
          "view_admins", "manage_admins", "manage_permissions",
          "view_analytics", "export_reports", "manage_financial_data",
          "manage_content", "manage_banners", "manage_promotions",
          "view_settings", "manage_settings", "view_logs"
        ];
        break;
      case 'manager':
        this.permissions = [
          "view_products", "create_products", "edit_products", "manage_inventory", "manage_categories",
          "view_orders", "manage_orders", "view_customers",
          "view_service_tickets", "manage_service_tickets", "view_custom_designs",
          "view_analytics", "export_reports",
          "manage_content", "manage_banners",
          "view_settings"
        ];
        break;
      case 'designer':
        this.permissions = [
          "view_products", "edit_products",
          "view_custom_designs", "manage_custom_designs",
          "view_service_tickets",
          "view_analytics"
        ];
        break;
      case 'customer_service':
        this.permissions = [
          "view_products",
          "view_orders",
          "view_customers",
          "view_service_tickets", "manage_service_tickets",
          "view_custom_designs"
        ];
        break;
    }
  }
  next();
});

// Pre-save middleware to validate working hours
AdminSchema.pre('save', function(this: any, next: any) {
  if (this.isModified('contactInfo.workingHours')) {
    // Validate working hours format
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    days.forEach(day => {
      const hours = this.contactInfo.workingHours[day];
      if (hours && hours.start && hours.end) {
        if (!timeRegex.test(hours.start) || !timeRegex.test(hours.end)) {
          next(new Error(`Invalid time format for ${day}. Use HH:MM format.`));
          return;
        }
      }
    });
  }
  next();
});

// Static methods
AdminSchema.statics.findByRole = function(this: any, role: string, activeOnly = true) {
  const query: any = { role };
  if (activeOnly) query.isActive = true;

  return this.find(query)
    .populate('userId', 'firstName lastName emailAddress')
    .populate('reportsTo', 'role')
    .sort({ createdAt: -1 });
};

AdminSchema.statics.findBySpecialization = function(this: any, specialization: string) {
  return this.find({
    specializations: specialization,
    isActive: true
  })
  .populate('userId', 'firstName lastName emailAddress');
};

AdminSchema.statics.findAvailableForTask = function(this: any, taskType: string, priority = 'normal') {
  const specializations = {
    'repair': ['repairs'],
    'custom_design': ['custom_design', 'design_consultation'],
    'appraisal': ['appraisals', 'gemstone_expert'],
    'customer_service': ['customer_relations'],
    'inventory': ['inventory_management']
  };

  const requiredSpecializations = specializations[taskType] || [];

  let query: any = { isActive: true };
  if (requiredSpecializations.length > 0) {
    query.specializations = { $in: requiredSpecializations };
  }

  return this.find(query)
    .populate('userId', 'firstName lastName emailAddress')
    .sort({ performance.customerSatisfactionScore: -1, lastLoginAt: -1 });
};

AdminSchema.statics.getPerformanceMetrics = function(this: any, startDate?: Date, endDate?: Date) {
  const matchStage = { isActive: true };
  if (startDate || endDate) {
    matchStage.createdAt = {};
    if (startDate) matchStage.createdAt.$gte = startDate;
    if (endDate) matchStage.createdAt.$lte = endDate;
  }

  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        averageSatisfaction: { $avg: '$performance.customerSatisfactionScore' },
        totalServiceTickets: { $sum: '$performance.serviceTicketsHandled' },
        totalCustomDesigns: { $sum: '$performance.customDesignsCompleted' },
        averageResponseTime: { $avg: '$performance.averageResponseTime' }
      }
    }
  ]);
};

// Instance methods
AdminSchema.methods.checkPermission = function(this: any, permission: string) {
  if (this.role === 'admin') return true;
  return this.permissions.includes(permission);
};

AdminSchema.methods.grantTemporaryAccess = function(this: any, permissions: string[], reason: string, durationHours: number, grantedBy: string) {
  this.temporaryAccess.push({
    grantedBy,
    permissions,
    reason,
    expiresAt: new Date(Date.now() + durationHours * 60 * 60 * 1000),
    grantedAt: new Date()
  });
  return this.save();
};

AdminSchema.methods.logLogin = function(this: any, ipAddress: string, userAgent: string, successful: boolean, failureReason?: string) {
  this.loginHistory.push({
    timestamp: new Date(),
    ipAddress,
    userAgent,
    successful,
    failureReason
  });

  if (successful) {
    this.lastLoginAt = new Date();
    this.loginCount += 1;
  }

  return this.save();
};

AdminSchema.methods.updatePerformance = function(this: any, metrics: any) {
  Object.assign(this.performance, metrics);
  this.performance.lastReviewDate = new Date();
  return this.save();
};

// Ensure virtuals are included in JSON
AdminSchema.set('toJSON', { virtuals: true });
AdminSchema.set('toObject', { virtuals: true });

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;