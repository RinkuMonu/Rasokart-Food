'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useWishlist } from '@/hooks/useWishlist';
import productsData from '@/data/products.json';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems, wishlistCount, clearWishlist } = useWishlist();

  // Match wishlist product IDs to complete product objects
  const wishlistProducts = useMemo(() => {
    return productsData.products.filter((product) =>
      wishlistItems.some((id) => String(id) === String(product.id))
    );
  }, [wishlistItems]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50/50 pb-20">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-100 text-red-500">
                    <Heart size={28} className="fill-red-500" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    My Wishlist
                  </h1>
                </div>
                <p className="text-muted-foreground mt-2">
                  {wishlistCount > 0
                    ? `You have ${wishlistCount} item${wishlistCount > 1 ? 's' : ''} saved for bulk orders.`
                    : 'Your saved favorite wholesale products'}
                </p>
              </div>

              {wishlistCount > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearWishlist}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition border border-red-200"
                  >
                    <Trash2 size={16} />
                    Clear Wishlist
                  </button>
                  <Link
                    href="/products"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition shadow-sm"
                  >
                    Continue Shopping
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {wishlistProducts.length > 0 ? (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Showing {wishlistProducts.length} saved product{wishlistProducts.length > 1 ? 's' : ''}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {wishlistProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </motion.div>
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm border border-gray-100 my-8"
            >
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-400">
                <Heart size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your wishlist is empty
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Explore our wide selection of wholesale groceries and tap the heart icon on any product to save it here for later.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/products"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-green-700"
                >
                  <ShoppingBag size={18} />
                  Explore Products
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
