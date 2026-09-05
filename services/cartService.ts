// Cart Service
import { storageService } from "./storageService";
import { authService } from "./authService";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartService = {
  getCartKey(): string {
    const user = authService.getCurrentUser();
    return user ? `rasokart_cart_${user.id}` : "rasokart_cart_guest";
  },

  getCart(): CartItem[] {
    return storageService.get<CartItem[]>(this.getCartKey()) ?? [];
  },

  addItem(item: CartItem): CartItem[] {
    const cart = this.getCart();
    const existing = cart.find((c) => c.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    storageService.set(this.getCartKey(), cart);
    return cart;
  },

  removeItem(productId: string): CartItem[] {
    const cart = this.getCart().filter((c) => c.productId !== productId);
    storageService.set(this.getCartKey(), cart);
    return cart;
  },

  updateQuantity(productId: string, quantity: number): CartItem[] {
    const cart = this.getCart().map((c) =>
      c.productId === productId ? { ...c, quantity } : c
    );
    storageService.set(this.getCartKey(), cart);
    return cart;
  },

  clearCart(): void {
    storageService.remove(this.getCartKey());
  },
};
