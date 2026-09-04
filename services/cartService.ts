// Cart Service
import { storageService } from "./storageService";

const CART_KEY = "rasokart_cart";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartService = {
  getCart(): CartItem[] {
    return storageService.get<CartItem[]>(CART_KEY) ?? [];
  },

  addItem(item: CartItem): CartItem[] {
    const cart = this.getCart();
    const existing = cart.find((c) => c.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    storageService.set(CART_KEY, cart);
    return cart;
  },

  removeItem(productId: string): CartItem[] {
    const cart = this.getCart().filter((c) => c.productId !== productId);
    storageService.set(CART_KEY, cart);
    return cart;
  },

  updateQuantity(productId: string, quantity: number): CartItem[] {
    const cart = this.getCart().map((c) =>
      c.productId === productId ? { ...c, quantity } : c
    );
    storageService.set(CART_KEY, cart);
    return cart;
  },

  clearCart(): void {
    storageService.remove(CART_KEY);
  },
};
