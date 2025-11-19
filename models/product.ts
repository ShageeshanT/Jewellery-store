import mongoose, { Schema } from "mongoose";

// Product image interface
interface ProductImage {
  url: string;
  altText: string;
  isPrimary: boolean;
  order: number;
}

// Product specifications interface
interface ProductSpecifications {
  material: string[];
  weight?: {
    value: number;
    unit: string; // "g", "kg", "oz", etc.
  };
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit: string; // "mm", "cm", "inches"
  };
  gemstone?: string[];
  carat?: number;
  color?: string[];
  clarity?: string;
  cut?: string;
  setting?: string;
  chainLength?: string; // For necklaces
  ringSize?: string; // For rings (if applicable)
}

// Inventory interface
interface ProductInventory {
  stock: number;
  lowStockThreshold: number;
  allowBackorder: boolean;
  reserved: number; // Items in carts but not purchased
  trackInventory: boolean;
}

// Define the Product schema
const ProductSchema = new Schema(
  {
    // Basic product information
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"]
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    // Categorization
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: ["rings", "necklaces", "bracelets", "earrings", "watches", "accessories", "brooches", "cufflinks", "pendants"],
        message: "Invalid product category"
      },
      index: true
    },
    subcategory: {
      type: String,
      trim: true,
      index: true
    },

    // Pricing
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"]
    },
    salePrice: {
      type: Number,
      min: [0, "Sale price cannot be negative"],
      validate: {
        validator: function(this: any, value: number) {
          // If sale price is set, it must be less than regular price
          return !value || value < this.price;
        },
        message: "Sale price must be less than regular price"
      }
    },
    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]
    },

    // SKU and product codes
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    barcode: {
      type: String,
      trim: true
    },

    // Product images
    images: [{
      url: {
        type: String,
        required: [true, "Image URL is required"]
      },
      altText: {
        type: String,
        required: [true, "Image alt text is required"],
        trim: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      },
      order: {
        type: Number,
        default: 0
      }
    }],

    // Product specifications
    specifications: {
      material: [String],
      weight: {
        value: Number,
        unit: {
          type: String,
          enum: ["g", "kg", "oz", "lb"],
          default: "g"
        }
      },
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
      gemstone: [String],
      carat: Number,
      color: [String],
      clarity: String,
      cut: String,
      setting: String,
      chainLength: String,
      ringSize: String,
      custom: Schema.Types.Mixed // For additional custom fields
    },

    // Inventory management
    inventory: {
      stock: {
        type: Number,
        default: 0,
        min: [0, "Stock cannot be negative"]
      },
      lowStockThreshold: {
        type: Number,
        default: 5,
        min: [0, "Low stock threshold cannot be negative"]
      },
      allowBackorder: {
        type: Boolean,
        default: false
      },
      reserved: {
        type: Number,
        default: 0,
        min: [0, "Reserved stock cannot be negative"]
      },
      trackInventory: {
        type: Boolean,
        default: true
      }
    },

    // Collections and tags
    collections: [{
      type: String,
      trim: true,
      index: true
    }],
    tags: [{
      type: String,
      trim: true,
      index: true
    }],

    // Product status and flags
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    isNew: {
      type: Boolean,
      default: false,
      index: true
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    },
    isLimitedEdition: {
      type: Boolean,
      default: false
    },
    isCustomizable: {
      type: Boolean,
      default: false
    },

    // SEO and marketing
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, "Meta title cannot exceed 60 characters"]
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, "Meta description cannot exceed 160 characters"]
    },

    // Product variants (for size, color, etc.)
    variants: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      options: [{
        name: {
          type: String,
          required: true,
          trim: true
        },
        value: {
          type: String,
          required: true,
          trim: true
        },
        priceAdjustment: {
          type: Number,
          default: 0
        },
        sku: {
          type: String,
          trim: true
        }
      }]
    }],

    // Related products
    relatedProducts: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],

    // Product care instructions
    careInstructions: {
      type: String,
      trim: true
    },

    // Warranty information
    warranty: {
      type: String,
      trim: true
    },

    // Product origin/manufacturing
    origin: {
      type: String,
      trim: true
    },
    manufacturer: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    // Add compound indexes for common queries
    index: [
      { category: 1, isActive: 1 },
      { collections: 1, isActive: 1 },
      { tags: 1, isActive: 1 },
      { isNew: 1, isActive: 1 },
      { isFeatured: 1, isActive: 1 }
    ]
  }
);

// Virtual for available stock
ProductSchema.virtual('availableStock').get(function(this: any) {
  return this.inventory.stock - this.inventory.reserved;
});

// Virtual for isLowStock
ProductSchema.virtual('isLowStock').get(function(this: any) {
  if (!this.inventory.trackInventory) return false;
  return this.availableStock <= this.inventory.lowStockThreshold;
});

// Virtual for isOutOfStock
ProductSchema.virtual('isOutOfStock').get(function(this: any) {
  if (!this.inventory.trackInventory) return false;
  return this.availableStock <= 0 && !this.inventory.allowBackorder;
});

// Virtual for current price (considering sale price)
ProductSchema.virtual('currentPrice').get(function(this: any) {
  return this.salePrice && this.salePrice < this.price ? this.salePrice : this.price;
});

// Virtual for discount percentage
ProductSchema.virtual('discountPercentage').get(function(this: any) {
  if (!this.salePrice || this.salePrice >= this.price) return 0;
  return Math.round(((this.price - this.salePrice) / this.price) * 100);
});

// Pre-save middleware to generate slug from name
ProductSchema.pre('save', function(this: any, next: any) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }

  // Ensure only one primary image
  const primaryImages = this.images.filter((img: any) => img.isPrimary);
  if (primaryImages.length > 1) {
    this.images = this.images.map((img: any, index: number) => ({
      ...img,
      isPrimary: index === 0
    }));
  } else if (primaryImages.length === 0 && this.images.length > 0) {
    this.images[0].isPrimary = true;
  }

  next();
});

// Instance methods
ProductSchema.methods.addToInventory = function(this: any, quantity: number) {
  if (quantity > 0) {
    this.inventory.stock += quantity;
  }
};

ProductSchema.methods.reserveInventory = function(this: any, quantity: number) {
  if (quantity > 0 && this.availableStock >= quantity) {
    this.inventory.reserved += quantity;
    return true;
  }
  return false;
};

ProductSchema.methods.releaseInventory = function(this: any, quantity: number) {
  if (quantity > 0 && this.inventory.reserved >= quantity) {
    this.inventory.reserved -= quantity;
    return true;
  }
  return false;
};

ProductSchema.methods.consumeInventory = function(this: any, quantity: number) {
  if (quantity > 0 && this.inventory.reserved >= quantity) {
    this.inventory.reserved -= quantity;
    this.inventory.stock -= quantity;
    return true;
  }
  return false;
};

// Static methods
ProductSchema.statics.findActive = function(this: any, filter = {}) {
  return this.find({ ...filter, isActive: true });
};

ProductSchema.statics.findFeatured = function(this: any, limit = 10) {
  return this.find({ isActive: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

ProductSchema.statics.findNew = function(this: any, limit = 10) {
  return this.find({ isActive: true, isNew: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

ProductSchema.statics.findByCategory = function(this: any, category: string, limit = 20) {
  return this.find({ isActive: true, category })
    .sort({ createdAt: -1 })
    .limit(limit);
};

ProductSchema.statics.search = function(this: any, searchTerm: string, limit = 20) {
  const regex = new RegExp(searchTerm, 'i');
  return this.find({
    isActive: true,
    $or: [
      { name: regex },
      { description: regex },
      { tags: regex },
      { collections: regex },
      { 'specifications.material': regex }
    ]
  })
  .sort({ _score: { $meta: 'textScore' } })
  .limit(limit);
};

// Ensure virtuals are included in JSON
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export type { ProductImage, ProductSpecifications, ProductInventory };
export default Product;