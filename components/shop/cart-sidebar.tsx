"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { formatCurrency, calculateCartTotal } from '@/lib/cart-utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
// import { ScrollArea } from '@/components/ui/scroll-area'; // Using simple div instead
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ChevronRight,
  Sparkles,
  Shield,
  Truck
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ children, className }) => {
  const { state, updateQuantity, removeItem, clearCart, toggleCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const cartTotal = calculateCartTotal(state.items);

  // Handle close animation
  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      toggleCart(false);
      setIsAnimating(false);
    }, 200);
  };

  // Handle quantity change
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  // Handle item removal
  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  // Handle checkout
  const handleCheckout = () => {
    // TODO: Navigate to checkout page
    console.log('Proceeding to checkout...');
    handleClose();
  };

  // Update cart state when items change
  useEffect(() => {
    // This will trigger re-renders when cart changes
  }, [state.items, state.itemCount]);

  return (
    <Sheet open={state.isOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild className={className}>
        {children}
      </SheetTrigger>
      <SheetContent
        className={`w-full sm:w-96 overflow-hidden ${
          isAnimating ? 'animate-slide-out-right' : 'animate-slide-in-right'
        }`}
        side="right"
      >
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="luxury-heading flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart
              {state.itemCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {state.itemCount}
                </Badge>
              )}
            </SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 -mx-6 px-6 overflow-y-auto">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="luxury-heading text-lg mb-2">Your cart is empty</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Add some beautiful jewellery to get started
                </p>
                <Link href="/shop">
                  <Button onClick={handleClose} className="luxury-button-primary">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                {state.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Cart Summary */}
          {state.items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              {/* Promo Code */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="w-full px-3 py-2 border rounded-md text-sm luxury-input"
                />
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Apply Code (Coming Soon)
                </Button>
              </div>

              {/* Order Summary */}
              <Card className="luxury-card">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(cartTotal.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Tax</span>
                    <span>{formatCurrency(cartTotal.estimatedTax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Shipping</span>
                    <span>
                      {cartTotal.estimatedShipping === 0 ? 'FREE' : formatCurrency(cartTotal.estimatedShipping)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="luxury-price">{formatCurrency(cartTotal.total)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>30-day return policy</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full luxury-button-primary"
                  size="lg"
                >
                  Proceed to Checkout
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                <Link href="/cart">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleClose}
                  >
                    View Full Cart
                  </Button>
                </Link>
              </div>

              {/* Clear Cart */}
              <div className="pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearCart()}
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface CartItemProps {
  item: any;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item.id);
    }, 200);
  };

  const primaryImage = item.product.images.find((img: any) => img.isPrimary) || item.product.images[0];
  const itemPrice = item.product.salePrice && item.product.salePrice < item.product.price
    ? item.product.salePrice
    : item.product.price;
  const variantAdjustment = item.selectedVariant?.priceAdjustment || 0;
  const engravingCost = item.customEngraving ? 25 : 0;
  const finalPrice = itemPrice + variantAdjustment + engravingCost;
  const itemTotal = finalPrice * item.quantity;

  return (
    <Card
      className={`luxury-card overflow-hidden ${
        isRemoving ? 'animate-fade-out scale-95' : 'animate-fade-in'
      }`}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.altText || item.product.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="min-w-0">
                <h4 className="luxury-heading font-medium text-sm truncate">
                  {item.product.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {item.product.category}
                  {item.selectedVariant && ` - ${item.selectedVariant.value}`}
                </p>
                <p className="text-xs text-gray-500">
                  SKU: {item.product.sku}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Custom Engraving */}
            {item.customEngraving && (
              <div className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded mb-2">
                Custom: "{item.customEngraving.text}"
              </div>
            )}

            {/* Price and Quantity */}
            <div className="flex items-center justify-between">
              <div>
                <div className="luxury-price font-semibold text-sm">
                  {formatCurrency(finalPrice)}
                </div>
                {item.product.salePrice && item.product.salePrice < item.product.price && (
                  <div className="text-xs text-gray-500 line-through">
                    {formatCurrency(item.product.price)}
                  </div>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  className="h-8 w-8 p-0"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  className="h-8 w-8 p-0"
                  disabled={item.quantity >= 99}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Item Total */}
            <div className="text-right mt-2">
              <div className="luxury-price font-semibold">
                {formatCurrency(itemTotal)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSidebar;