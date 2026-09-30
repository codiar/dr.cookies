import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types';
import { businessInfo } from '../data/menu';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalAmount: number;
  freeDeliveryRemaining: number;
  isFreeDelivery: boolean;
  notification: string | null;
  setNotification: (text: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'dr_cookies_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const saucesKey = (newItem.selectedSauces || []).sort().join('-');
    const existingIndex = items.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        (item.selectedSauces || []).sort().join('-') === saucesKey
    );

    if (existingIndex > -1) {
      setItems((prev) => {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      });
    } else {
      const id = `${newItem.productId}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      setItems((prev) => [...prev, { ...newItem, id }]);
    }

    setNotification(`تمت إضافة "${newItem.name}" إلى السلة`);
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isFreeDelivery = totalAmount >= businessInfo.freeDeliveryThreshold;
  const freeDeliveryRemaining = Math.max(0, businessInfo.freeDeliveryThreshold - totalAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        totalItems,
        totalAmount,
        freeDeliveryRemaining,
        isFreeDelivery,
        notification,
        setNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
