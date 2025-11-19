"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// Types for the shopping cart
export interface CartItem {
  id: string;
  productId: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number;
    images: Array<{ url: string; altText: string; isPrimary: boolean }>;
    category: string;
    sku: string;
    specifications?: any;
    inventory?: {
      stock: number;
      trackInventory: boolean;
      allowBackorder: boolean;
    };
  };
  quantity: number;
  addedAt: Date;
  selectedVariant?: {
    name: string;
    value: string;
    priceAdjustment: number;
  };
  customEngraving?: {
    text: string;
    font: string;
    placement: string;
  };
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  lastUpdated: Date;
  isOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: Omit<CartItem, 'id' | 'addedAt'>; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }
  | { type: 'TOGGLE_CART'; payload?: { isOpen?: boolean } }
  | { type: 'UPDATE_VARIANT'; payload: { itemId: string; variant: CartItem['selectedVariant'] } }
  | { type: 'UPDATE_ENGRAVING'; payload: { itemId: string; engraving: CartItem['customEngraving'] } };

const initialState: CartState = {
  items: [],
  subtotal: 0,
  itemCount: 0,
  lastUpdated: new Date(),
  isOpen: false,
};

// Cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity = 1 } = action.payload;

      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        (existingItem) =>
          existingItem.productId === item.productId &&
          JSON.stringify(existingItem.selectedVariant) === JSON.stringify(item.selectedVariant) &&
          existingItem.customEngraving?.text === item.customEngraving?.text
      );

      let newItems: CartItem[];
      let cartItem: CartItem = {
        ...item,
        id: `${item.productId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        addedAt: new Date(),
      };

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: Math.min(newItems[existingItemIndex].quantity + quantity, 99) // Max 99 of any item
        };
      } else {
        // Add new item
        cartItem.quantity = Math.min(quantity, 99);
        newItems = [...state.items, cartItem];
      }

      const newSubtotal = newItems.reduce((sum, item) => {
        const itemPrice = item.product.salePrice && item.product.salePrice < item.product.price
          ? item.product.salePrice
          : item.product.price;
        const variantAdjustment = item.selectedVariant?.priceAdjustment || 0;
        const engravingCost = item.customEngraving ? 25 : 0; // $25 for engraving
        return sum + ((itemPrice + variantAdjustment + engravingCost) * item.quantity);
      }, 0);

      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        lastUpdated: new Date(),
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId);

      const newSubtotal = newItems.reduce((sum, item) => {
        const itemPrice = item.product.salePrice && item.product.salePrice < item.product.price
          ? item.product.salePrice
          : item.product.price;
        const variantAdjustment = item.selectedVariant?.priceAdjustment || 0;
        const engravingCost = item.customEngraving ? 25 : 0;
        return sum + ((itemPrice + variantAdjustment + engravingCost) * item.quantity);
      }, 0);

      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        lastUpdated: new Date(),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { itemId } });
      }

      const newItems = state.items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(quantity, 99) }
          : item
      );

      const newSubtotal = newItems.reduce((sum, item) => {
        const itemPrice = item.product.salePrice && item.product.salePrice < item.product.price
          ? item.product.salePrice
          : item.product.price;
        const variantAdjustment = item.selectedVariant?.priceAdjustment || 0;
        const engravingCost = item.customEngraving ? 25 : 0;
        return sum + ((itemPrice + variantAdjustment + engravingCost) * item.quantity);
      }, 0);

      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        lastUpdated: new Date(),
      };
    }

    case 'UPDATE_VARIANT': {
      const { itemId, variant } = action.payload;

      const newItems = state.items.map(item =>
        item.id === itemId
          ? { ...item, selectedVariant: variant }
          : item
      );

      const newSubtotal = newItems.reduce((sum, item) => {
        const itemPrice = item.product.salePrice && item.product.salePrice < item.product.price
          ? item.product.salePrice
          : item.product.price;
        const variantAdjustment = item.selectedVariant?.priceAdjustment || 0;
        const engravingCost = item.customEngraving ? 25 : 0;
        return sum + ((itemPrice + variantAdjustment + engravingCost) * item.quantity);
      }, 0);

      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        lastUpdated: new Date(),
      };
    }

    case 'UPDATE_ENGRAVING': {
      const { itemId, engraving } = action.payload;

      const newItems = state.items.map(item =>
        item.id === itemId
          ? { ...item, customEngraving: engraving }
          : item
      );

      const newSubtotal = newItems.reduce((sum, item) => {
        const itemPrice = item.product.salePrice && item.product.salePrice < item.product.price
          ? item.product.salePrice
          : item.product.price;
        const variantAdjustment = item.selectedVariant?.priceAdjustment || 0;
        const engravingCost = item.customEngraving ? 25 : 0;
        return sum + ((itemPrice + variantAdjustment + engravingCost) * item.quantity);
      }, 0);

      return {
        ...state,
        items: newItems,
        subtotal: newSubtotal,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        lastUpdated: new Date(),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...initialState,
        isOpen: state.isOpen, // Preserve cart open state
      };
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    case 'TOGGLE_CART': {
      return {
        ...state,
        isOpen: action.payload?.isOpen !== undefined ? action.payload.isOpen : !state.isOpen,
      };
    }

    default:
      return state;
  }
};

// Local storage utilities
const CART_STORAGE_KEY = 'jewellery-cart';

const saveCartToStorage = (cartState: CartState) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
      ...cartState,
      // Convert Date objects to strings for JSON serialization
      lastUpdated: cartState.lastUpdated.toISOString(),
      items: cartState.items.map(item => ({
        ...item,
        addedAt: item.addedAt.toISOString(),
        // Ensure product data is properly serialized
        product: {
          ...item.product,
          _id: item.product._id.toString(),
        }
      }))
    }));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const loadCartFromStorage = (): CartState | null => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) return null;

    const parsedCart = JSON.parse(storedCart);
    return {
      ...parsedCart,
      // Convert string dates back to Date objects
      lastUpdated: new Date(parsedCart.lastUpdated),
      items: parsedCart.items.map((item: any) => ({
        ...item,
        addedAt: new Date(item.addedAt),
      }))
    };
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return null;
  }
};

// Create context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (isOpen?: boolean) => void;
  updateVariant: (itemId: string, variant: CartItem['selectedVariant']) => void;
  updateEngraving: (itemId: string, engraving: CartItem['customEngraving']) => void;
  isItemInCart: (productId: string, variant?: CartItem['selectedVariant']) => boolean;
  getItemQuantity: (productId: string, variant?: CartItem['selectedVariant']) => number;
} | null>(null);

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    if (state.items.length > 0 || state.subtotal > 0) {
      saveCartToStorage(state);
    } else {
      // Remove from storage if cart is empty
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (error) {
        console.error('Failed to remove cart from localStorage:', error);
      }
    }
  }, [state]);

  // Sync cart across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const newCart = JSON.parse(e.newValue);
          dispatch({
            type: 'LOAD_CART',
            payload: {
              ...newCart,
              lastUpdated: new Date(newCart.lastUpdated),
              items: newCart.items.map((item: any) => ({
                ...item,
                addedAt: new Date(item.addedAt),
              }))
            }
          });
        } catch (error) {
          console.error('Failed to sync cart from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Helper functions
  const addItem = useCallback((item: Omit<CartItem, 'id' | 'addedAt'>, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const toggleCart = useCallback((isOpen?: boolean) => {
    dispatch({ type: 'TOGGLE_CART', payload: { isOpen } });
  }, []);

  const updateVariant = useCallback((itemId: string, variant: CartItem['selectedVariant']) => {
    dispatch({ type: 'UPDATE_VARIANT', payload: { itemId, variant } });
  }, []);

  const updateEngraving = useCallback((itemId: string, engraving: CartItem['customEngraving']) => {
    dispatch({ type: 'UPDATE_ENGRAVING', payload: { itemId, engraving } });
  }, []);

  const isItemInCart = useCallback((productId: string, variant?: CartItem['selectedVariant']) => {
    return state.items.some(
      (item) =>
        item.productId === productId &&
        JSON.stringify(item.selectedVariant) === JSON.stringify(variant)
    );
  }, [state.items]);

  const getItemQuantity = useCallback((productId: string, variant?: CartItem['selectedVariant']) => {
    const item = state.items.find(
      (item) =>
        item.productId === productId &&
        JSON.stringify(item.selectedVariant) === JSON.stringify(variant)
    );
    return item?.quantity || 0;
  }, [state.items]);

  const value = {
    state,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    updateVariant,
    updateEngraving,
    isItemInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;