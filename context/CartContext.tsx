"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cartService, CartItem } from "@/services/cartService";

interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(cartService.getCart());
  }, []);

  const addItem = (item: CartItem) => setCart(cartService.addItem(item));
  const removeItem = (productId: string) =>
    setCart(cartService.removeItem(productId));
  const updateQuantity = (productId: string, quantity: number) =>
    setCart(cartService.updateQuantity(productId, quantity));
  const clearCart = () => {
    cartService.clearCart();
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
};
