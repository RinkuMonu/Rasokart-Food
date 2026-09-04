'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WISHLIST_STORAGE_KEY = 'rasokart_wishlist';

export interface WishlistContextType {
  wishlistItems: (number | string)[];
  wishlistCount: number;
  addToWishlist: (productId: number | string) => void;
  removeFromWishlist: (productId: number | string) => void;
  toggleWishlist: (productId: number | string) => void;
  isInWishlist: (productId: number | string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<(number | string)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on client mount (safe for hydration)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Deduplicate IDs safely
          const uniqueIds = Array.from(new Set(parsed));
          setWishlistItems(uniqueIds);
        }
      }
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save wishlist to localStorage on change
  const saveToStorage = (items: (number | string)[]) => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  };

  const isInWishlist = (productId: number | string): boolean => {
    return wishlistItems.some((id) => String(id) === String(productId));
  };

  const addToWishlist = (productId: number | string) => {
    if (isInWishlist(productId)) return;

    setWishlistItems((prev) => {
      const updated = [...prev, productId];
      saveToStorage(updated);
      return updated;
    });

    toast.success('Added to wishlist', {
      icon: '❤️',
    });
  };

  const removeFromWishlist = (productId: number | string) => {
    setWishlistItems((prev) => {
      const updated = prev.filter((id) => String(id) !== String(productId));
      saveToStorage(updated);
      return updated;
    });

    toast.success('Removed from wishlist');
  };

  const toggleWishlist = (productId: number | string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    try {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear wishlist storage', e);
    }
    toast.success('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: isLoaded ? wishlistItems.length : 0,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
}
