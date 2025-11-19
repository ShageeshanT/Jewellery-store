import mongoose, { Schema } from "mongoose";

// Define the Category schema
const CategorySchema = new Schema(
  {
    // Basic category information
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"]
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Category description cannot exceed 500 characters"]
    },

    // Category display
    image: {
      type: String,
      trim: true
    },
    icon: {
      type: String,
      trim: true
    },
    color: {
      type: String,
      default: "#d4af37", // Default gold color for luxury theme
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"]
    },

    // Category organization
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    level: {
      type: Number,
      default: 0,
      min: [0, "Category level cannot be negative"]
    },
    displayOrder: {
      type: Number,
      default: 0
    },

    // Category settings
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    isVisibleInMenu: {
      type: Boolean,
      default: true
    },
    showInHomepage: {
      type: Boolean,
      default: false
    },

    // SEO and metadata
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

    // Category configuration
    minPriceFilter: {
      type: Number,
      min: [0, "Minimum price cannot be negative"]
    },
    maxPriceFilter: {
      type: Number,
      min: [0, "Maximum price cannot be negative"]
    },

    // Custom attributes for this category
    attributes: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      type: {
        type: String,
        enum: ["text", "number", "select", "multiselect", "boolean"],
        default: "text"
      },
      required: {
        type: Boolean,
        default: false
      },
      options: [String], // For select/multiselect types
      unit: String, // For number type
      validation: {
        min: Number,
        max: Number,
        pattern: String
      }
    }],

    // Featured products in this category
    featuredProducts: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],

    // Category statistics
    productCount: {
      type: Number,
      default: 0
    },
    totalViews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    // Add indexes for common queries
    index: [
      { parentCategory: 1, displayOrder: 1 },
      { isActive: 1, displayOrder: 1 },
      { isVisibleInMenu: 1, displayOrder: 1 }
    ]
  }
);

// Virtual for subcategories
CategorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentCategory'
});

// Virtual for full path (including parent categories)
CategorySchema.virtual('fullPath').get(function(this: any) {
  // This would need to be populated with parent data to work properly
  return this.name; // Simplified for now
});

// Virtual for hasProducts
CategorySchema.virtual('hasProducts').get(function(this: any) {
  return this.productCount > 0;
});

// Pre-save middleware to generate slug from name
CategorySchema.pre('save', function(this: any, next: any) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Set level based on parent category
  if (this.isModified('parentCategory')) {
    this.level = this.parentCategory ? 1 : 0;
  }

  next();
});

// Pre-remove middleware to handle cascading deletes
CategorySchema.pre('deleteOne', { document: true, query: false }, async function(this: any) {
  // Remove or update subcategories
  await mongoose.model('Category').updateMany(
    { parentCategory: this._id },
    { parentCategory: null, level: 0 }
  );

  // Update products that use this category
  await mongoose.model('Product').updateMany(
    { category: this.slug },
    { isActive: false }
  );
});

// Static methods
CategorySchema.statics.findActive = function(this: any) {
  return this.find({ isActive: true }).sort({ displayOrder: 1, name: 1 });
};

CategorySchema.statics.findMenuCategories = function(this: any) {
  return this.find({ isActive: true, isVisibleInMenu: true })
    .sort({ displayOrder: 1, name: 1 })
    .populate('parentCategory');
};

CategorySchema.statics.findTopLevel = function(this: any) {
  return this.find({ isActive: true, parentCategory: null })
    .sort({ displayOrder: 1, name: 1 });
};

CategorySchema.statics.findHomepageCategories = function(this: any) {
  return this.find({ isActive: true, showInHomepage: true })
    .sort({ displayOrder: 1, name: 1 })
    .limit(6);
};

CategorySchema.statics.findBySlug = function(this: any, slug: string) {
  return this.findOne({ slug, isActive: true });
};

// Instance methods
CategorySchema.methods.updateProductCount = async function(this: any) {
  const Product = mongoose.model('Product');
  const count = await Product.countDocuments({
    category: this.slug,
    isActive: true
  });
  this.productCount = count;
  return this.save();
};

CategorySchema.methods.incrementViews = function(this: any) {
  this.totalViews += 1;
  return this.save();
};

CategorySchema.methods.getHierarchy = async function(this: any) {
  const categories = [];
  let current = this;

  while (current) {
    categories.unshift(current);
    if (current.parentCategory) {
      const parent = await mongoose.model('Category').findById(current.parentCategory);
      current = parent;
    } else {
      current = null;
    }
  }

  return categories;
};

// Ensure virtuals are included in JSON
CategorySchema.set('toJSON', { virtuals: true });
CategorySchema.set('toObject', { virtuals: true });

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;