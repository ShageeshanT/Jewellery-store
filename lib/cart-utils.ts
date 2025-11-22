// Cart item interface
export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  mainImage: string;
  quantity: number;
  sku?: string;
}

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

// Save cart to localStorage
export const saveCart = (cart: CartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

// Add item to cart
export const addToCart = (product: Omit<CartItem, "quantity"> & { quantity?: number }) => {
  const cart = getCart();
  const quantity = product.quantity || 1;

  const existingIndex = cart.findIndex(item => item.productId === product.productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      productId: product.productId,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mainImage: product.mainImage,
      sku: product.sku,
      quantity: quantity,
    });
  }

  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

// Update item quantity
export const updateCartItemQuantity = (productId: string, quantity: number) => {
  if (quantity < 1) {
    return removeFromCart(productId);
  }

  const cart = getCart();
  const item = cart.find(item => item.productId === productId);

  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }

  return cart;
};

// Clear entire cart
export const clearCart = () => {
  saveCart([]);
};

// Get cart total
export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart item count
export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
