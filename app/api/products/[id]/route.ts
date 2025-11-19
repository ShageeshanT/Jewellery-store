import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Product from "@/models/product";
import Category from "@/models/category";
import Admin from "@/models/admin";
import mongoose from "mongoose";

/**
 * GET endpoint to fetch a single product by ID or slug
 */
export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { userId } = await auth();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Determine if id is MongoDB ObjectId or slug
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { slug: id };

    // Find the product
    const product = await Product.findOne({
      ...query,
      isActive: true
    }).populate('relatedProducts', 'name slug price images category');

    if (!product) {
      return Response.json({
        status: "error",
        message: "Product not found",
        code: "PRODUCT_NOT_FOUND"
      }, { status: 404 });
    }

    // Get category information
    const category = await Category.findOne({ slug: product.category, isActive: true });
    const categoryName = category ? category.name : product.category;

    // Get related products
    let relatedProducts = [];
    if (product.relatedProducts && product.relatedProducts.length > 0) {
      relatedProducts = await Product.find({
        _id: { $in: product.relatedProducts },
        isActive: true
      })
      .select('name slug price images category salePrice')
      .limit(6)
      .lean();
    } else {
      // Get products from same category as related
      relatedProducts = await Product.find({
        category: product.category,
        _id: { $ne: product._id },
        isActive: true
      })
      .select('name slug price images category salePrice')
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(6)
      .lean();
    }

    // Enhance related products
    const enhancedRelatedProducts = relatedProducts.map((relatedProduct: any) => ({
      ...relatedProduct,
      currentPrice: relatedProduct.salePrice && relatedProduct.salePrice < relatedProduct.price
        ? relatedProduct.salePrice
        : relatedProduct.price
    }));

    // Prepare product data with virtual fields
    const productData = {
      ...product.toJSON(),
      categoryName,
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
        : false,
      relatedProducts: enhancedRelatedProducts
    };

    return Response.json({
      status: "success",
      message: "Product retrieved successfully",
      code: "PRODUCT_RETRIEVED",
      data: {
        product: productData
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json({
      status: "error",
      message: "Failed to fetch product",
      code: "FETCH_PRODUCT_ERROR"
    }, { status: 500 });
  }
};

/**
 * PATCH endpoint to update a product (admin only)
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
    if (!admin || !admin.checkPermission('edit_products')) {
      return Response.json({
        status: "error",
        message: "Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS"
      }, { status: 403 });
    }

    const updateData = await req.json();

    // Determine if id is MongoDB ObjectId or slug
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { slug: id };

    // Find the existing product
    const product = await Product.findOne(query);
    if (!product) {
      return Response.json({
        status: "error",
        message: "Product not found",
        code: "PRODUCT_NOT_FOUND"
      }, { status: 404 });
    }

    // Validate category if being updated
    if (updateData.category) {
      const category = await Category.findOne({ slug: updateData.category, isActive: true });
      if (!category) {
        return Response.json({
          status: "error",
          message: "Invalid category",
          code: "INVALID_CATEGORY"
        }, { status: 400 });
      }
    }

    // Check for SKU conflict if SKU is being updated
    if (updateData.sku && updateData.sku !== product.sku) {
      const existingProduct = await Product.findOne({
        sku: updateData.sku,
        _id: { $ne: product._id }
      });
      if (existingProduct) {
        return Response.json({
          status: "error",
          message: "SKU already exists",
          code: "SKU_EXISTS"
        }, { status: 400 });
      }
    }

    // Generate slug if name is being updated and slug is not provided
    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Date.now();
    }

    // Validate images array if being updated
    if (updateData.images && updateData.images.length > 0) {
      const primaryImages = updateData.images.filter((img: any) => img.isPrimary);
      if (primaryImages.length === 0) {
        updateData.images[0].isPrimary = true;
      } else if (primaryImages.length > 1) {
        updateData.images = updateData.images.map((img: any, index: number) => ({
          ...img,
          isPrimary: index === 0
        }));
      }
    }

    // Update the product
    const updatedProduct = await Product.findOneAndUpdate(
      query,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('relatedProducts', 'name slug price images category');

    if (!updatedProduct) {
      return Response.json({
        status: "error",
        message: "Failed to update product",
        code: "UPDATE_FAILED"
      }, { status: 400 });
    }

    // Update category product count if category changed
    if (updateData.category && updateData.category !== product.category) {
      const newCategory = await Category.findOne({ slug: updateData.category });
      const oldCategory = await Category.findOne({ slug: product.category });

      if (newCategory) await newCategory.updateProductCount();
      if (oldCategory) await oldCategory.updateProductCount();
    }

    // Get category information
    const category = await Category.findOne({ slug: updatedProduct.category, isActive: true });
    const categoryName = category ? category.name : updatedProduct.category;

    return Response.json({
      status: "success",
      message: "Product updated successfully",
      code: "PRODUCT_UPDATED",
      data: {
        product: {
          ...updatedProduct.toJSON(),
          categoryName
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating product:', error);

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
      message: "Failed to update product",
      code: "UPDATE_PRODUCT_ERROR"
    }, { status: 500 });
  }
};

/**
 * DELETE endpoint to delete a product (admin only)
 */
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
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
    if (!admin || !admin.checkPermission('delete_products')) {
      return Response.json({
        status: "error",
        message: "Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS"
      }, { status: 403 });
    }

    // Determine if id is MongoDB ObjectId or slug
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { slug: id };

    // Find the product
    const product = await Product.findOne(query);
    if (!product) {
      return Response.json({
        status: "error",
        message: "Product not found",
        code: "PRODUCT_NOT_FOUND"
      }, { status: 404 });
    }

    // Soft delete by setting isActive to false
    const deletedProduct = await Product.findOneAndUpdate(
      query,
      {
        isActive: false,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!deletedProduct) {
      return Response.json({
        status: "error",
        message: "Failed to delete product",
        code: "DELETE_FAILED"
      }, { status: 400 });
    }

    // Update category product count
    const category = await Category.findOne({ slug: deletedProduct.category });
    if (category) {
      await category.updateProductCount();
    }

    return Response.json({
      status: "success",
      message: "Product deleted successfully",
      code: "PRODUCT_DELETED",
      data: {
        productId: deletedProduct._id,
        productName: deletedProduct.name,
        deletedAt: deletedProduct.updatedAt
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting product:', error);
    return Response.json({
      status: "error",
      message: "Failed to delete product",
      code: "DELETE_PRODUCT_ERROR"
    }, { status: 500 });
  }
};