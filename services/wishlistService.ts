// Wishlist Service
import { storageService } from "./storageService";

const WISHLIST_KEY = "rasokart_wishlist";

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
}

export const wishlistService = {
  getWishlist(): WishlistItem[] {
    return storageService.get<WishlistItem[]>(WISHLIST_KEY) ?? [];
  },

  addItem(item: WishlistItem): WishlistItem[] {
    const list = this.getWishlist();
    if (!list.find((w) => w.productId === item.productId)) {
      list.push(item);
      storageService.set(WISHLIST_KEY, list);
    }
    return list;
  },

  removeItem(productId: string): WishlistItem[] {
    const list = this.getWishlist().filter((w) => w.productId !== productId);
    storageService.set(WISHLIST_KEY, list);
    return list;
  },

  isInWishlist(productId: string): boolean {
    return this.getWishlist().some((w) => w.productId === productId);
  },

  clearWishlist(): void {
    storageService.remove(WISHLIST_KEY);
  },
};
