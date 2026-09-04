'use client';

import React, { useEffect, useState, useMemo } from 'react';
import productsData from '@/data/products.json';
import { ProductSectionCarousel } from './ProductSectionCarousel';

export function TopPicksSection() {
  const [preferredCategories, setPreferredCategories] = useState<string[]>([]);
  const products = productsData.products.filter((p) => p.status === 'active');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const interactedCategories = new Set<string>();

      // 1. Check Cart
      const cartRaw = localStorage.getItem('cart') || localStorage.getItem('rasokart_cart');
      if (cartRaw) {
        const cartItems = JSON.parse(cartRaw);
        if (Array.isArray(cartItems)) {
          cartItems.forEach((item: any) => {
            if (item.category) interactedCategories.add(item.category.trim().toLowerCase());
            else if (item.id) {
              const matched = products.find((p) => String(p.id) === String(item.id));
              if (matched?.category) interactedCategories.add(matched.category.trim().toLowerCase());
            }
          });
        }
      }

      // 2. Check Wishlist
      const wishlistRaw = localStorage.getItem('rasokart_wishlist');
      if (wishlistRaw) {
        const wishlistIds = JSON.parse(wishlistRaw);
        if (Array.isArray(wishlistIds)) {
          wishlistIds.forEach((id: any) => {
            const matched = products.find((p) => String(p.id) === String(id));
            if (matched?.category) interactedCategories.add(matched.category.trim().toLowerCase());
          });
        }
      }

      // 3. Check Orders
      const ordersRaw = localStorage.getItem('rasokart_orders');
      if (ordersRaw) {
        const orders = JSON.parse(ordersRaw);
        if (Array.isArray(orders)) {
          orders.forEach((order: any) => {
            order.items?.forEach((item: any) => {
              if (item.category) interactedCategories.add(item.category.trim().toLowerCase());
              else if (item.id) {
                const matched = products.find((p) => String(p.id) === String(item.id));
                if (matched?.category) interactedCategories.add(matched.category.trim().toLowerCase());
              }
            });
          });
        }
      }

      if (interactedCategories.size > 0) {
        setPreferredCategories(Array.from(interactedCategories));
      }
    } catch (e) {
      console.error('Failed to parse user activity from localStorage', e);
    }
  }, []);

  const recommendedProducts = useMemo(() => {
    const dedupe = (list: any[]) => {
      const seen = new Set();
      return list.filter((p) => {
        const key = p.slug || p.productName || p.id;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };

    if (preferredCategories.length > 0) {
      const matched = products.filter((p) =>
        preferredCategories.includes(p.category?.trim().toLowerCase())
      );
      if (matched.length >= 4) {
        return dedupe(
          [...matched].sort((a, b) => (b.rating || 0) - (a.rating || 0))
        ).slice(0, 8);
      }
    }

    // Fallback: Highest rated active featured products
    return dedupe(
      [...products]
        .sort(
          (a, b) =>
            (Number(b.featured) - Number(a.featured)) ||
            (b.rating || 0) - (a.rating || 0)
        )
    ).slice(0, 8);
  }, [preferredCategories, products]);

  return (
    <ProductSectionCarousel
      eyebrow="JUST FOR YOU"
      heading="Top Picks"
      subtitle="Handpicked snacks you’ll love"
      products={recommendedProducts}
      viewAllHref="/products"
      viewAllText="View All"
      bgClassName="bg-white"
    />
  );
}

export default TopPicksSection;
