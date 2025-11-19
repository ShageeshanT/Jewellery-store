import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Product from "@/models/product";
import Category from "@/models/category";
import Admin from "@/models/admin";
import mongoose from "mongoose";

/**
 * GET endpoint to fetch products with filtering, pagination, and search
 * Query parameters:
 * - page: number (default 1)
 * - limit: number (default 20, max 100)
 * - category: string (filter by category)
 * - minPrice, maxPrice: number (price range filter)
 * - search: string (search in name, description, tags)
 * - sortBy: string (price, name, createdAt, featured)
 * - sortOrder: string (asc, desc)
 * - featured: boolean (filter featured products)
 * - new: boolean (filter new products)
 * - collections: string (comma-separated collection names)
 * - tags: string (comma-separated tag names)
 */
export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = { isActive: true };

    // Category filter
    const category = searchParams.get('category');
    if (category) {
      filter.category = category;
    }

    // Price range filter
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Featured and new filters
    const featured = searchParams.get('featured');
    const isNew = searchParams.get('new');
    if (featured === 'true') filter.isFeatured = true;
    if (isNew === 'true') filter.isNew = true;

    // Collections filter
    const collections = searchParams.get('collections');
    if (collections) {
      const collectionArray = collections.split(',').map(c => c.trim());
      filter.collections = { $in: collectionArray };
    }

    // Tags filter
    const tags = searchParams.get('tags');
    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim());
      filter.tags = { $in: tagArray };
    }

    // Search functionality
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'i');
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { tags: searchRegex },
        { collections: searchRegex },
        { 'specifications.material': searchRegex }
      ];
    }

    // Sorting
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-notes -inventory.reserved') // Exclude sensitive fields
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    // Get category information for products
    const categories = await Category.find({ isActive: true })
      .select('name slug')
      .lean();

    const categoryMap = categories.reduce((acc: any, cat: any) => {
      acc[cat.slug] = cat.name;
      return acc;
    }, {});

    // Enhance products with category names and calculated fields
    const enhancedProducts = products.map((product: any) => ({
      ...product,
      categoryName: categoryMap[product.category] || product.category,
      // Include virtual fields
      currentPrice: product.salePrice && product.salePrice < product.price ? product.salePrice : product.price,
      discountPercentage: product.salePrice && product.salePrice < product.price
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : 0,
      availableStock: product.inventory.trackInventory
        ? product.inventory.stock - (product.inventory.reserved || 0)
        : null,
      isLowStock: product.inventory.trackInventory
        ? (product.inventory.stock - (product.inventory.reserved || 0)) <= product.inventory.lowStockThreshold
        : false,
      isOutOfStock: product.inventory.trackInventory
        ? (product.inventory.stock - (product.inventory.reserved || 0)) <= 0 && !product.inventory.allowBackorder
        : false
    }));

    return Response.json({
      status: "success",
      message: "Products retrieved successfully",
      code: "PRODUCTS_RETRIEVED",
      data: {
        products: enhancedProducts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalProducts: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPreviousPage: page > 1
        },
        filters: {
          category,
          minPrice: minPrice || null,
          maxPrice: maxPrice || null,
          searchTerm,
          sortBy,
          sortOrder,
          featured: featured === 'true',
          new: isNew === 'true',
          collections: collections ? collections.split(',').map(c => c.trim()) : [],
          tags: tags ? tags.split(',').map(t => t.trim()) : []
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({
      status: "error",
      message: "Failed to fetch products",
      code: "FETCH_PRODUCTS_ERROR"
    }, { status: 500 });
  }
};

/**
 * POST endpoint to create a new product (admin only)
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

    // Check if user has admin permissions
    const admin = await Admin.findOne({ userId, isActive: true });
    if (!admin || !admin.checkPermission('create_products')) {
      return Response.json({
        status: "error",
        message: "Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS"
      }, { status: 403 });
    }

    const productData = await req.json();

    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'price', 'sku'];
    const missingFields = requiredFields.filter(field => !productData[field]);

    if (missingFields.length > 0) {
      return Response.json({
        status: "error",
        message: `Missing required fields: ${missingFields.join(', ')}`,
        code: "MISSING_REQUIRED_FIELDS"
      }, { status: 400 });
    }

    // Validate category exists
    const category = await Category.findOne({ slug: productData.category, isActive: true });
    if (!category) {
      return Response.json({
        status: "error",
        message: "Invalid category",
        code: "INVALID_CATEGORY"
      }, { status: 400 });
    }

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: productData.sku });
    if (existingProduct) {
      return Response.json({
        status: "error",
        message: "SKU already exists",
        code: "SKU_EXISTS"
      }, { status: 400 });
    }

    // Generate slug if not provided
    if (!productData.slug) {
      productData.slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Date.now();
    }

    // Validate images array
    if (productData.images && productData.images.length > 0) {
      const primaryImages = productData.images.filter((img: any) => img.isPrimary);
      if (primaryImages.length === 0) {
        productData.images[0].isPrimary = true;
      } else if (primaryImages.length > 1) {
        productData.images = productData.images.map((img: any, index: number) => ({
          ...img,
          isPrimary: index === 0
        }));
      }
    }

    // Create the product
    const product = await Product.create({
      ...productData,
      // Set defaults if not provided
      currency: productData.currency || 'USD',
      inventory: {
        stock: productData.inventory?.stock || 0,
        lowStockThreshold: productData.inventory?.lowStockThreshold || 5,
        allowBackorder: productData.inventory?.allowBackorder || false,
        reserved: 0,
        trackInventory: productData.inventory?.trackInventory !== false
      }
    });

    // Update category product count
    await category.updateProductCount();

    return Response.json({
      status: "success",
      message: "Product created successfully",
      code: "PRODUCT_CREATED",
      data: {
        product: {
          ...product.toJSON(),
          categoryName: category.name
        }
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);

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
      message: "Failed to create product",
      code: "CREATE_PRODUCT_ERROR"
    }, { status: 500 });
  }
};