import { CartItem } from './cart-context';

// Utility functions for cart calculations
export const calculateItemPrice = (item: CartItem): number => {
  const basePrice = item.product.salePrice && item.product.salePrice < item.product.price
    ? item.product.salePrice
    : item.product.price;

  const variantAdjustment = item.selectedVariant?.priceAdjustment || 0;
  const engravingCost = item.customEngraving ? 25 : 0; // $25 for custom engraving

  return basePrice + variantAdjustment + engravingCost;
};

export const calculateItemTotal = (item: CartItem): number => {
  return calculateItemPrice(item) * item.quantity;
};

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
};

export const calculateEstimatedTax = (subtotal: number, taxRate = 0.08): number => {
  return subtotal * taxRate;
};

export const calculateEstimatedShipping = (subtotal: number): number => {
  // Free shipping on orders over $500
  if (subtotal >= 500) return 0;

  // Standard shipping rates
  if (subtotal < 100) return 15;
  if (subtotal < 250) return 10;
  if (subtotal < 500) return 5;

  return 0;
};

export const calculateCartTotal = (
  items: CartItem[],
  taxRate = 0.08
): {
  subtotal: number;
  estimatedTax: number;
  estimatedShipping: number;
  total: number;
} => {
  const subtotal = calculateCartSubtotal(items);
  const estimatedTax = calculateEstimatedTax(subtotal, taxRate);
  const estimatedShipping = calculateEstimatedShipping(subtotal);
  const total = subtotal + estimatedTax + estimatedShipping;

  return {
    subtotal,
    estimatedTax,
    estimatedShipping,
    total,
  };
};

// Format currency with proper formatting
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Calculate discount percentage
export const calculateDiscountPercentage = (originalPrice: number, salePrice: number): number => {
  if (salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Generate cart summary for checkout
export const generateCartSummary = (items: CartItem[]) => {
  const summary = calculateCartTotal(items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    ...summary,
    itemCount,
    items: items.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      slug: item.product.slug,
      sku: item.product.sku,
      quantity: item.quantity,
      unitPrice: calculateItemPrice(item),
      totalPrice: calculateItemTotal(item),
      image: item.product.images.find(img => img.isPrimary) || item.product.images[0],
      variant: item.selectedVariant,
      engraving: item.customEngraving,
    })),
  };
};

// Check if any items in cart are out of stock
export const checkStockAvailability = (items: CartItem[]): {
  available: boolean;
  issues: Array<{ itemId: string; productName: string; issue: string }>;
} => {
  const issues: Array<{ itemId: string; productName: string; issue: string }> = [];

  items.forEach(item => {
    if (item.product.inventory?.trackInventory) {
      const availableStock = item.product.inventory.stock;
      const neededQuantity = item.quantity;

      if (availableStock < neededQuantity) {
        if (availableStock === 0) {
          issues.push({
            itemId: item.id,
            productName: item.product.name,
            issue: 'Out of stock'
          });
        } else {
          issues.push({
            itemId: item.id,
            productName: item.product.name,
            issue: `Only ${availableStock} available`
          });
        }
      }
    }
  });

  return {
    available: issues.length === 0,
    issues
  };
};

// Get recommended products based on cart items
export const getRecommendations = (items: CartItem[]): string[] => {
  const categories = items.map(item => item.product.category);
  const collections = items.flatMap(item => item.product.collections || []);

  // Get unique categories and collections
  const uniqueCategories = [...new Set(categories)];
  const uniqueCollections = [...new Set(collections)];

  return uniqueCategories.concat(uniqueCollections);
};